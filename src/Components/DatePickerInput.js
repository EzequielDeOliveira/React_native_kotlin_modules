import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import DefaultInput from './DefaultInput';
import DatePickerModule from '../NativeModules/DatePickerModule';

const DatePickerInput = ({ title, ...props }) => (
  <TouchableOpacity
    onPress={() => DatePickerModule.openDatePicker(props.onChangeText)}
  >
    <View pointerEvents="none">
      <DefaultInput title={title} {...props} />
    </View>
  </TouchableOpacity>
);

export default DatePickerInput;
