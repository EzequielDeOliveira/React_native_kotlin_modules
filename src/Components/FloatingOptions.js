import React from 'react';
import { StyleSheet, View } from 'react-native';

import FloatButton from './FloatButton';

const FloatingOptions = ({
  items,
}) => (
  <View style={styles.container}>
    {
      items.map((item) => (
        <FloatButton absolute={false} key={item.icon} icon={item.icon} onPress={item.onPress} />
      ))
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default FloatingOptions;
