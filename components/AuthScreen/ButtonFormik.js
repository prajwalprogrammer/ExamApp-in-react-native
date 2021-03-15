import React from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
  <View style={styles.signIn}>
    <Button
      {...rest}
      type={buttonType}
      title={title}
      buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
      titleStyle={{ color: 'white' }}
    />
  </View>
);

export default FormButton;
const styles = StyleSheet.create({
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
