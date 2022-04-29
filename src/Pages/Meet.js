import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { ImageView } from '../NativeComponents/ImageView';
import ImagePickerModule from '../NativeModules/ImagePickerModule';

const Meet = ({ }) => {
    const route = useRoute();

    const onPress = async () => {
        try {
            let result = await ImagePickerModule.pickFromGallery();
            console.log(result)
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <View>
            <Text>{route.params.title}</Text>
            <Text>{route.params.description}</Text>
            <Text>{route.params.init}</Text>
            <Text>{route.params.end}</Text>
            <ImageView style={{ height: 200, width: 200 }} src={{ uri: "https://i.pinimg.com/originals/f5/1d/08/f51d08be05919290355ac004cdd5c2d6.png" }} />
            <TouchableOpacity onPress={onPress}>
                <Text>Pegar imagem da camêra</Text>
            </TouchableOpacity>
        </View>
    );
}
export default Meet;