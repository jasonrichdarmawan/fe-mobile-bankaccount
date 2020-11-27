import React from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {validateToken} from '../../features/authorization/authorizationSlice';
import getAccount_Info, {Account_InfoModel} from './account_info.service';
import postTransaction, {
  transaction_progress,
  transaction_progressResponse,
} from './Transfer.service';
import styles from './Transfer.styles';

const Transfer = () => {
  const Account_Number = useSelector(
    (state: RootState) => state.authorization.Account_Number,
  );
  const token = useSelector((state: RootState) => state.authorization.token);

  const [destination, setDestination] = React.useState('');
  const [Account_Info, setAccount_Info] = React.useState<Account_InfoModel>();
  const [Transaction_Value, setTransaction_Value] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const [response, setResponse] = React.useState<transaction_progressResponse>(
    {},
  );

  React.useEffect(() => {
    let pattern = new RegExp('[0-9]');
    if (
      pattern.test(destination) &&
      destination.length === 17 &&
      Account_Number !== destination
    ) {
      const timeout = setTimeout(() => {
        if (token !== undefined) {
          if (validateToken(token)) {
            getAccount_Info(destination, token).then((data) => {
              setAccount_Info(data.account_info);
              setValid(true);
            });
          }
        }
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setAccount_Info({});
      setValid(false);
    }
  }, [Account_Number, destination, token]);

  function handleParseDestination(e: string) {
    if (e.length <= 17) {
      setDestination(e.replace(/[^0-9]/g, ''));
    }
  }

  function handleParseTransaction_Value(e: string) {
    if (e.length === 1) {
      setTransaction_Value(e.replace(/[^1-9]/g, ''));
    } else {
      setTransaction_Value(e.replace(/[^0-9]/g, ''));
    }
  }

  function handleSubmit() {
    if (valid && Account_Number !== destination && Transaction_Value !== '') {
      if (token !== undefined && validateToken(token)) {
        postTransaction(
          destination,
          parseInt(Transaction_Value, 0),
          token,
        ).then((data) => {
          setResponse({
            message_code: data.message_code,
            message: data.message,
          });
          setTimeout(() => {
            const location = data.location;
            if (location !== undefined) {
              transaction_progress(location, token).then((res) => {
                setResponse({
                  message_code: res.message_code,
                  message: res.message,
                  progress: res.progress,
                });
              });
            }
          }, 1000);
        });
      }
    } else {
      setResponse({
        message_code: 400,
        message: 'Bad Request',
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bold}>DARI REKENING</Text>
      <TextInput
        style={styles.TextInput}
        value={Account_Number}
        editable={false}
      />
      <Text style={styles.bold}>REKENING TUJUAN</Text>
      <TextInput
        style={styles.TextInput}
        onChangeText={(text) => handleParseDestination(text)}
        value={destination}
        keyboardType="phone-pad"
      />
      <Text>{Account_Info?.Full_Name}</Text>
      <Text style={styles.bold}>JUMLAH</Text>
      <TextInput
        style={styles.TextInput}
        onChangeText={(text) => handleParseTransaction_Value(text)}
        value={Transaction_Value}
        keyboardType="phone-pad"
      />
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperPressable,
        ]}
        onPress={handleSubmit}>
        <Text>KIRIM</Text>
      </Pressable>
      <Modal
        visible={Object.entries(response).length !== 0 && true}
        transparent={true}>
        <Pressable style={styles.centered} onPress={() => setResponse({})}>
          <View style={styles.row}>
            <View style={styles.modalTextContainer}>
              <Text>Message code: {response.message_code}</Text>
              <Text>Message: {response.message}</Text>
              {response.progress !== undefined && (
                <Text>Progress: {response.progress.message_Code}</Text>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Transfer;
