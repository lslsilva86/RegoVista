import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoginScreenNavigationProp } from '../types/NavigationTypes';
import { UserCredentials } from '../types/AuthTypes';
import { requestToken, validateToken, createSession } from '../api/authService';
import { useAuth } from '../contexts/AuthContext';
import { Colors } from '../utils/Colors';
import globalStyles from '../utils/Styles';
import { displayError } from '../utils/CommonFunctions';

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
              const newSessionId = await createSession(token);
              setSessionId(newSessionId);
              login();
            }
          } catch (error) {
            displayError(error, 'Failed login:');
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
              autoCapitalize="none"
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
              autoCapitalize="none"
            />
            {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <TouchableOpacity
              activeOpacity={1}
              style={styles.button}
            >
              <Text
                onPress={() => handleSubmit()}
                style={globalStyles.button}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: Colors.primary,
  },
  button: {
    backgroundColor: 'transparent',
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
