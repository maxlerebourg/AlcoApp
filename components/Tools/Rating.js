import React, {useState, useRef, useEffect} from 'react';
import styled, {useTheme} from 'styled-components';
import {useForm} from "react-hook-form";

const View = styled.View`
	${props => props.isRow && `
		width: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 10px 0;
	`}
`;
const TextInput = styled.TextInput`
	color: ${props => props.theme.greyTitle};
	padding: 0;
	margin: 0;
	border-bottom-width: 1px;
	border-bottom-color: ${props => props.theme.greyTitle};
	font-size: 15px;
`;
const Text = styled.Text`
	color: ${props => props.theme.greyTitle};
	font-size: ${props => props.isLittle ? 12 : 15}px;
`;

function Counter (){
	const theme = useTheme();
	const quant = useRef(null);
	const {watch, register, setValue} = useForm({defaultValues: {rate: '0', quantity: '0'}});
	useEffect(() => {
		register({ name: 'rate'});
		register({ name: 'quantity'});
	}, [register]);

	const values = watch();

	return (
		<View>
			<View isRow>
				<TextInput
					placeholderTextColor={theme.greyTitle}
					keyboardType='numeric'
					onSubmitEditing={quant.focus}
					onChangeText={text => setValue('rate', text, true)}
				/>
				<Text>% pour</Text>
				<TextInput
					ref={quant}
					placeholderTextColor={theme.greyTitle}
					keyboardType='numeric'
					onChangeText={text => setValue('quantity', text, true)}
				/>
				<Text>cl = {values.rate * 8 * values.quantity / 100}g d'alcool pur.</Text>
			</View>
			<Text isLittle>Evitez de dépasser 30g par jour et 140g par semaine.</Text>
		</View>
	)
}

export default Counter;