import React from 'react';
import { View, TextInput, Text, StyleSheet} from 'react-native';

const DefaultInput = ({ title = "Titulo" }) => (
    <View style={styles.container}>
        <Text>
            {title}
        </Text>
        <TextInput 
            style={styles.input}
        />
    </View>
);

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