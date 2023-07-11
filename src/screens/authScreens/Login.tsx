import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextField } from '../../components'
import { ButtonWithTitle } from '../../components/ButtonWithTitle';
//@ts-ignore
import { fcmService } from "../../FCMServices/FCSServices";
import { localNotificationService } from "../../FCMServices/LocalNotificationService";
import { useContext } from 'react';
import { Colors } from '../ColorContext';
import { TextFieldWithIcons } from '../../components/TextFieldWithIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as Yup from "yup";

const validationSchema = Yup.object({
  // var passw=  /^[A-Za-z]\w{7,14}$/; To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});


interface LoginProps {
}
const Login: React.FC<LoginProps> = ({ }) => {
  const value = useContext(Colors)
  console.log('value', value)
  const [title, setTitle] = useState('Login')
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Text style={{ fontSize: 30, fontWeight: '400' }}>Login</Text>
      </View>
      <View style={styles.body}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange,setFieldTouched, handleBlur, handleSubmit, errors, touched, values }) => (
            <>
              <TextField
                placeholder="Email ID"
                value={values.email}
                onTextChange={handleChange('email')}
                onBlured={()=>setFieldTouched('email')}
                isSecure={false}
                error={(errors.email && touched.email) ? errors.email : ''}
              />

              <View style={{ marginTop: 6 }}>
                <TextFieldWithIcons
                  placeholder="Password"
                  isSecure={true}
                  onTextChange={handleChange('password')}
                  onBlured={()=>setFieldTouched('password')}
                  value={values.password}
                  iconType="right"
                  rightIcon={<FontAwesome name="eye" size={30} color="#000" />}
                  error={(errors.password && touched.password) ? errors.password : ''}
                />
              </View>

              <ButtonWithTitle 
                title={title} 
                height={50} 
                width={350} 
                onTap={() => { }} 
              />

              <Text style={{ fontSize: 16, color: '#3980D9', textAlign: 'center', marginTop: 20 }}>{"No Account? Signup Here"}</Text>
            </>
          )}
        </Formik>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 30
  },
  body: {
    flex: 6,
  }
})


export default Login