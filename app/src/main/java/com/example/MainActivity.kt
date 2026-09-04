package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.print.PrintAttributes
import android.print.PrintManager
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.JsPromptResult
import android.webkit.JsResult
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

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    if (hasFocus) {
      val insetsController = WindowCompat.getInsetsController(window, window.decorView)
      insetsController.hide(WindowInsetsCompat.Type.systemBars())
      insetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
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
                val safeName = documentName.ifBlank { "Worksheet" }
                val printAdapter = webView.createPrintDocumentAdapter(safeName)
                val jobName = "Worksheet - $safeName"
                printManager.print(jobName, printAdapter, PrintAttributes.Builder().build())
            } catch (e: Exception) {
                android.widget.Toast.makeText(webView.context, "Print error: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
            }
        }
    }

    @JavascriptInterface
    fun savePdf(base64Data: String, filename: String) {
        saveFileInternal(base64Data, filename, "application/pdf", "PDF file")
    }

    @JavascriptInterface
    fun saveImage(base64Data: String, filename: String) {
        saveFileInternal(base64Data, filename, "image/png", "PNG Image")
    }

    @JavascriptInterface
    fun saveDoc(contentOrBase64: String, filename: String) {
        saveFileInternal(contentOrBase64, filename, "application/msword", "Word Document")
    }

    @JavascriptInterface
    fun saveFile(data: String, filename: String, mimeType: String) {
        saveFileInternal(data, filename, mimeType, "File")
    }

    private fun saveFileInternal(data: String, filename: String, mimeType: String, label: String) {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val fileBytes = if (data.contains("base64,")) {
                    android.util.Base64.decode(data.substringAfter("base64,"), android.util.Base64.DEFAULT)
                } else if (data.startsWith("data:") && data.contains(",")) {
                    android.util.Base64.decode(data.substringAfter(","), android.util.Base64.DEFAULT)
                } else {
                    // Try decode as Base64; if invalid, treat as raw UTF-8 string
                    try {
                        android.util.Base64.decode(data, android.util.Base64.DEFAULT)
                    } catch (e: Exception) {
                        data.toByteArray(Charsets.UTF_8)
                    }
                }

                val safeFilename = filename.ifBlank { "Exported_$label" }
                var savedSuccess = false

                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                    val isImage = mimeType.startsWith("image/")
                    val collection = if (isImage) {
                        android.provider.MediaStore.Images.Media.getContentUri(android.provider.MediaStore.VOLUME_EXTERNAL_PRIMARY)
                    } else {
                        android.provider.MediaStore.Downloads.getContentUri(android.provider.MediaStore.VOLUME_EXTERNAL_PRIMARY)
                    }
                    val relativePath = if (isImage) {
                        android.os.Environment.DIRECTORY_PICTURES + "/Worksheets"
                    } else {
                        android.os.Environment.DIRECTORY_DOWNLOADS + "/Worksheets"
                    }

                    val contentValues = android.content.ContentValues().apply {
                        put(android.provider.MediaStore.MediaColumns.DISPLAY_NAME, safeFilename)
                        put(android.provider.MediaStore.MediaColumns.MIME_TYPE, mimeType)
                        put(android.provider.MediaStore.MediaColumns.RELATIVE_PATH, relativePath)
                        put(android.provider.MediaStore.MediaColumns.IS_PENDING, 1)
                    }

                    val uri = webView.context.contentResolver.insert(collection, contentValues)
                    uri?.let { itemUri ->
                        webView.context.contentResolver.openOutputStream(itemUri)?.use { outputStream ->
                            outputStream.write(fileBytes)
                        }
                        contentValues.clear()
                        contentValues.put(android.provider.MediaStore.MediaColumns.IS_PENDING, 0)
                        webView.context.contentResolver.update(itemUri, contentValues, null, null)
                        savedSuccess = true
                    }
                } else {
                    @Suppress("DEPRECATION")
                    val isImage = mimeType.startsWith("image/")
                    val baseDir = if (isImage) {
                        android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES)
                    } else {
                        android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS)
                    }
                    val targetDir = java.io.File(baseDir, "Worksheets")
                    targetDir.mkdirs()
                    val file = java.io.File(targetDir, safeFilename)
                    file.outputStream().use { outputStream ->
                        outputStream.write(fileBytes)
                    }
                    // Trigger Android Media Scanner so Gallery indexes the photo immediately
                    android.media.MediaScannerConnection.scanFile(
                        webView.context,
                        arrayOf(file.absolutePath),
                        arrayOf(mimeType),
                        null
                    )
                    savedSuccess = true
                }

                // Also save to app cache for immediate share intent access
                try {
                    val cacheDir = java.io.File(webView.context.cacheDir, "exports")
                    cacheDir.mkdirs()
                    val cacheFile = java.io.File(cacheDir, safeFilename)
                    cacheFile.outputStream().use { it.write(fileBytes) }
                } catch (e: Exception) {
                    // Ignore cache errors
                }

                withContext(Dispatchers.Main) {
                    if (savedSuccess) {
                        android.widget.Toast.makeText(
                            webView.context,
                            "Saved $safeFilename to Downloads/Pictures!",
                            android.widget.Toast.LENGTH_LONG
                        ).show()

                        val escapedName = safeFilename.replace("'", "\\'")
                        val escapedMime = mimeType.replace("'", "\\'")
                        webView.evaluateJavascript("if(typeof onAndroidFileSaved==='function') onAndroidFileSaved('$escapedName', '$escapedMime');", null)
                    } else {
                        android.widget.Toast.makeText(
                            webView.context,
                            "Failed to save $safeFilename",
                            android.widget.Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    android.widget.Toast.makeText(webView.context, "Export error: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    @JavascriptInterface
    fun openFile(filename: String, mimeType: String) {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val context = webView.context
                val safeFilename = filename.ifBlank { "file" }
                val cacheDir = java.io.File(context.cacheDir, "exports")
                var targetFile = java.io.File(cacheDir, safeFilename)

                if (!targetFile.exists()) {
                    val isImage = mimeType.startsWith("image/")
                    val baseDir = if (isImage) {
                        android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES)
                    } else {
                        android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS)
                    }
                    val publicFile = java.io.File(java.io.File(baseDir, "Worksheets"), safeFilename)
                    if (publicFile.exists()) {
                        targetFile = publicFile
                    } else {
                        val directPublic = java.io.File(baseDir, safeFilename)
                        if (directPublic.exists()) {
                            targetFile = directPublic
                        }
                    }
                }

                if (!targetFile.exists()) {
                    withContext(Dispatchers.Main) {
                        android.widget.Toast.makeText(context, "File not found: $safeFilename", android.widget.Toast.LENGTH_SHORT).show()
                    }
                    return@launch
                }

                val uri = androidx.core.content.FileProvider.getUriForFile(
                    context,
                    "${context.packageName}.fileprovider",
                    targetFile
                )

                val ext = targetFile.extension.lowercase()
                val computedMime = if (mimeType.isBlank() || mimeType == "*/*") {
                    when (ext) {
                        "pdf" -> "application/pdf"
                        "png" -> "image/png"
                        "jpg", "jpeg" -> "image/jpeg"
                        "doc", "docx" -> "application/msword"
                        else -> "*/*"
                    }
                } else mimeType

                withContext(Dispatchers.Main) {
                    val intent = android.content.Intent(android.content.Intent.ACTION_VIEW).apply {
                        setDataAndType(uri, computedMime)
                        addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)
                        addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    val chooser = android.content.Intent.createChooser(intent, "Open $safeFilename")
                    chooser.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    context.startActivity(chooser)
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    android.widget.Toast.makeText(webView.context, "Could not open file: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    @JavascriptInterface
    fun shareFile(data: String, filename: String, mimeType: String) {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val fileBytes = if (data.contains("base64,")) {
                    android.util.Base64.decode(data.substringAfter("base64,"), android.util.Base64.DEFAULT)
                } else {
                    data.toByteArray(Charsets.UTF_8)
                }

                val cacheDir = java.io.File(webView.context.cacheDir, "exports")
                cacheDir.mkdirs()
                val cacheFile = java.io.File(cacheDir, filename)
                cacheFile.outputStream().use { it.write(fileBytes) }

                val fileUri = androidx.core.content.FileProvider.getUriForFile(
                    webView.context,
                    "${webView.context.packageName}.fileprovider",
                    cacheFile
                )

                withContext(Dispatchers.Main) {
                    val sendIntent = android.content.Intent().apply {
                        action = android.content.Intent.ACTION_SEND
                        putExtra(android.content.Intent.EXTRA_STREAM, fileUri)
                        type = mimeType
                        addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    }
                    val shareIntent = android.content.Intent.createChooser(sendIntent, "Share $filename")
                    shareIntent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                    webView.context.startActivity(shareIntent)
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    android.widget.Toast.makeText(webView.context, "Share error: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    @JavascriptInterface
    fun shareText(title: String, text: String) {
        coroutineScope.launch(Dispatchers.Main) {
            try {
                val sendIntent = android.content.Intent().apply {
                    action = android.content.Intent.ACTION_SEND
                    putExtra(android.content.Intent.EXTRA_TITLE, title)
                    putExtra(android.content.Intent.EXTRA_TEXT, text)
                    type = "text/plain"
                }
                val shareIntent = android.content.Intent.createChooser(sendIntent, title)
                shareIntent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                webView.context.startActivity(shareIntent)
            } catch (e: Exception) {
                android.widget.Toast.makeText(webView.context, "Share: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
            }
        }
    }

    @JavascriptInterface
    fun copyToClipboard(label: String, text: String) {
        coroutineScope.launch(Dispatchers.Main) {
            try {
                val clipboard = webView.context.getSystemService(Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager
                val clip = android.content.ClipData.newPlainText(label, text)
                clipboard.setPrimaryClip(clip)
                android.widget.Toast.makeText(webView.context, "Link copied to clipboard!", android.widget.Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                android.widget.Toast.makeText(webView.context, "Clipboard: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
            }
        }
    }

    @JavascriptInterface
    fun openExternalUrl(url: String) {
        coroutineScope.launch(Dispatchers.Main) {
            try {
                val context = webView.context
                if (url.startsWith("file://") || url.startsWith("content://") || url.startsWith("/")) {
                    val cleanPath = url.removePrefix("file://")
                    val file = java.io.File(cleanPath)
                    if (file.exists()) {
                        openFile(file.name, "*/*")
                        return@launch
                    }
                }
                val intent = android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url)).apply {
                    addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                context.startActivity(intent)
            } catch (e: Exception) {
                android.widget.Toast.makeText(webView.context, "Open Link/File: ${e.message}", android.widget.Toast.LENGTH_SHORT).show()
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
            // Pre-create cache directories to prevent Chromium code cache directory creation warnings
            try {
                val codeCacheDir = java.io.File(context.cacheDir, "WebView/Default/HTTP Cache/Code Cache/js")
                if (!codeCacheDir.exists()) {
                    codeCacheDir.mkdirs()
                }
            } catch (e: Exception) {
                // Ignore directory creation errors
            }

            WebView(context).apply {
                setLayerType(View.LAYER_TYPE_SOFTWARE, null)
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
                        consoleMessage?.let {
                            android.util.Log.d("WebViewConsole", "${it.message()} -- From line ${it.lineNumber()} of ${it.sourceId()}")
                        }
                        return true
                    }

                    override fun onJsAlert(
                        view: WebView?,
                        url: String?,
                        message: String?,
                        result: JsResult?
                    ): Boolean {
                        android.app.AlertDialog.Builder(context)
                            .setTitle("Worksheet Studio")
                            .setMessage(message ?: "")
                            .setPositiveButton(android.R.string.ok) { _, _ ->
                                result?.confirm()
                            }
                            .setCancelable(false)
                            .create()
                            .show()
                        return true
                    }

                    override fun onJsConfirm(
                        view: WebView?,
                        url: String?,
                        message: String?,
                        result: JsResult?
                    ): Boolean {
                        android.app.AlertDialog.Builder(context)
                            .setTitle("Worksheet Studio")
                            .setMessage(message ?: "")
                            .setPositiveButton(android.R.string.ok) { _, _ ->
                                result?.confirm()
                            }
                            .setNegativeButton(android.R.string.cancel) { _, _ ->
                                result?.cancel()
                            }
                            .setCancelable(false)
                            .create()
                            .show()
                        return true
                    }

                    override fun onJsPrompt(
                        view: WebView?,
                        url: String?,
                        message: String?,
                        defaultValue: String?,
                        result: JsPromptResult?
                    ): Boolean {
                        val input = android.widget.EditText(context).apply {
                            setText(defaultValue ?: "")
                        }
                        android.app.AlertDialog.Builder(context)
                            .setTitle("Worksheet Studio")
                            .setMessage(message ?: "")
                            .setView(input)
                            .setPositiveButton(android.R.string.ok) { _, _ ->
                                result?.confirm(input.text.toString())
                            }
                            .setNegativeButton(android.R.string.cancel) { _, _ ->
                                result?.cancel()
                            }
                            .setCancelable(false)
                            .create()
                            .show()
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

