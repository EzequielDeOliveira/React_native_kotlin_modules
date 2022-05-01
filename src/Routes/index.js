import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import CreateMeet from '../Pages/CreateMeet';
import Meet from '../Pages/Meet';
import Theme from '../Theme';

const Stack = createNativeStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.background,
        },
        headerTintColor: Theme.text,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: 'Next Events' }} />
      <Stack.Screen name="CreateMeet" component={CreateMeet} options={{ title: 'Create Event' }} />
      <Stack.Screen name="Meet" component={Meet} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
