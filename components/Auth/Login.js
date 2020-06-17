import React, {useEffect, useContext, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import styled, {useTheme} from 'styled-components';
import {UserContext} from '../../utils/context';
import {signin} from '../../utils/api';
import {Button, TextButton} from '../Button';
import {TextInput} from "../TextInput";

const View = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const StyledTextInput = styled(TextInput)`
  width: 95%;
  max-width: 300px;
  margin-bottom: 20px;
`;
const StyledButton = styled(Button)`
  width: 95%;
  max-width: 300px;
  margin-bottom: 20px;
`;

function Login() {
	const theme = useTheme();
	const navigation = useNavigation();
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
      <StyledTextInput
	      placeholderTextColor={theme.grey1}
        onChangeText={text => setValue('mail', text, true)}
        autoCapitalize="none"
        placeholder="Mail"
        autoCorrect={false}
        onSubmitEditing={ref.focus}
      />
      <StyledTextInput
	      placeholderTextColor={theme.grey1}
        onChangeText={text => setValue('password', text, true)}
        autoCapitalize="none"
        placeholder="Mot de passe"
        autoCorrect={false}
        secureTextEntry
        ref={ref}
        onSubmitEditing={() => handleSubmit(onSubmit)}
      />
      <StyledButton onPress={handleSubmit(onSubmit)}>
	      <TextButton>Se connecter</TextButton>
      </StyledButton>
      <StyledButton color="red1" onPress={() => navigation.navigate('Register')}>
	      <TextButton>Inscription</TextButton>
      </StyledButton>
    </View>
  )
}

export default Login;