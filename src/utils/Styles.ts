import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

const globalStyles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    color: Colors.text,
    fontWeight: 'bold',
  },
  textInput: {
    margin: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    color: Colors.text,
  },
});

export default globalStyles;
