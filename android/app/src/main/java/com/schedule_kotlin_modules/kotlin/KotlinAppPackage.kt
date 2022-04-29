package com.schedule_kotlin_modules.kotlin

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class KotlinAppPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext):
            MutableList<NativeModule> = mutableListOf()

    override fun createViewManagers(reactContext: ReactApplicationContext) :
            MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()
}