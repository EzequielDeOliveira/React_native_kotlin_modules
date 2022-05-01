import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DatePickerInput from '../Components/DatePickerInput';
import DefaultInput from '../Components/DefaultInput';
import FloatButton from '../Components/FloatButton';

import { useSchedule } from '../Context';

const CreateMeet = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [init, setInit] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState();
  const { createEvent } = useSchedule();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <DefaultInput
          title="Title"
          onChangeText={setTitle}
          value={title}
        />
        <DefaultInput
          title="Description"
          onChangeText={setDescription}
          value={description}
          multiline
          numberOfLines={4}
          maxLength={300}
          textAlignVertical="top"
        />
        <DatePickerInput
          title="Start Date"
          onChangeText={setInit}
          value={init}
        />
        <DatePickerInput
          title="End Date"
          onChangeText={setEnd}
          value={end}
        />
        <DefaultInput
          title="Location"
          onChangeText={setLocation}
          value={location}
        />
      </ScrollView>
      <FloatButton
        longButton
        text="Save"
        onPress={() => {
          if (title && description && init && end && location) {
            createEvent({
              title, description, init, end, location,
            });
          }
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
  },
  scroll: {
    marginBottom: '24%',
  },
});

export default CreateMeet;
