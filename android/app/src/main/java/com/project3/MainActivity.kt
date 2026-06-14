package com.project3

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "Project3"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    handleShareIntent(intent)
    super.onCreate(savedInstanceState)
  }

  override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    intent?.let { handleShareIntent(it) }
  }

  private fun handleShareIntent(intent: Intent) {
  if (intent.action == Intent.ACTION_SEND && intent.type == "text/plain") {
    val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT) ?: return
    val encoded = Uri.encode(sharedText)
    println("공유 데이터 들어옴: $sharedText")


    val newIntent = Intent(Intent.ACTION_VIEW).apply {
      data = Uri.parse("galpi://share?url=$encoded")
      flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
    }

    startActivity(newIntent)
  }
}
}