package com.schedule_kotlin_modules.kotlin

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*

class ImagePickerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var pickerPromise: Promise? = null

    companion object {
        const val REQUEST_IMAGE_PICK = 1
        const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        const val E_PICKER_CANCELLED = "E_PICKER_CANCELLED"
        const val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
        const val E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND"
    }

    override fun getName() = "ImagePickerModule"

    private val activityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(
            activity: Activity?,
            requestCode: Int,
            resultCode: Int,
            data: Intent?
        ) {
            pickerPromise?.let { promise ->
             when (resultCode) {
                   Activity.RESULT_CANCELED ->
                        promise.reject(E_PICKER_CANCELLED, "image picker was cancelled")
                   Activity.RESULT_OK -> {
                       when(requestCode) {
                           REQUEST_IMAGE_PICK -> {
                               val uri = data?.data

                               uri?.let {
                                   promise.resolve(uri.toString())
                               }

                                   ?: promise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found")
                           }
                       }
                   }
                }
                pickerPromise = null
            }
        }
    }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    @ReactMethod
    fun pickFromGallery(promise: Promise) {
        val activity = currentActivity
        pickerPromise = promise

        try {
            val intent = Intent(Intent.ACTION_PICK).apply {
                type = "image/*"
            }
            activity?.startActivityForResult(intent, REQUEST_IMAGE_PICK)
        } catch(t: Throwable) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
            pickerPromise = null
        }
    }

}