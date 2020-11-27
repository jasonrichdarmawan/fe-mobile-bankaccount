import React from 'react';
import {Text, View, TextInput, Pressable} from 'react-native';
import styles from './Login.styles';
import Icon from 'react-native-vector-icons/AntDesign';

export const User_ID_Pattern = new RegExp('^[a-zA-Z0-9]{12}$');
export const PIN_Pattern = new RegExp('^[0-9]{6}$');

const LoginComponent = ({
  handleLogin,
  User_ID,
  setUser_ID,
  PIN,
  setPIN,
}: {
  handleLogin: () => void;
  User_ID: string;
  setUser_ID: React.Dispatch<React.SetStateAction<string>>;
  PIN: string;
  setPIN: React.Dispatch<React.SetStateAction<string>>;
}) => {
  function handleParsePIN(pin: string) {
    setPIN(pin.replace(/[^0-9]/g, ''));
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.colorblue, styles.underline]}>
        Silahkan masukkan User ID Anda
      </Text>
      <Text style={[styles.text, styles.colororange]}>
        Please enter Your User ID
      </Text>
      <TextInput
        style={styles.TextInput}
        onChangeText={(text) => setUser_ID(text)}
        value={User_ID}
      />

      <Text>
        User_ID length is 12 alphabet.{' '}
        <Icon
          name={User_ID_Pattern.test(User_ID) ? 'check' : 'close'}
          color={User_ID_Pattern.test(User_ID) ? 'green' : 'red'}
        />
      </Text>

      <Text>{'\n'}</Text>

      <Text style={[styles.text, styles.colorblue, styles.underline]}>
        Silahkan masukkan PIN Internet Banking Anda
      </Text>
      <Text style={[styles.text, styles.colororange]}>
        Please enter Your Internet Banking PIN
      </Text>
      <TextInput
        style={styles.TextInput}
        secureTextEntry={true}
        onChangeText={(text) => handleParsePIN(text)}
        value={PIN}
      />

      <Text>
        PIN length is 6{' '}
        <Icon
          name={PIN_Pattern.test(PIN) ? 'check' : 'close'}
          color={PIN_Pattern.test(PIN) ? 'green' : 'red'}
        />
      </Text>

      <Text>{'\n'}</Text>

      <Pressable
        onPress={handleLogin}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperPressable,
        ]}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default LoginComponent;
