import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/authScreens/Login';
import Signup from '../screens/authScreens/Signup';
import Splash from '../screens/Splash';
import LoadMore from '../screens/LoadMore';
import MapGoogle from '../screens/MapGoogle';

export default function StackNavigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="MapGoogle" component={MapGoogle} options={{ headerShown: false }}/>
            <Stack.Screen name="Spalsh" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="LoadMore" component={LoadMore} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}