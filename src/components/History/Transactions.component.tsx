import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import styles from './History.styles';
import {TransactionModel} from './HistorySelect.service';

const Transactions = ({transactions}: {transactions: TransactionModel[]}) => {
  const Account_Number = useSelector(
    (state: RootState) => state.authorization.Account_Number,
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tr}>
        <Text style={styles.th}>Tgl.</Text>
        <Text style={styles.th}>Keterangan</Text>
        <Text style={styles.th}>Mutasi</Text>
        <Text style={styles.th}>Saldo</Text>
      </View>
      {transactions.map((transaction, index) => {
        return (
          <View style={styles.tr} key={index}>
            <Text style={styles.td}>{transaction.Date}</Text>
            <Text style={styles.td}>
              {Account_Number === transaction.Source
                ? `TRSF DB ${transaction.Destination}`
                : `TRSF CR ${transaction.Source}`}
            </Text>
            <Text style={styles.td}>{transaction.transaction_Value}</Text>
            <Text style={styles.td}>{transaction.Ending_Balance}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Transactions;
