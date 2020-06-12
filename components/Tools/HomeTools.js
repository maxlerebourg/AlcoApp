import React from 'react';
import styled from 'styled-components/native';
import Counter from './Counter';
import Chrono from './Chono';

const View = styled.View`
	width: 100%;
	height: 100%;
	background: ${props => props.theme.grey3};
`;
const Tools = styled.View`
	width: 90%;
	background: ${props => props.theme.grey3};
	margin: 20px auto 0;
	border-radius: 8px;
	overflow: hidden;
	padding: 10px 30px 20px;
	background: ${props => props.theme.grey2};
`;
const Text = styled.Text`
	color: ${props => props.theme.greyTitle};
`;

function HomeTools (){
	return (
		<View>
			<Tools>
				<Text>Compteur</Text>
				<Counter />
			</Tools>
			<Tools>
				<Text>Chronometre</Text>
				<Chrono />
			</Tools>
		</View>
	)
}

export default HomeTools;