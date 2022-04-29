import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const DefaultInput = ({ title, disabled, value }) => {
    const [text, setText] = useState();
    return (
        <View style={styles.container}>
            <Text>
                {title}
            </Text>
            <TextInput
                style={styles.input}
                editable={!disabled}
                onChangeText={setText}
                value={disabled ? value : text}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '2%'
    },
    text: {},
    input: {
        borderWidth: StyleSheet.hairlineWidth
    }
});

export default DefaultInput;