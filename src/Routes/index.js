import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import CreateMeet from '../Pages/CreateMeet';
import Meet from '../Pages/Meet';

const Stack = createNativeStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{title: "Eventos"}}/>
            <Stack.Screen name="CreateMeet" component={CreateMeet} options={{title: "Criar Evento"}}/>
            <Stack.Screen name="Meet" component={Meet} options={{title: "Evento"}}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;