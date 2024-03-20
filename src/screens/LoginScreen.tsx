import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { LoginScreenNavigationProp } from '../types/NavigationTypes';
import { UserCredentials } from '../types/AuthTypes';
import { requestToken, validateToken, createSession } from '../api/authService';
import { useAuth } from '../contexts/AuthContext';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, setSessionId } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
            <Button
              onPress={() => handleSubmit()}
              title="Log In"
              color="#1f1f1f"
            />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  error: {
    fontSize: 10,
    color: 'red',
    width: '80%',
  },
});

export default LoginScreen;
