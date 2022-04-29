import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import DefaultInput from './DefaultInput';
import DatePickerModule from '../NativeModules/DatePickerModule';

const DatePickerInput = ({ title }) => {
    const [date, setDate] = useState('');
    return (
        <TouchableOpacity onPress={() => DatePickerModule.openDatePicker(setDate)}>
            <DefaultInput title={title} disabled value={date}/>
        </TouchableOpacity>
    )
}

export default DatePickerInput;