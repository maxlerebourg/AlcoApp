import styled from 'styled-components';

const Button = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	background: ${props => props.theme.red};
	border-radius: 5px;
	padding: 5px 20px;
	min-height: 50px;
`;
const TextButton = styled.Text`
  color: ${props => props.theme.white};
  font-size: 17px;
`;

export {Button, TextButton};