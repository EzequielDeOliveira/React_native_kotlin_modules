import React from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import FloatButton from '../Components/FloatButton';
import ListItem from '../Components/ListItem';
import Theme from '../Theme';
import { useSchedule } from '../Context';

const Home = ({ navigation }) => {
  const context = useSchedule();
  const { events } = context;

  useIsFocused();

  return (
    <SafeAreaView
      style={styles.container}
    >
      <FlatList
        contentContainerStyle={styles.list}
        data={events}
        renderItem={({ item }) => <ListItem {...item} />}
        keyExtractor={(item) => item.id}
      />
      <FloatButton onPress={() => navigation.navigate('CreateMeet')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    backgroundColor: Theme.backgroundB2,
  },
  list: {
    paddingBottom: 50,
  },
});

export default Home;
