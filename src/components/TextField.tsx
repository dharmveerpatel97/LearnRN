import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface TextFieldProps{
    onTextChange: Function;   
    onBlured: Function;   
    error: string | undefined | boolean,
    placeholder?:string,
    value?:string,
    isSecure?:boolean,
}


const TextField: React.FC<TextFieldProps> = ({ 
  onTextChange,
  error,
  placeholder,
  isSecure=false,
  value,
  onBlured
}) => {



return (
  <View style={{width:"100%"}}>
    <View style={[styles.textInputContainer,{borderColor: error ?'red' : "#00000045"}]}>
        <TextInput 
          style={styles.textInput}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => onTextChange(text)}
          onBlur={(e) => onBlured(e)}
        />
    </View>
    {
    error 
    && 
    <Text style={{
      textAlign:"left",
      marginLeft:5.9,
      marginTop:2,
      color:'red'
      }}>{error}</Text>
    }
  </View>
)}


const styles = StyleSheet.create({
  textInputContainer: { 
    height: 50,
    borderRadius:10,
    borderWidth:1,
    alignItems:"center",
    justifyContent:'center',
    paddingHorizontal:10,
    backgroundColor:"#00000030",
  },
  textInput:{
    width:'100%',
    height:'94%',
    color:"#000",
    fontSize:15
  }
})

 export { TextField }