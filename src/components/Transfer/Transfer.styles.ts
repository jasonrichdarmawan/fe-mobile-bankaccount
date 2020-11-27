import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  wrapperPressable: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  row: {
    flexDirection: 'row',
  },
  modalTextContainer: {
    flex: 1 / 2,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
});

export default styles;
