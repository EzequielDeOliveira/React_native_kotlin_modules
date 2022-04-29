/**
 * DatePickerModule
 * Avaliable functions:
 * - openDatePicker(callback)
 *      - callback: a function to set the picked date
*/
import { NativeModules } from 'react-native';
const { DatePickerModule } = NativeModules;
export default DatePickerModule;
