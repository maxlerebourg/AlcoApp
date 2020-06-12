import React, {useContext} from 'react';
import styled from 'styled-components/native';
import UserContext from '../../utils/UserContext';
import {Button, TextButton} from '../Button';
import Login from './Login';

const View = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.grey3};
`;
const Text = styled.Text`
  color: ${props => props.theme.white};
  font-size: 20px;
  margin-bottom: 20px;
`;
const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

function HomeAuth() {
  const {user, logout} = useContext(UserContext);

  return (
    <View>
      {user ? (
        <>
          <Text isText>Connecté en tant que {user.pseudo}</Text>
          <StyledButton onPress={logout}>
	          <TextButton>
		          Déconnexion
	          </TextButton>
          </StyledButton>
        </>
      ) : (
        <Login />
      )}
    </View>
  );
}

export default HomeAuth;
