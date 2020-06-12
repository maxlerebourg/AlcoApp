import React, {useState, useEffect, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import styled from 'styled-components';
import UserContext from '../../utils/UserContext';
import {getCategories, postGame} from '../../utils/api';
import {goConnectAlert} from '../../utils/alert';
import {Button, TextButton} from '../Button';

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
const StyledButton = styled(Button)`
  width: 60%;
  max-width: 300px;
  margin: 10px auto;
`;
const Picker = styled.Picker`
  width: 60%;
  max-width: 300px;
  margin: 10px auto;
  color: ${props => props.theme.white};
`;

function Add({navigation}) {
  const {user} = useContext(UserContext);
	const [multi, setMulti] = useState(null);
	const [cat, setCat] = useState(null);
	const [categories, setCategories] = useState(null);
  const {register, setValue, handleSubmit} = useForm({
    defaultValues: {
      multiplayer: null,
    }
  });
  const onSubmit = async (data) => {
    const game = await postGame(user.token, data);
    if (game.name) {
      Alert.alert(
        'Ton jeu à été ajouté',
        `${data.name} est en attente de validation.`,
      );
    } else {
      Alert.alert('Nop', 'Réessaye, tu as dû te tromper');
    }
  };

  useEffect(() => {
	  let mount = true;
    if (!user) {
      goConnectAlert(
        'Tu as besoin d\'être connecter pour proposer un jeu.',
        navigation,
      );
    } else {
    	const getCat = async () => {
    		const cats = await getCategories();
    		if (mount) {
    			setCategories(cats);
    			setCat(cats[0].id);
		    }
	    };
	    getCat();
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
    register({ name: 'categoryId'});
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
		      onChangeText={text => setValue('images', text, true)}
		      placeholder="Image url"
		      autoCorrect
	      />
	      {cat !== null && (
	      	<Picker
			      selectedValue={cat}
			      onValueChange={item => {
				      Alert.alert('caca', JSON.stringify(item));
				      setValue('categoryId', item, true);
				      setCat(item);
			      }}
		      >
			      {categories.map(({id, name}) => <Picker.Item label={name} value={id} key={id} />)}
		      </Picker>
	      )}
        <Picker
          selectedValue={multi}
          onValueChange={item => {
          	setValue('multiplayer', item.toString(), true);
	          setMulti(item);
          }}
        >
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5 et +" value={null}/>
        </Picker>
        <StyledButton onPress={handleSubmit(onSubmit)}>
	        <TextButton>Proposer</TextButton>
        </StyledButton>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Add;