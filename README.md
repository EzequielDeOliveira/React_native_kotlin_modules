This repository aims to show how to integrate Kotlin to native modules in React Native in a natural (simulated) situation.
The app proposes a schedule of events, where the app uses different native modules to accomplish some functionalities.

This document explains how the app works from the React Native app to the creation of native modules using Kotlin,
showing how to integrate Kotlin to a React Native app.

The app flow is when the user opens the app. The first thing to see is a list of registered meetings and a button to create more. 

To create more meetings, click on the button, and fill the fields with the name, description, location, end date, and the final date.

After clicking on a meeting on the list, the user will see information about the meeting and some functionalities. These functionalities are:

* Take a picture from the camera;
* Pick an image from the gallery;
* Create this meeting on the smartphone's calendar;
* Delete this meeting.

These images are attached to the meeting and rendered as a list below the others fields.

# React Native app structure
The code created to this app is all on the folders [src](./src) and [android](./android).

## src

* Components
    * This folder contains the components used for the pages to compose the app's interface.
* Context 
    * To manage the states of the application, I used React Context API.
* NativeModules
    * Here we have the interface to use a native component created in the following steps.
* NativeComponents
    * This folder contains interfaces to communicate with the native modules created in Kotlin in the following steps.
* Pages
    * The name is suggestive. This folder is to store the pages of the application.
* Routes
    * Routes defined to the app.
* Theme
    * File focused on creating a color palette for the app.

## Android
More specifically, ***android/app/src/main/java/com/schedule_kotlin_modules*** contains our created native modules and the configuration to expose these modules to the Javascript side.

# React Native setup to create native modules using Kotlin
This project is focused on using Kotlin to create native modules. Before start ***is very recommended update the gradle version***.

## build.gradle
In this [build.gradle](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/build.gradle), we need to add a Kotlin version and add it as a dependency.
```
buildscript {
    ext {
        ...
        kotlin_version = "1.6.20"
    }
    ...
    dependencies {
        ...
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        ...
    }
}
```

## app/build.gradle
The following file is [android/app/build.gradle](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/app/build.gradle), Here just apply the Kotlin plugin as a dependency
```
apply plugin: "com.android.application"
apply plugin: "kotlin-android" // Add this line
...
dependencies {
    ...
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version" // Add this line
    implementation "com.facebook.react:react-native:+"  // From node_modules
    ...
}
```

# App native modules
To be more organized creating native modules using Kotlin I created a directory called [kotlin](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/tree/main/android/app/src/main/java/com/schedule_kotlin_modules/kotlin)

## Calendar Module
This module receives the meetings and sends them to the smartphone's calendar to save them.
```
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
```
[CalendarModule.kt](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/app/src/main/java/com/schedule_kotlin_modules/kotlin/CalendarModule.kt)
is our first native module. To explain this module, the first thing to do is extends the class ***ReactContextBaseJavaModule***.
yes, the name contains ***.java*** because Kotlin and Java are interoperable.
After creating the class and extending the ***ReactContextBaseJavaModule***.
it is necessary to override the function getName returning a string that is the module's name to be read on the Javascript side. This is a common step to develop node modules.

The annotation ***@ReactMethod*** is used in methods exposed to the Javascript side.
In our case, the method receives the information about the meeting, creates an Intent to the calendar,
fills the fields, and finally uses the application's context to start the activity.

#### Javascript

The interface to handle this native module, [CalendarModule.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/NativeModules/CalendarModule.js) imports the module and export it to the Javascript side.
```
import { NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;

/**
 * DatePickerModule
 * Avaliable functions:
 * - createEvent(title, location, startDate, endDate)
 *      - title: String
 *      - location: String
 *      - startDate: String dd/mm/yy
 *      - endDate: String dd/mm/yy
*/
export default CalendarModule;
```
To use this feature in the app, go to a meeting vision in [Meet.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/Pages/Meet.js) 
and press the calendar icon. The icon will call the method:

```
onPress: () => {
                  const {
                    title, location, init, end,
                  } = route.params;
                  CalendarModule.createEvent(title, location, init, end);
                },
```

##  DatePicker Module
This module is used on the screen to create meetings. It's a view opened to insert dates in the meeting information.
```
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
```

The structure to create native modules in [DatePickerModule.kt](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/app/src/main/java/com/schedule_kotlin_modules/kotlin/DatePickerModule.kt) is the same as the others extending ***ReactContextBaseJavaModule*** and overriding the function getName.

In this module, it is possible to see the concept of callback used very often in Javascript. This callback is a function passed as a parameter, and when the task in the method is over, this callback is called to return some value to the point where the method was called.

The method marked with ***@ReactMethod*** defines a listener that gets the date picker data, handles this data, and calls the parameter callback. Finally, the method shows a ***DatePickerDialog*** from android. 

An important note about the callback is that each callback can be called once.

#### Javascript

The interface to handle this native module, [DatePickerModule.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/NativeModules/DatePickerModule.js) imports the module and export it to the Javascript side.

```
import { NativeModules } from 'react-native';

const { DatePickerModule } = NativeModules;

/**
 * DatePickerModule
 * Avaliable functions:
 * - openDatePicker(callback)
 *      - callback: a function to set the picked date
*/

export default DatePickerModule;
```
To use this feature in the app, go the main view in [Home.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/Pages/Home.js). In the page to create meetings [CreateMeet.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/Pages/CreateMeet.js), just press the field related to dates. 

The function called is:
```
onPress={() => DatePickerModule.openDatePicker(props.onChangeText)}
```
Where the onChangeText us created from a useState React hook, to update the string returned in the callback.
