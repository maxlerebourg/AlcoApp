import React, {useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import styled, {useTheme} from 'styled-components';
import {UserContext} from '../../utils/context';
import {signup} from '../../utils/api';
import {Button, TextButton} from '../Button';
import {TextInput} from '../TextInput';

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  height: 100%;
  width: 100%;
  background: ${props => props.theme.grey3};
`;
const ScrollView = styled.ScrollView`
	padding-top: 15px;
`;
const StyledTextInput = styled(TextInput)`
  width: 95%;
  max-width: 300px;
  margin: 10px auto;
`;
const StyledButton = styled(Button)`
  width: 95%;
  max-width: 300px;
  margin: 10px auto;
`;

function Register() {
	const theme = useTheme();
	const navigation = useNavigation();
  const {login} = useContext(UserContext);
  const { register, setValue,  handleSubmit } = useForm();
  const onSubmit = async (data) => {
  	try {
      const user = await signup(data);
      await login(user);
      navigation.goBack();
    } catch(err) {
      Alert.alert('Nop', `Reessaye, tu as dû te tromper, ${err.status}`);
    }
  };

  useEffect(() => {
    register({ name: "mail"}, { required: true });
    register({ name: "password"}, { required: true });
    register({ name: "pseudo"}, { required: true });
    register({ name: "firstname"}, { required: true });
    register({ name: "lastname"}, { required: true });
  }, [register]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('mail', text, true)}
          autoCapitalize="none"
          placeholder="Mail"
          autoCorrect={false}
        />
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('password', text, true)}
          autoCapitalize="none"
          placeholder="Mot de passe"
          autoCorrect={false}
        />
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('pseudo', text, true)}
          placeholder="Pseudo"
        />
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('firstname', text, true)}
          placeholder="Prenom"
        />
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('lastname', text, true)}
          placeholder="Nom"
        />
        <StyledButton onPress={handleSubmit(onSubmit)}>
	        <TextButton>S'inscrire</TextButton>
        </StyledButton>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register;