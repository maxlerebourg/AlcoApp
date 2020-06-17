import React, {useContext} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {UserContext} from '../../utils/context';
import {Button, TextButton} from '../Button';
import Login from './Login';

const View = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.grey3};
`;
const ThemeView = styled.View`
	width: 80%;
	max-width: 300px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;
`;
const Text = styled.Text`
	width: 80%;
	max-width: 300px;
  color: ${props => props.theme.greyBigTitle};
  font-size: 20px;
  ${props => !props.isTheme &&' margin-bottom: 30px'};
`;
const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
const Switch = styled.Switch``;

function HomeAuth() {
	const theme = useTheme();
  const {user, logout, toggleTheme} = useContext(UserContext);

  return (
    <View>
	    <ThemeView>
		    <Text isTheme>Theme sombre</Text>
		    <Switch onValueChange={toggleTheme} value={theme.greyText === '#808e9b'} />
	    </ThemeView>
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
