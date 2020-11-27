import React from 'react';
import {Text} from 'react-native';
import Config from 'react-native-config';
import {useDispatch} from 'react-redux';
import {loginAsync} from '../../features/authorization/authorizationSlice';
import LoginComponent, {PIN_Pattern, User_ID_Pattern} from './Login.component';

const Login = () => {
  const [User_ID, setUser_ID] = React.useState<string>('');
  const [PIN, setPIN] = React.useState<string>('');

  const dispatch = useDispatch();

  function handleLogin() {
    if (User_ID.match(User_ID_Pattern) && PIN.match(PIN_Pattern)) {
      dispatch(loginAsync(User_ID, PIN));
    }
  }

  return (
    <>
      <Text>{Config.baseUrl}</Text>
      <LoginComponent
        handleLogin={handleLogin}
        User_ID={User_ID}
        setUser_ID={setUser_ID}
        PIN={PIN}
        setPIN={setPIN}
      />
    </>
  );
};

export default Login;
