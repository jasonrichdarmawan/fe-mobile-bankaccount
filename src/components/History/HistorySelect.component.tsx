import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {DateObject} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {validateToken} from '../../features/authorization/authorizationSlice';
import styles from './History.styles';
import getTransactions, {
  getTransactionsPathVariable,
  TransactionModel,
} from './HistorySelect.service';
import {historyValidator} from './HistorySelect.Validator';
import HistorySelectCalendarModal from './HistorySelectCalendarModal.component';
import HistorySelectValidatorModal from './HistorySelectValidatorModal.component';

const HistorySelect = ({
  setTransactions,
  setIsTransactionsShown,
}: {
  setTransactions: React.Dispatch<React.SetStateAction<TransactionModel[]>>;
  setIsTransactionsShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [fromDate, setFromDate] = React.useState(() => {
    let today = new Date();
    today.setHours(24, 0, 0, 0);
    return {[today.toISOString().split('T')[0]]: {selected: true}};
  });

  const [toDate, setToDate] = React.useState(() => {
    let today = new Date();
    today.setHours(24, 0, 0, 0);
    return {[today.toISOString().split('T')[0]]: {selected: true}};
  });

  const [fromDateCalendarVisible, setFromDateCalendarVisible] = React.useState(
    false,
  );

  const [toDateCalendarVisible, setToDateCalendarVisible] = React.useState(
    false,
  );

  function handleDayPress(day: DateObject, type: string) {
    if (type === 'fromDate') {
      setFromDate({
        [day.dateString]: {selected: true},
      });
      setFromDateCalendarVisible(false);
    } else if (type === 'toDate') {
      setToDate({
        [day.dateString]: {selected: true},
      });
      setToDateCalendarVisible(false);
    }
  }

  const ISO_4217 = useSelector(
    (state: RootState) => state.authorization.ISO_4217,
  );

  const lang = {
    ID: {
      Error: {
        MaxDaysBetween: 'Histori transaksi maksimal 30 hari yang lalu.',
        SameAsToday:
          'Tanggal awal atau Tanggal akhir sama dengan tanggal hari ini.',
        ExceedToday:
          'Tanggal awal atau Tanggal akhir lebih besar dari tanggal hari ini.',
        StartExceedEnd: 'Tanggal awal melebihi Tanggal akhir',
      },
    },
  };

  const [error, setError] = React.useState('');

  const Account_Number = useSelector(
    (state: RootState) => state.authorization.Account_Number,
  );

  const token = useSelector((state: RootState) => state.authorization.token);

  function handleGetTransactions({Start, End}: getTransactionsPathVariable) {
    if (token !== undefined && validateToken(token)) {
      getTransactions({Start, End, token}).then((data) => {
        data.transactions.forEach((transaction, index) => {
          if (index === 0) {
            data.transactions[index].Ending_Balance = data.Opening_Balance;
          }
          if (Account_Number === data.transactions[index].Source) {
            data.transactions[index].Ending_Balance =
              data.transactions[Math.max(0, index - 1)].Ending_Balance -
              transaction.transaction_Value;
          } else if (Account_Number === data.transactions[index].Destination) {
            data.transactions[index].Ending_Balance =
              data.transactions[Math.max(0, index - 1)].Ending_Balance +
              transaction.transaction_Value;
          }
        });
        setTransactions(data.transactions);
        setIsTransactionsShown(true);
      });
    }
  }

  function handleSubmit() {
    const Start = Object.keys(fromDate)[0];
    const End = Object.keys(toDate)[0];

    let validator = historyValidator({
      Start: new Date(Start),
      End: new Date(End),
    });

    if (validator === 0) {
      handleGetTransactions({Start, End, token});
    } else if (validator === 1) {
      setError(ISO_4217 === 360 ? lang.ID.Error.SameAsToday : '');
    } else if (validator === 2) {
      setError(ISO_4217 === 360 ? lang.ID.Error.ExceedToday : '');
    } else if (validator === 3) {
      setError(ISO_4217 === 360 ? lang.ID.Error.StartExceedEnd : '');
    } else if (validator === 4 || validator === 5) {
      setError(ISO_4217 === 360 ? lang.ID.Error.MaxDaysBetween : '');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.bold, styles.colorblue]}>Periode Mutasi</Text>
      <Text style={[styles.bold, styles.colorblue]}>Dari Tanggal:</Text>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperPressable,
        ]}
        onPress={() => setFromDateCalendarVisible(true)}>
        <Text style={[styles.bold, styles.colorblue]}>
          {Object.keys(fromDate)[0]}
        </Text>
      </Pressable>
      <Text style={[styles.bold, styles.colorblue]}>Sampai Tanggal:</Text>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperPressable,
        ]}
        onPress={() => setToDateCalendarVisible(true)}>
        <Text style={[styles.bold, styles.colorblue]}>
          {Object.keys(toDate)[0]}
        </Text>
      </Pressable>
      <Text style={[styles.bold, styles.colorred]}>
        Mutasi rekening maksimum 30 hari yang lalu
      </Text>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperPressable,
          styles.submit,
        ]}
        onPress={handleSubmit}>
        <Text style={[styles.bold, styles.colorblue]}>Send</Text>
      </Pressable>
      <HistorySelectValidatorModal error={error} setError={setError} />
      <HistorySelectCalendarModal
        fromDateCalendarVisible={fromDateCalendarVisible}
        setFromDateCalendarVisible={setFromDateCalendarVisible}
        toDateCalendarVisible={toDateCalendarVisible}
        setToDateCalendarVisible={setToDateCalendarVisible}
        handleDayPress={handleDayPress}
        fromDate={fromDate}
        toDate={toDate}
      />
    </View>
  );
};

export default HistorySelect;
