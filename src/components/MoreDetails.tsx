import { StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../utils/Colors';

interface Props {
  link: string;
}

const MoreDetails: React.FC<Props> = ({ link }) => {
  const onMoreDetailsPress = async () => {
    const url = link || 'https://regovista.com';
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error('Cannot open URL:', url);
    }
  };
  return (
    <View>
      <Text
        onPress={onMoreDetailsPress}
        style={styles.button}
      >
        More Details
      </Text>
    </View>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },
});
