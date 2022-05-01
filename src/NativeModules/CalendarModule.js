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
