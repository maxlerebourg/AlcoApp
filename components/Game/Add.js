import React, {useState, useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import styled, {useTheme} from 'styled-components';
import {GameContext, UserContext} from '../../utils/context';
import {postGame} from '../../utils/api';
import {goConnectAlert} from '../../utils/alert';
import {Button, TextButton} from '../Button';
import {TextInput} from '../TextInput';

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  height: 100%;
  width: 100%;
  background: ${props => props.theme.grey3};
`;
const ScrollView = styled.ScrollView`
	padding: 15px;
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
const StyledPicker = styled(Picker)`
  width: 95%;
  max-width: 300px;
  margin: 10px auto;
  background: ${props => props.theme.grey2};
  color: ${props => props.theme.white};
	border-radius: 5px;
	padding: 5px 20px;
	min-height: 50px;
`;

function Add({navigation}) {
	const theme = useTheme();
	const {user} = useContext(UserContext);
	const {categories} = useContext(GameContext);
	const card = categories.find(cat => cat.slug === 'cartes');
  const {watch, register, setValue, handleSubmit} = useForm({
    defaultValues: {
      multiplayer: null,
	    categoryId: card.id,
    }
  });
	const watchMultiplayer = watch('multiplayer');
	const watchCategoryId = watch('categoryId');

  const onSubmit = async (data) => {
	  Alert.alert('Nop', JSON.stringify(data));
    const game = await postGame(user.token, data);
    if (game.name) {
      Alert.alert(
        'Ton jeu à été ajouté',
        `${data.name} est en attente de validation.`,
      );
    } else {
      //Alert.alert('Nop', 'Réessaye, tu as dû te tromper');
    }
  };

  useEffect(() => {
	  let mount = true;
    if (!user) {
      goConnectAlert(
        'Tu as besoin d\'être connecter pour proposer un jeu.',
        navigation,
      );
    }
    return () => {
    	mount = false;
    }
  }, []);

  useEffect(() => {
    register({ name: 'name'}, { required: true });
    register({ name: 'preview'}, { required: true });
	  register({ name: 'rules'}, { required: true });
	  register({ name: 'images'}, { required: true });
    register({ name: 'categoryId'}, { required: true });
    register({ name: 'multiplayer'});
  }, [register]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('name', text, true)}
          placeholder="Nom du jeu"
          autoCorrect={false}
        />
        <StyledTextInput
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('preview', text, true)}
          placeholder="Présentation courte"
          multiline
        />
	      <StyledTextInput
		      placeholderTextColor={theme.grey1}
		      onChangeText={text => setValue('rules', text, true)}
		      placeholder="Règles"
		      multiline
	      />
	      <StyledTextInput
		      placeholderTextColor={theme.grey1}
		      onChangeText={text => setValue('images', text, true)}
		      placeholder="Image url"
		      autoCorrect={false}
	      />
	      {categories !== null && (
	      	<StyledPicker
			      selectedValue={watchCategoryId}
			      onValueChange={item => setValue('categoryId', item, true)}
		      >
			      {categories.map(({id, name}) => <StyledPicker.Item label={name} value={id} key={id} />)}
		      </StyledPicker>
	      )}
        <StyledPicker
          selectedValue={watchMultiplayer}
          onValueChange={item => setValue('multiplayer', item, true)}
        >
          <StyledPicker.Item label="2" value={2} />
          <StyledPicker.Item label="3" value={3} />
          <StyledPicker.Item label="4" value={4} />
          <StyledPicker.Item label="5 et +" value={null}/>
        </StyledPicker>
        <StyledButton onPress={handleSubmit(onSubmit)}>
	        <TextButton>Proposer</TextButton>
        </StyledButton>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Add;