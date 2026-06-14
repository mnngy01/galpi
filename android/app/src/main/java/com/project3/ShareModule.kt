package com.project3

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ShareModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  companion object {
    const val NAME = "ShareModule"
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun getSharedUrl(promise: Promise) {
    val activity = reactContext.currentActivity
    if (activity == null) {
      promise.resolve(null)
      return
    }
    val intent = activity.intent
    if (intent?.action == Intent.ACTION_SEND && intent.type == "text/plain") {
      val url = intent.getStringExtra(Intent.EXTRA_TEXT)
      activity.intent.action = null
      promise.resolve(url)
    } else {
      promise.resolve(null)
    }
  }
}