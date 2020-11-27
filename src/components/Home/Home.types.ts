import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App.types';

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type Props = {
  navigation: HomeScreenNavigationProp;
};
