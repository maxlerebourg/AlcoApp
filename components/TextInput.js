import styled from 'styled-components';

const TextInput = styled.TextInput`
  background: ${props => props.theme.grey2};
  color: ${props => props.theme.white};
	border-radius: 5px;
	padding: 5px 7px;
	min-height: 50px;
	font-size: 15px;
`;

export {TextInput};