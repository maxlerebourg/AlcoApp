import React, {useState, useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import styled, {useTheme} from 'styled-components';
import {GameContext, UserContext} from '../../utils/context';
import {validGame} from '../../utils/api';
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

function Add({navigation, route: {params: {game}}}) {
	const theme = useTheme();
	const [gameId] = useState(game && game.id);
	const {user} = useContext(UserContext);
	const {categories} = useContext(GameContext);
  const {watch, register, setValue, handleSubmit} = useForm({defaultValues: {
		  ...game,
		  id: undefined,
		  userId: undefined,
		  updatedAt: undefined,
		  createdAt: undefined,
	  }});
	const values = watch();

  const onSubmit = async (data) => {
  	data = {
  		gameId,
  		...data,
		  name: undefined,
		  categoryId: undefined,
	  };
	  Alert.alert('Jeu modifié', JSON.stringify(data));
	  const response = await validGame(user.token, data)
    if (!response.statusCode) {
    	Alert.alert('Jeu modifié');
    } else {
	    Alert.alert('Erreur');
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
	  register({ name: 'name'});
	  register({ name: 'status'});
    register({ name: 'preview'});
	  register({ name: 'rules'});
	  register({ name: 'images'});
    register({ name: 'categoryId'});
    register({ name: 'multiplayer'});
  }, [register]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <StyledTextInput
	        editable={false}
	        value={values.name}
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('name', text, true)}
          placeholder="Nom du jeu"
          autoCorrect={false}
        />
	      <StyledPicker
		      selectedValue={values.status}
		      onValueChange={item => setValue('status', item, true)}
	      >
		      <StyledPicker.Item label="200" value="200" />
		      <StyledPicker.Item label="201" value="201" />
		      <StyledPicker.Item label="410" value="410" />
	      </StyledPicker>
        <StyledTextInput
	        value={values.preview}
	        placeholderTextColor={theme.grey1}
          onChangeText={text => setValue('preview', text, true)}
          placeholder="Présentation courte"
          multiline
        />
	      <StyledTextInput
		      value={values.rules}
		      placeholderTextColor={theme.grey1}
		      onChangeText={text => setValue('rules', text, true)}
		      placeholder="Règles"
		      multiline
	      />
	      <StyledTextInput
		      value={values.images}
		      placeholderTextColor={theme.grey1}
		      onChangeText={text => setValue('images', text, true)}
		      placeholder="Image url"
		      autoCorrect={false}
	      />
	      {categories !== null && (
	      	<StyledPicker
			      enabled={false}
			      selectedValue={values.categoryId}
			      onValueChange={item => setValue('categoryId', item, true)}
		      >
			      {categories.map(({id, name}) => <StyledPicker.Item label={name} value={id} key={id} />)}
		      </StyledPicker>
	      )}
        <StyledPicker
          selectedValue={values.multiplayer}
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