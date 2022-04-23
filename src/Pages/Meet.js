import React from 'react';
import { View, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';

const Meet = ({

}) => {
    const route = useRoute();
    console.log(route)
    return (
        <View>
            <Text>{route.params.title}</Text>
            <Text>{route.params.description}</Text>
            <Text>{route.params.init}</Text>
            <Text>{route.params.end}</Text>
        </View>
    );
}
export default Meet;