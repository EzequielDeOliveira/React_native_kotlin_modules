import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ListItem = ({ title, description, init, end }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("Meet", {
                title, description, init, end
            })}>
            <View style={styles.head}>
                <Text>{title}</Text>
                <Text>{init} - {end}</Text>
            </View>
            <Text style={styles.description}>{description.length > 210 ? description.slice(0, 220).trim() + '...' : description}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: '4%',
        overflow: 'hidden',
        borderRadius: 20,
        margin: '1%',
        marginBottom: 0,
        borderColor: 'black',
        borderWidth: 1
    },
    title: {
        marginRight: 10
    },
    head: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    description: {
        justifyContent: 'center',
    }
});

export default ListItem;