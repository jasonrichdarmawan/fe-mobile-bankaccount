import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import getBalance from './Balance.service';
import styles from './Balance.styles';

const Balance = () => {
  const Account_Number = useSelector(
    (state: RootState) => state.authorization.Account_Number,
  );
  const ISO_4217 = useSelector(
    (state: RootState) => state.authorization.ISO_4217,
  );
  const token = useSelector((state: RootState) => state.authorization.token);

  const lang = {
    Account_Number: ISO_4217 === 360 && 'No. Rekening',
    Currency: ISO_4217 === 360 && 'Mata Uang',
    Balance: ISO_4217 === 360 && 'Saldo Efektif',
  };

  const currency = ISO_4217 === 360 && 'IDR';

  const [balance, setBalance] = React.useState<string | number>('');

  React.useEffect(() => {
    if (token !== undefined) {
      getBalance(token).then((data) => {
        setBalance(data.balance);
      });
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.tr}>
        <Text style={styles.th}>{lang.Account_Number}</Text>
        <Text style={styles.th}>{lang.Currency}</Text>
        <Text style={styles.th}>{lang.Balance}</Text>
      </View>
      <View style={styles.tr}>
        <Text style={styles.td}>{Account_Number}</Text>
        <Text style={styles.td}>{currency}</Text>
        <Text style={styles.td}>{balance}</Text>
      </View>
    </View>
  );
};

export default Balance;
