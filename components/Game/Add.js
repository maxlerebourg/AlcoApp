import React, {useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import styled from 'styled-components';
import UserContext from '../../utils/UserContext';
import {postGame} from '../../utils/api';
import {goConnectAlert} from "../../utils/alert";

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
const Picker = styled.Picker`
  width: 60%;
  max-width: 300px;
  margin: 10px auto;
`;

function Add({navigation}) {
  const {user} = useContext(UserContext);
  const {getValues, register, setValue,  handleSubmit} = useForm({
    defaultValues: {
      multiplayer: null,
    }
  });
  const onSubmit = async (data) => {
    const game = await postGame(data, user.token);
    if (game.name) {
      Alert.alert(
        'Ton Jeu à été ajouter',
        `${data.name} a été ajouté et est en attente de validation par nos admins.`,
      );
    } else {
      Alert.alert('Nop', 'Réessaye, tu as dû te tromper');
    }
  };

  useEffect(() => {
    if (!user) {
      goConnectAlert(
        'Tu as besoin d\'être connecter pour proposer un jeu.',
        navigation,
      );
    }
    Alert.alert('caca', JSON.stringify(getValues()))
  }, [getValues().multiplayer]);

  useEffect(() => {
    register({ name: 'name'}, { required: true });
    register({ name: 'preview'}, { required: true });
    register({ name: 'rules'}, { required: true });
    register({ name: 'category'}, { required: true });
    register({ name: 'multiplayer'});
  }, [register]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <TextInput
          onChangeText={text => setValue('name', text, true)}
          autoCapitalize="none"
          placeholder="Nom du jeu"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={text => setValue('preview', text, true)}
          autoCapitalize="none"
          placeholder="Présentation courte"
          autoCorrect
        />
        <TextInput
          onChangeText={text => setValue('rules', text, true)}
          placeholder="Règles"
          autoCorrect
        />
        <TextInput
          onChangeText={text => setValue('category', text, true)}
          placeholder="Categorie"
        />
        <Picker
          selectedValue={getValues().multiplayer}
          onChangeValue={item => setValue('multiplayer', item, true)}
        >
          <Picker.Item label="2" value="2"/>
          <Picker.Item label="3" value="3"/>
          <Picker.Item label="4" value="4"/>
          <Picker.Item label="5 et +" value={null}/>
        </Picker>
        <Button title="Proposer" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Add;