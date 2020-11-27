import React from 'react';
import {Modal, Pressable} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import styles from './History.styles';
import {IDate} from './HistorySelect.types';

const HistorySelectCalendarModal = ({
  fromDateCalendarVisible,
  setFromDateCalendarVisible,
  toDateCalendarVisible,
  setToDateCalendarVisible,
  handleDayPress,
  fromDate,
  toDate,
}: {
  fromDateCalendarVisible: boolean;
  setFromDateCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toDateCalendarVisible: boolean;
  setToDateCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDayPress: (day: DateObject, type: string) => void;
  fromDate: IDate;
  toDate: IDate;
}) => {
  return (
    <>
      <Modal transparent={true} visible={fromDateCalendarVisible}>
        <Pressable
          style={styles.centered}
          onPress={() => setFromDateCalendarVisible(false)}>
          <Calendar
            markedDates={fromDate}
            onDayPress={(day) => handleDayPress(day, 'fromDate')}
          />
        </Pressable>
      </Modal>
      <Modal transparent={true} visible={toDateCalendarVisible}>
        <Pressable
          style={styles.centered}
          onPress={() => setToDateCalendarVisible(false)}>
          <Calendar
            markedDates={toDate}
            onDayPress={(day) => handleDayPress(day, 'toDate')}
          />
        </Pressable>
      </Modal>
    </>
  );
};

export default HistorySelectCalendarModal;
