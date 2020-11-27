import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import styles from './History.styles';

const HistorySelectValidatorModal = ({
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Modal visible={error !== '' && true} transparent={true}>
      <Pressable style={styles.centered} onPress={() => setError('')}>
        <View style={styles.row}>
          <View style={styles.modalTextContainer}>
            <Text>{error}</Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default HistorySelectValidatorModal;
