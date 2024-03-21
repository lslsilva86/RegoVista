import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { LoginScreenNavigationProp } from '../types/NavigationTypes';
import { UserCredentials } from '../types/AuthTypes';
import { requestToken, validateToken, createSession } from '../api/authService';
import { useAuth } from '../contexts/AuthContext';
import { Colors } from '../utils/Colors';
import globalStyles from '../utils/Styles';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen: React.FC<Props> = ({}) => {
  const { login, setSessionId } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require('../../assets/logo.png')} />
      </View>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const credentials: UserCredentials = {
              username: values.username,
              password: values.password,
            };
            const token = await requestToken();
            const isValidated = await validateToken(credentials, token);

            if (isValidated) {
              const sessionId = await createSession(token);
              setSessionId(sessionId); // Update the session ID in the context
              login(); // Mark user as logged in
              console.log('Logged in! Session ID:', sessionId);
              // Navigate to the next screen or perform additional login success actions here
            } else {
              console.log('Login failed during token validation.');
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Failed login:', error.response?.data.message || error.message);
            } else if (error instanceof Error) {
              console.error('Failed login:', error.message);
            } else {
              console.error('Failed login:', 'An unknown error occurred');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={globalStyles.textInput}
              placeholder="Username"
              placeholderTextColor={Colors.text}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
            <TextInput
              style={globalStyles.textInput}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={Colors.text}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <TouchableOpacity style={globalStyles.button}>
              <Button
                onPress={() => handleSubmit()}
                title="Log In"
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: Colors.primary,
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  error: {
    marginBottom: 10,
    fontSize: 12,
    color: Colors.error,
    textAlign: 'center',
  },
});

export default LoginScreen;
