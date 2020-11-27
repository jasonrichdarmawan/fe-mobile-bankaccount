import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './components/Login/Login';
import {RootStackParamList} from './App.types';
import {useDispatch, useSelector} from 'react-redux';
import {
  logout,
  selectIsLoggedIn,
} from './features/authorization/authorizationSlice';
import Home from './components/Home/Home';
import History from './components/History/History';
import {RootState} from './app/store';
import jwt_decode from 'jwt-decode';
import {IToken} from './features/authorization/token.types';
import {AppState, AppStateStatus, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './App.styles';
import Balance from './components/Balance/Balance';
import Transfer from './components/Transfer/Transfer';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const appState = React.useRef(AppState.currentState);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector((state: RootState) => state.authorization.token);

  const dispatch = useDispatch();

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  });

  function _handleAppStateChange(nextAppState: AppStateStatus) {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (token != null && token !== '') {
        const decoded = jwt_decode(token) as IToken;

        // auto logout
        if (decoded.exp * 1000 - Date.now() < 0) {
          dispatch(logout());
        }
      }
    }

    appState.current = nextAppState;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: '',
                headerRight: () => (
                  <Pressable
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed
                          ? 'rgb(210, 230, 255)'
                          : 'white',
                      },
                      styles.headerRight,
                    ]}
                    onPress={() => dispatch(logout())}>
                    <Icon name="logout" size={24} color="blue" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Balance"
              component={Balance}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Transfer"
              component={Transfer}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
