package com.schedule_kotlin_modules.kotlin

import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.image.ReactImageView

class NativeImageView(
    private val reactContext: ReactApplicationContext
) : SimpleViewManager<ReactImageView>() {
    override fun getName() = "CustomNativeImage"

    override fun createViewInstance(context: ThemedReactContext) =
        ReactImageView(context, Fresco.newDraweeControllerBuilder(), null, reactContext)

    @ReactProp(name = "src")
    fun setSrc(view: ReactImageView, uri: ReadableMap){
        val sources = WritableNativeArray()
        sources.pushMap(uri)
        view.setSource(sources)
    }
}
