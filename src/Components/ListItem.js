import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Theme from '../Theme';

const ListItem = ({
  title, description, init, end, location, id, images,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Meet', {
        title, description, init, end, location, id, images,
      })}
    >
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>
          {init}
          -
          {end}
        </Text>
      </View>
      <Text style={styles.description}>{description?.length > 210 ? description?.slice(0, 220).trim() + '...' : description}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.backgroundB3,
    padding: '4%',
    overflow: 'hidden',
    borderRadius: 20,
    marginHorizontal: '1%',
    marginVertical: ' 2%',
    marginBottom: 0,
  },
  title: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: Theme.text,
    marginBottom: '2%',
  },
  head: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    justifyContent: 'center',
    color: Theme.text,
    fontSize: 13,
  },
  text: {
    color: Theme.text,
    fontWeight: '500',
    fontSize: 13,
  },
});

export default ListItem;
