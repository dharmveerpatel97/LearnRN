import { View, Text } from 'react-native'
import React, { createContext } from 'react'

export const Colors = createContext();

let color ={
  themeColor:"red",
  grey:'grey'
  
}
export default function ColorContext(props) {
  return (
    <Colors.Provider value={color}>
      {props.children}
    </Colors.Provider>
  )
}