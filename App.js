import {View} from 'react-native';
import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import ColorContext, {Colors} from './src/screens/ColorContext';

export default function App() {
  return (
    <ColorContext>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </View>
    </ColorContext>
  );
}
