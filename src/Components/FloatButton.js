import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const FloatButton = ({
    onPress, longButton, text
}) => (
    <TouchableOpacity style={[styles.defaultButton, longButton ? styles.longButton : styles.addButton]} onPress={onPress}>
        {text ?
            <Text style={styles.text}>{text}</Text>
            :
            <Icon name='add' size={30} color="#FFFFFF" />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    defaultButton: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 30,
        height: 60,
        borderRadius: 30,
    },
    addButton: {
        width: 60,
        right: 10,
        position: 'absolute',
    },
    longButton: {
        width: '70%',
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: '#FFFFFF'
    }
});

export default FloatButton;