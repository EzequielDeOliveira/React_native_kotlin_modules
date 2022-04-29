import React from 'react';
import { View, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { ImageView } from '../NativeComponents/ImageView';

const Meet = ({ }) => {
    const route = useRoute();

    return (
        <View>
            <Text>{route.params.title}</Text>
            <Text>{route.params.description}</Text>
            <Text>{route.params.init}</Text>
            <Text>{route.params.end}</Text>
            <ImageView style={{ height: 200, width: 200 }} src={{ uri: "https://i.pinimg.com/originals/f5/1d/08/f51d08be05919290355ac004cdd5c2d6.png" }} />
        </View>
    );
}
export default Meet;