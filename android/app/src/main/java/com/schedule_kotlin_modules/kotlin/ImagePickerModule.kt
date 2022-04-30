package com.schedule_kotlin_modules.kotlin


import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import com.schedule_kotlin_modules.BuildConfig
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class ImagePickerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private var pickerPromise: Promise? = null
    private var uri: Uri? = null

    companion object {
        const val REQUEST_IMAGE_PICK = 1
        const val REQUEST_CAMERA_PICK = 2
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
                        when (requestCode) {
                            REQUEST_IMAGE_PICK -> {
                                uri = data?.data

                                uri?.let {
                                    promise.resolve(uri.toString())
                                }

                                    ?: promise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found")
                            }
                            REQUEST_CAMERA_PICK -> {
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

    private fun createFile(): File {
        val timestamp: String = SimpleDateFormat("yyyy_MM_dd_mm_ss").format(Date())
        val dir: File? = currentActivity?.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        return File.createTempFile(
            "JPEG_${timestamp}_",
            ".jpg",
            dir
        )
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
        } catch (t: Throwable) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
            pickerPromise = null
        }
    }

    @ReactMethod
    fun pickFromCamera(promise: Promise) {
        val activity = currentActivity
        pickerPromise = promise

        if (activity?.packageManager == null) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, "Error to get Activity")
            pickerPromise = null
            return
        }

        try {
            Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { takePictureIntent ->
                takePictureIntent.resolveActivity(activity.packageManager).also {
                    val photoFile: File? = createFile()

                    photoFile?.also {
                        uri = FileProvider.getUriForFile(
                            reactContext,
                            BuildConfig.APPLICATION_ID + ".provider",
                            it
                        )
                        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, uri)
                        activity?.startActivityForResult(takePictureIntent, REQUEST_CAMERA_PICK)
                    }

                }
            }
        } catch (t: Throwable) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
            pickerPromise = null
        }
    }
}