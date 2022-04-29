import { NativeModules } from 'react-native';
const { DatePickerModule } = NativeModules;

/**
 * DatePickerModule
 * Avaliable functions:
 * - openDatePicker(callback)
 *      - callback: a function to set the picked date
*/

export default DatePickerModule;
