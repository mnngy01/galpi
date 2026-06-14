package com.project3

import android.content.Intent
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
    super.onCreate(savedInstanceState)
    if (intent?.action == Intent.ACTION_SEND && intent?.type == "text/plain") {
      SharedUrlHolder.url = intent.getStringExtra(Intent.EXTRA_TEXT)
    }
  }

  override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    if (intent?.action == Intent.ACTION_SEND && intent.type == "text/plain") {
      SharedUrlHolder.url = intent.getStringExtra(Intent.EXTRA_TEXT)
    }
  }
}

object SharedUrlHolder {
  var url: String? = null
}