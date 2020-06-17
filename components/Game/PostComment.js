import {useForm} from 'react-hook-form';
import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {postComment} from '../../utils/api';
import styled, {useTheme} from 'styled-components';
import {TextInput} from '../TextInput';
import {UserContext} from '../../utils/context';

const ViewContent = styled.View`
	width: 100%;
	padding: 10px 20px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const Text = styled.Text`
	color: ${props => props.theme.greyText};
	font-size: 25px;
`;
const StyledTextInput = styled(TextInput)`
	flex: 1;
  max-width: 300px;
  margin: 10px;
`;
const TouchableOpacity = styled.TouchableOpacity``;

function PostComment({gameId, fetchComments}) {
	const {user} = useContext(UserContext);
	const theme = useTheme();
	const {watch, register, setValue, handleSubmit, reset} = useForm();
	const watchAll = watch();

	useEffect(() => {
		register({ name: 'rate'});
		register({ name: 'review'});
	}, [register]);
	const onSubmit = async (data) => {
		data = {...data, gameId};
		try {
			await postComment(user.token, data);
			await fetchComments(true);
			reset({rate: null, review: ''});
		} catch (err) {
			Alert.alert('Error');
		}
	};

	let stars = [];
	for (let i = 1; i < 6; i += 1) stars.push(
		<TouchableOpacity
			onPress={() => setValue('rate', i, true)}
			key={i}
		>
			<Text>{watchAll.rate >= i ? '★' : '☆'}</Text>
		</TouchableOpacity>
	);
	stars = <ViewContent isHeader>{stars}</ViewContent>;

	return (
		<>
			{stars}
			<ViewContent>
				<StyledTextInput
					placeholderTextColor={theme.grey1}
					value={watchAll.review}
					onChangeText={text => setValue('review', text, true)}
					placeholder="Laisse un commentaire..."
				/>
				<TouchableOpacity onPress={handleSubmit(onSubmit)}>
					<Icon
						name="arrow-right"
						color={theme.grey1}
						size={20}
					/>
				</TouchableOpacity>
			</ViewContent>
		</>
	);
}

export default PostComment;