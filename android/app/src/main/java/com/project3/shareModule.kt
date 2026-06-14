package com.project3

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ShareModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "ShareModule"

  @ReactMethod
  fun getSharedUrl(promise: Promise) {
    val url = SharedUrlHolder.url
    SharedUrlHolder.url = null
    promise.resolve(url)
  }
}