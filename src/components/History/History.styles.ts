import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  wrapperPressable: {
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  submit: {
    alignSelf: 'flex-end',
  },
  bold: {
    fontWeight: 'bold',
  },
  colorblue: {
    color: 'darkblue',
  },
  colorred: {
    color: 'red',
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
  tr: {
    flexDirection: 'row',
  },
  th: {
    flex: 1,
    fontWeight: 'bold',
  },
  td: {
    flex: 1,
  },
});

export default styles;
