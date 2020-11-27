import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../App.types';
import {RootState} from '../../app/store';
import styles from './Home.styles';
import {Props} from './Home.types';

const Home = ({navigation}: Props) => {
  const Full_Name = useSelector(
    (state: RootState) => state.authorization.Full_Name,
  );

  function handleRoute(routeName: keyof RootStackParamList) {
    navigation.navigate(routeName);
  }

  return (
    <View style={styles.container}>
      <Text>Selamat datang,</Text>
      <Text style={styles.fontWeight}>{Full_Name}</Text>
      <View style={styles.row}>
        <Pressable
          onPress={() => handleRoute('History')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperPressable,
          ]}>
          <Text>Histori Transaksi</Text>
        </Pressable>
        <Pressable
          onPress={() => handleRoute('Transfer')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperPressable,
          ]}>
          <Text>Transfer Dana</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          onPress={() => handleRoute('Balance')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperPressable,
          ]}>
          <Text>Informasi Saldo</Text>
        </Pressable>
        <View style={styles.wrapperPressable} />
      </View>
    </View>
  );
};

export default Home;
