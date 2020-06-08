import React, {useEffect, useContext, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import styled from 'styled-components';
import UserContext from '../../utils/UserContext';
import {signin} from "../../utils/api";

const View = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const TextInput = styled.TextInput`
  margin-bottom: 20px;
  background: ${props => props.theme.grey2};
  color: ${props => props.theme.white};
  width: 60%;
  max-width: 300px;
`;
const Button = styled.Button`
  margin-bottom: 20px;
  width: 60%;
  max-width: 300px;
`;

function Login({onRegistration}) {
  const {login} = useContext(UserContext);
  const ref = useRef(null);
  const { register, setValue,  handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const user = await signin(data);
    if (user.pseudo) {
      await login(user);
    } else {
     Alert.alert('Nop', 'Réessaye, tu as dû te tromper');
    }
  };

  useEffect(() => {
    register({ name: 'mail'}, { required: true });
    register({ name: 'password'}, { required: true });
  }, [register]);

  return (
    <View>
      <TextInput
        onChangeText={text => setValue('mail', text, true)}
        autoCapitalize="none"
        placeholder="Mail"
        autoCorrect={false}
        onSubmitEditing={ref.focus}
      />
      <TextInput
        onChangeText={text => setValue('password', text, true)}
        autoCapitalize="none"
        placeholder="Mot de passe"
        autoCorrect={false}
        secureTextEntry
        ref={ref}
        onSubmitEditing={() => handleSubmit(onSubmit)}
      />
      <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />
      <Button title="Inscription" onPress={onRegistration} />
    </View>
  )
}

export default Login;