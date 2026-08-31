package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.print.PrintAttributes
import android.print.PrintManager
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.example.ui.theme.MyApplicationTheme
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    
    // Configure true full screen edge-to-edge display without system bar icons
    WindowCompat.setDecorFitsSystemWindows(window, false)
    val insetsController = WindowCompat.getInsetsController(window, window.decorView)
    insetsController.hide(WindowInsetsCompat.Type.systemBars())
    insetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE

    setContent {
      MyApplicationTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            HtmlAppWebView()
        }
      }
    }
  }
}

class WebAppInterface(private val webView: WebView, private val coroutineScope: CoroutineScope) {
    private val client = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .build()

    @JavascriptInterface
    fun askGemini(prompt: String, callbackName: String) {
        coroutineScope.launch {
            val response = askGeminiApi(prompt)
            withContext(Dispatchers.Main) {
                val safeQuotedJsString = JSONObject.quote(response)
                webView.evaluateJavascript("$callbackName($safeQuotedJsString);", null)
            }
        }
    }

    @JavascriptInterface
    fun printWorksheet(documentName: String) {
        coroutineScope.launch(Dispatchers.Main) {
            try {
                val printManager = webView.context.getSystemService(Context.PRINT_SERVICE) as PrintManager
                val printAdapter = webView.createPrintDocumentAdapter(documentName)
                val jobName = "Worksheet - $documentName"
                printManager.print(jobName, printAdapter, PrintAttributes.Builder().build())
            } catch (e: Exception) {
                android.widget.Toast.makeText(webView.context, "Print error: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
            }
        }
    }

    @JavascriptInterface
    fun savePdf(base64Data: String, filename: String) {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val base64String = base64Data.substringAfter("base64,")
                val pdfAsBytes = android.util.Base64.decode(base64String, android.util.Base64.DEFAULT)
                
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                    val contentValues = android.content.ContentValues().apply {
                        put(android.provider.MediaStore.MediaColumns.DISPLAY_NAME, filename)
                        put(android.provider.MediaStore.MediaColumns.MIME_TYPE, "application/pdf")
                        put(android.provider.MediaStore.MediaColumns.RELATIVE_PATH, android.os.Environment.DIRECTORY_DOWNLOADS)
                    }
                    
                    val uri = webView.context.contentResolver.insert(android.provider.MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues)
                    uri?.let {
                        webView.context.contentResolver.openOutputStream(it)?.use { outputStream ->
                            outputStream.write(pdfAsBytes)
                        }
                        withContext(Dispatchers.Main) {
                            android.widget.Toast.makeText(webView.context, "PDF saved to Downloads!", android.widget.Toast.LENGTH_SHORT).show()
                        }
                    } ?: run {
                        withContext(Dispatchers.Main) {
                            android.widget.Toast.makeText(webView.context, "Failed to create PDF file.", android.widget.Toast.LENGTH_SHORT).show()
                        }
                    }
                } else {
                    @Suppress("DEPRECATION")
                    val downloadDir = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS)
                    val file = java.io.File(downloadDir, filename)
                    file.outputStream().use { outputStream ->
                        outputStream.write(pdfAsBytes)
                    }
                    withContext(Dispatchers.Main) {
                        android.widget.Toast.makeText(webView.context, "PDF saved to Downloads!", android.widget.Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    android.widget.Toast.makeText(webView.context, "Error: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private suspend fun askGeminiApi(prompt: String): String = withContext(Dispatchers.IO) {
        try {
            val apiKey = BuildConfig.GEMINI_API_KEY
            if (apiKey.isEmpty() || apiKey == "MY_GEMINI_API_KEY") {
                return@withContext "API_KEY_MISSING: Please configure your GEMINI_API_KEY in the AI Studio secrets."
            }
            
            val modelsToTry = listOf("gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro")
            val jsonBody = JSONObject().apply {
                put("contents", org.json.JSONArray().apply {
                    put(JSONObject().apply {
                        put("parts", org.json.JSONArray().apply {
                            put(JSONObject().apply {
                                put("text", prompt)
                            })
                        })
                    })
                })
            }
            
            val requestBody = jsonBody.toString().toRequestBody("application/json".toMediaType())
            var lastError = ""

            for (model in modelsToTry) {
                try {
                    val url = "https://generativelanguage.googleapis.com/v1beta/models/$model:generateContent?key=$apiKey"
                    val request = Request.Builder().url(url).post(requestBody).build()
                    val response = client.newCall(request).execute()
                    val responseString = response.body?.string() ?: ""
                    
                    if (response.isSuccessful) {
                        val jsonRes = JSONObject(responseString)
                        val candidates = jsonRes.optJSONArray("candidates")
                        val firstCandidate = candidates?.optJSONObject(0)
                        val content = firstCandidate?.optJSONObject("content")
                        val parts = content?.optJSONArray("parts")
                        val firstPart = parts?.optJSONObject(0)
                        val text = firstPart?.optString("text")
                        if (!text.isNullOrEmpty()) {
                            return@withContext text
                        }
                    } else {
                        lastError = "API Error (${response.code}): ${response.message}"
                    }
                } catch (e: Exception) {
                    lastError = "Network Error: ${e.message}"
                }
            }

            return@withContext "API_ERROR: $lastError"
        } catch (e: Exception) {
            "API_ERROR: ${e.message}"
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun HtmlAppWebView() {
    val coroutineScope = rememberCoroutineScope()
    
    AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { context ->
            WebView(context).apply {
                settings.javaScriptEnabled = true
                settings.domStorageEnabled = true
                settings.allowContentAccess = true
                settings.allowFileAccess = true
                settings.loadWithOverviewMode = true
                settings.useWideViewPort = true
                settings.builtInZoomControls = false
                settings.displayZoomControls = false
                
                webChromeClient = object : WebChromeClient() {
                    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                        return true
                    }
                }
                
                webViewClient = object : WebViewClient() {
                    override fun onReceivedError(
                        view: WebView?,
                        request: WebResourceRequest?,
                        error: WebResourceError?
                    ) {
                        super.onReceivedError(view, request, error)
                    }

                    override fun onRenderProcessGone(
                        view: WebView?,
                        detail: RenderProcessGoneDetail?
                    ): Boolean {
                        return true
                    }
                }
                
                addJavascriptInterface(WebAppInterface(this, coroutineScope), "AndroidAI")
                loadUrl("file:///android_asset/index.html")
            }
        }
    )
}

