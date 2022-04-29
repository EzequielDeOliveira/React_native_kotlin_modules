package com.schedule_kotlin_modules.kotlin

import android.app.DatePickerDialog
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.schedule_kotlin_modules.R
import java.text.SimpleDateFormat
import java.util.*

class DatePickerModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "DatePickerModule"

    @ReactMethod
    fun openDatePicker(callback: Callback) {
        val calendar = Calendar.getInstance()
        val activity = currentActivity

        val dateSetListener = DatePickerDialog.OnDateSetListener{ _ , year, month, day ->
            calendar.set(Calendar.YEAR, year)
            calendar.set(Calendar.MONTH, month)
            calendar.set(Calendar.DAY_OF_MONTH, day)

            val locale = Locale("pt", "BR")
            val sdf = SimpleDateFormat("dd/MM/yyyy", locale)
            val result = sdf.format(calendar.time);
            callback.invoke(result)
        }

        if(activity == null) {
            return
        }

        DatePickerDialog(activity,
            R.style.SpinnerDatePickerDialog,
            dateSetListener,
            calendar.get(Calendar.YEAR),
            calendar.get(Calendar.MONTH),
            calendar.get(Calendar.DAY_OF_MONTH)
            ).show()
    }
}