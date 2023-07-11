import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface TextFieldProps {
  onTextChange: Function;
  onBlured: Function;  
  error?: string,
  value?: string,
  placeholder: string,
  isSecure?: boolean,
  iconType?: string,
  rightIcon?: JSX.Element,
  leftIcon?: JSX.Element,
}


const TextFieldWithIcons: React.FC<TextFieldProps> = ({
  onTextChange,
  error,
  placeholder,
  isSecure = false,
  iconType = 'right',
  leftIcon,
  rightIcon,
  value,
  onBlured
}) => {

  return (
    <>
      <View style={[styles.textInputContainer, { borderColor: error ? 'red' : "#00000045" }]}>
        {
          (iconType=='left' || iconType=='both') &&
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        }
        <TextInput
          style={[
            (iconType == 'left' || iconType == 'right') ? styles.textInputWithLeftRightIcon:styles.textInputWithBothSide
          ]}
          secureTextEntry={isSecure}
          value={value}
          placeholder={placeholder}
          onChangeText={(text) => onTextChange(text)}
          onBlur={(e) => onBlured(e)}
        />
        {
          (iconType=='right' || iconType=='both') &&
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        }
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  )
}


const styles = StyleSheet.create({
  textInputContainer: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 6,
    backgroundColor: "#00000030",
    flexDirection: 'row',
  },
  leftIcon: {
    width: '10%',
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    width: '10%',
    justifyContent: "center",
    alignItems: "center",
  },
  textInputWithLeftRightIcon: {
    width: '90%',
    height: '90%',
    color: "#000",
    fontSize: 15,
  },
   
  textInputWithBothSide: {
    width: '80%',
    height: '90%',
    color: "#000",
    fontSize: 15,
  },
  errorText: {
    textAlign: "left",
    marginLeft: 5.9,
    marginTop: 2,
    color: 'red'
  }
})

export { TextFieldWithIcons }