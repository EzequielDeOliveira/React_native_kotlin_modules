import React from 'react';
import {
  View, TextInput, Text, StyleSheet,
} from 'react-native';

import Theme from '../Theme';

const DefaultInput = ({ title, ...props }) => (
  <View style={styles.container}>
    <Text style={styles.title}>
      {title}
      :
    </Text>
    <TextInput
      style={styles.input}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: '2%',
  },
  title: {
    fontWeight: 'bold',
    color: Theme.backgroundB2,
    marginVertical: '3%',
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Theme.backgroundB2,
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
});

export default DefaultInput;
