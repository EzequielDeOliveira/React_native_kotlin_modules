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