import React, {useState} from 'react';
import styled from 'styled-components/native';

const View = styled.View`
	${props => props.isRow && 'flex-direction: row'};
	justify-content: space-between;
	align-items: center;
`;
const TouchableOpacity = styled.TouchableOpacity`
	background: ${props => props.theme.red2};
	justify-content: center;
	align-items: center;
	padding: 10px;
	margin-top: 10px;
	${props => !props.isRaz && `
		height: 70px;
		width: 70px;
		border-radius: 50px;
	`}
`;
const Text = styled.Text`
	color: ${props => props.theme[props.isButton ? 'white' : 'greyTitle']};
	font-size: ${props => props.isRaz ? 12 : 25}px;
	font-weight: bold;
`;

function Counter (){
	const [count, setCount] = useState(0);
	const increment = () => setCount(i => i + 1);
	const decrement = () => setCount(i => i - 1);
	const raz = () => setCount(0);

	return (
		<View isRow>
			<TouchableOpacity onPress={decrement}>
				<Text isButton>-</Text>
			</TouchableOpacity>
			<View>
				<Text>{count}</Text>
				<TouchableOpacity isRaz onPress={raz}>
					<Text isButton isRaz>RAZ</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={increment}>
				<Text isButton>+</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Counter;