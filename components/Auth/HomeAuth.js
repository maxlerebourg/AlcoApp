import React, {useContext} from 'react';
import styled from 'styled-components/native';
import UserContext from "../../utils/UserContext";
import Login from "./Login";

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
const Button = styled.Button``;

function HomeAuth({navigation}) {
  const {user, logout} = useContext(UserContext);

  const onRegistration = () => navigation.navigate('Register');

  return (
    <View>
      {user ? (
        <>
          <Text>Connecté en tant que {user.pseudo}</Text>
          <Button title="Deconnection" onPress={logout} />
        </>
      ) : (
        <Login onRegistration={onRegistration} />
      )}
    </View>
  );
}

export default HomeAuth;
