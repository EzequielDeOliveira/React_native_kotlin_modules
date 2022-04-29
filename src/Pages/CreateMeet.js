import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DatePickerInput from '../Components/DatePickerInput';
import DefaultInput from '../Components/DefaultInput';
import FloatButton from '../Components/FloatButton';

const CreateMeet = () => (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            <DefaultInput title='Nome' />
            <DefaultInput title='Descrição' />
            <DatePickerInput title='Inicio' />
            <DatePickerInput title='Fim' />
            <DefaultInput title='Localização' />
        </ScrollView>
        <FloatButton longButton text="Salvar"/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%'
    },
    scroll: {
        marginBottom: '15%'
    }
});

export default CreateMeet;