# Developing native modules in React Native Using Kotlin 
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

### Javascript

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

![ezgif com-gif-maker(1)](https://user-images.githubusercontent.com/37127457/167781498-49dd89b5-4234-48ca-b993-5a0f9bdb3533.gif)


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

### Javascript

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

![ezgif com-gif-maker(2)](https://user-images.githubusercontent.com/37127457/167781674-9f688e6c-a391-4fe3-b2b2-d8a7993bf7a8.gif)

## Image Picker Module
This module is the most complex because it approaches another very used concept of Javascript, the concept of promises. A short explanation about promises, promises are a mechanism to call asynchronous functions, these functions have their routines, but nobody knows how much time the routine needs precisely. This routine can resolve the promise and return positively, or the promise can be rejected, and the result is negative.

This module can get images from the gallery and camera to attach to the current meeting.
Here the [ImagePickerModule.kt](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/app/src/main/java/com/schedule_kotlin_modules/kotlin/ImagePickerModule.kt) is bigger than the others. Then we need to explain in more detail what each method does.

After creating the standard structure for native modules, let's start with the methods in this module.

#### Creating file
```
private fun createFile(): File {
        val timestamp: String = SimpleDateFormat("yyyy_MM_dd_mm_ss").format(Date())
        val dir: File? = currentActivity?.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        return File.createTempFile(
            "JPEG_${timestamp}_",
            ".jpg",
            dir
        )
    }
```
To get images from the camera, we need to create a file to store our images where the name is defined by the current timestamp and the file's extension.

#### Activity listener
```
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
```

This listener is defined because to get the images needs to open another activity like the camera or the gallery. The listener just waits for a response from the activities.

If the promise is not null, the listener checks the result code of the activity and, finally, checks the request code that matches each activity's defined id.

After this process, the listener handles the result and resolves or rejects our promise.

#### React methods

Two methods are exposed to the Javascript side.

```
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
```
The first is to get images from the gallery, receive the promise as a parameter, initialize an intent to the gallery, and start it. If any error occurs, the method is aborted and returns a promise rejection.

```
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
   ```
   
The last one is to take pictures using the camera. The method receives the promise from the Javascript side, checks if all the resources are available to finish the method, and finally try to initialize an intent, check if the image was created correctly, and pass the Uri of the image to the intent, and finally initialize the activity. If any error occurs, the method is aborted and returns a promise rejection.

### Javascript

The interface to handle this native module, [ImagePickerModule.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/NativeModules/ImagePickerModule.js) imports the module and export it to the Javascript side.

```

import { NativeModules } from 'react-native';

const { ImagePickerModule } = NativeModules;

/**
 * ImagePickerModule
 * Avaliable functions:
 * - pickFromGallery() ~ Promise
 *      - promise: used to get image data
 * - pickFromCamera() ~ Promise
 *      - promise: used to get image data
*/

export default ImagePickerModule;
```
To use this feature in the app, go to a meeting vision in [Meet.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/Pages/Meet.js) 
and press the schedule or camera icon. The icon will call one of the methods: passing a promise and expecting the result to attach on the current meeting.

```

  const getImageFromGallery = async () => {
    setLoading(true);
    try {
      const result = await ImagePickerModule.pickFromGallery();
      addImage(route.params.id, result);
      setImages((prev) => [...prev, result]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
```
![ezgif com-gif-maker(3)](https://user-images.githubusercontent.com/37127457/167782634-adf4332f-9cfd-4ac9-9e8b-9459dd72e692.gif)

```
  const getImageFromCamera = async () => {
    setLoading(true);
    try {
      const result = await ImagePickerModule.pickFromCamera();
      addImage(route.params.id, result);
      setImages((prev) => [...prev, result]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
 ```
 
![ezgif com-gif-maker(7)](https://user-images.githubusercontent.com/37127457/167782864-dea47d23-2b67-4dee-99a8-e4e77869ebe9.gif)

## Native Image View
Now we have a native component instead of a native component. This component was part of the study to create this application.

This component is created above another image component, so we need to extend ***SimpleViewManager<ReactImageView>***, but the function getName still needs to be overridden.
   
 The method to create setters to the component is an annotation like ***@ReactProp*** in our case was necessary to set the source of the image.
   
 The component [NativeImageView.kt](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/app/src/main/java/com/schedule_kotlin_modules/kotlin/NativeImageView.kt) is based on the idea of the [React Native's documentation](https://reactnative.dev/docs/native-components-android) 
   
 ```
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
 ```
   
 ### Javascript

The interface to handle this native component, [ImageView.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/NativeComponents/ImageView.js) imports the module and export it to the Javascript side.
   
 ```
import { requireNativeComponent } from 'react-native';

/**
 * Composes `View`
 *
 * - src: {uri: string}
 *
 */

const ImageView = requireNativeComponent('CustomNativeImage');

export default ImageView;
 ```
To use this feature in the app, go to a meeting vision in [Meet.js](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/src/Pages/Meet.js) and use this component like that.
   
 ```
<ImageView
   style={styles.image}
   key={index}
   src={{ uri: item }}
/>
```
![ezgif com-gif-maker(7)](https://user-images.githubusercontent.com/37127457/167782951-ef6b63ff-8b31-4b74-8758-f1d93147c3d9.gif)

## App package
Native modules and native components must be exposed to the Javascript side by a package. In this case, I created a package in Kotlin to expose our modules. [KotlinAppPackage.kt](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/main/android/app/src/main/java/com/schedule_kotlin_modules/kotlin/KotlinAppPackage.kt)
   
```
class KotlinAppPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext):
            MutableList<NativeModule> = listOf(
        DatePickerModule(reactContext),
        ImagePickerModule(reactContext),
        CalendarModule(reactContext)
    ).toMutableList()

    override fun createViewManagers(reactContext: ReactApplicationContext) = listOf(NativeImageView(reactContext)).toMutableList()
}
```
   
After returning the modules and the components passing the application context to them, we need to add this package to the [MainApplication.java](https://github.com/EzequielDeOliveira/React_native_kotlin_modules/blob/092d492d0abcc99cbf65b43ae1bbfdf25640c75d/android/app/src/main/java/com/schedule_kotlin_modules/MainApplication.java#L31).

```
   ...
       protected List<ReactPackage> getPackages() {
          ...
          packages.add(new KotlinAppPackage()); // This line
          return packages;
        }
   ...
```
   
If you did the Kotlin configuration step correctly, now all works fine. :smile:
