package com.schedule_kotlin_modules.kotlin

import android.content.Intent
import android.provider.CalendarContract
import android.provider.CalendarContract.Events.*
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.text.SimpleDateFormat

class CalendarModule(private val reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    @ReactMethod
    fun createEvent(title: String, location: String, startDate: String, endDate: String) {
        try {
            val intent = Intent(Intent.ACTION_INSERT)
            .setData(CONTENT_URI)
            .putExtra(TITLE, title)
            .putExtra(EVENT_LOCATION, location)
            .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, SimpleDateFormat("dd/MM/yyyy").parse(startDate).time)
            .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, SimpleDateFormat("dd/MM/yyyy").parse(endDate).time + (60 * 60 * 1000))
            .setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        reactContext.startActivity(intent)
        } catch(t: Throwable) {
            Log.d("CalendarModule", "Error to create event")
        }
    }
}