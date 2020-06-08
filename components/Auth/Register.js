import React, {useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import styled from 'styled-components';
import UserContext from '../../utils/UserContext';
import {signup} from "../../utils/api";

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  height: 100%;
  width: 100%;
  background: ${props => props.theme.grey3};
`;
const ScrollView = styled.ScrollView``;
const TextInput = styled.TextInput`
  background: ${props => props.theme.grey2};
  color: ${props => props.theme.white};
  width: 60%;
  max-width: 300px;
  margin: 10px auto;
`;
const Button = styled.Button`
  width: 60%;
  max-width: 300px;
  margin: 10px auto;
`;

function Register() {
  const {login} = useContext(UserContext);
  const { register, setValue,  handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const user = await signup(data);
    if (user.pseudo) {
      await login(user);
    } else {
      Alert.alert('Nop', 'Reessaye, tu as dû te tromper');
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
        <TextInput
          onChangeText={text => setValue('mail', text, true)}
          autoCapitalize="none"
          placeholder="Mail"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={text => setValue('password', text, true)}
          autoCapitalize="none"
          placeholder="Mot de passe"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={text => setValue('pseudo', text, true)}
          placeholder="Pseudo"
        />
        <TextInput
          onChangeText={text => setValue('firstname', text, true)}
          placeholder="Prenom"
        />
        <TextInput
          onChangeText={text => setValue('lastname', text, true)}
          placeholder="Nom"
        />
        <Button title="S'inscrire" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register;