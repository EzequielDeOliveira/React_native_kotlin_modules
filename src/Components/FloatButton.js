import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../Theme';

const FloatButton = ({
  onPress, longButton, text, absolute = true, icon,
}) => (
  <TouchableOpacity
    style={
      [
        styles.defaultButton,
        longButton ? styles.longButton : styles.addButton,
        absolute && {
          position: 'absolute',
        },
      ]
    }
    onPress={onPress}
  >
    {text
      ? <Text style={styles.text}>{text}</Text>
      : <Icon name={icon || 'plus'} size={25} color={Theme.text} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  defaultButton: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.backgroundB4,
    marginVertical: 2,
  },
  addButton: {
    width: 60,
    right: 10,
  },
  longButton: {
    width: '70%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: Theme.text,
  },
});

export default FloatButton;
