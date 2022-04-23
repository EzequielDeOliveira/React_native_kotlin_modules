import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import FloatButton from '../Components/FloatButton';
import ListItem from '../Components/ListItem';

const items = [
    {
        id: 1,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper lobortis ipsum at lacinia. Cras convallis ligula ut eros consequat sodales. Sed non dapibus leo. Phasellus lobortis quam ac sagittis luctus. ",
        init: "14/08 10:00",
        end: "14/09 12:00"
    },
    {
        id: 2,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper lobortis ipsum at lacinia. Cras convallis ligula ut eros consequat sodales. Sed non dapibus leo. Phasellus lobortis quam ac sagittis luctus. ",
        init: "14/08 10:00",
        end: "14/09 12:00"
    },
    {
        id: 3,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper lobortis ipsum at lacinia. Cras convallis ligula ut eros consequat sodales. Sed non dapibus leo. Phasellus lobortis quam ac sagittis luctus. ",
        init: "14/08 10:00",
        end: "14/09 12:00"
    },
    {
        id: 4,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper lobortis ipsum at lacinia. Cras convallis ligula ut eros consequat sodales. Sed non dapibus leo. Phasellus lobortis quam ac sagittis luctus. ",
        init: "14/08 10:00",
        end: "14/09 12:00"
    },
    {
        id: 5,
        title: "Titulo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper lobortis ipsum at lacinia. Cras convallis ligula ut eros consequat sodales. Sed non dapibus leo. Phasellus lobortis quam ac sagittis luctus. ",
        init: "14/08 10:00",
        end: "14/09 12:00"
    }
];

const Home = ({ navigation }) => (
    <SafeAreaView
        style={styles.container}
    >
        <FlatList
            contentContainerStyle={styles.list}
            data={items}
            renderItem={({item}) => <ListItem {...item} />}
            keyExtractor={(item) => item.id}
        />
        <FloatButton onPress={() => navigation.navigate("CreateMeet")} />
        <StatusBar barStyle='dark-content' backgroundColor={"#FFFFFF"}/>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%'
    },
    list: {
        paddingBottom: 50
    }
});

export default Home;