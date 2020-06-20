import React, {useState, useContext, useEffect} from 'react';
import styled, {useTheme} from 'styled-components';
import {useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {GameContext, UserContext} from '../../utils/context';
import {categoryIcon} from '../../utils/categories';
import {getComments, validGame} from '../../utils/api';
import Comment from './Comment';
import PostComment from './PostComment';

const View = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.grey3};
`;
const ScrollView = styled.ScrollView``;
const ViewTitle = styled.View`
	background: ${props => props.theme.grey3};
	justify-content: center;
	align-items: center;
	min-width: 70%;
	min-height: 50px;
	margin: -25px auto 10px;
	border-radius: 50px;
	elevation: 5;
`;
const ViewContent = styled.View`
	width: 100%;
	padding: 10px 20px;
	${props => props.isHeader ? `
		flex-direction: row;
		justify-content: space-around;
	` : `
		margin: 20px 0;
	`}
`;
const Pin = styled.View`
	background: ${props => props.theme.grey3};
	flex-direction: row;
	border-radius: 50px;
	width: 60px;
	height: 60px;
	justify-content: center;
	align-items: center;
	elevation: 5;
`;
const Separator = styled.View`
	background: ${props => props.theme.grey2};
	height: 1px;
	width: 100%;
	margin: 20px 0 0;
	elevation: 5; 
`;
const Image = styled.Image`
  width: 100%;
  height: ${props => props.height}px;
`;
const Text = styled.Text`
	${props => (props.isTitle && `
		color: ${props.theme.greyTitle};
		font-size: 20px;
		font-weight: bold;
		padding: 0 20px;
	`) || (props.isPin && `
		color: ${props.theme.greyText};
		font-size: 20px;
	`) || (props.isLittle && `
		color: ${props.theme.greyText};
		font-size: 10px;
	`) || `
		color: ${props.theme.greyText};
		font-size: 14px;
	`}
`;
const TouchableOpacity = styled.TouchableOpacity``;

function Details({navigation, route: {params: {game}}}) {
	const theme = useTheme();
	const {user} = useContext(UserContext);
	const {height} = useWindowDimensions();
	const {categories} = useContext(GameContext);
	const [comments, setComments] = useState(null);

	const {name, rules, images, multiplayer, categoryId, commentsRate, commentsCount} = game;

	const fetchComments = async (mount) => {
		const coms = await getComments(game.id);
		if (mount) {
			setComments(coms);
		}
	};

	useEffect(() => {
		let mount = true;
		if (commentsCount) {
			fetchComments(mount);
		}
		return () => {
			mount = false;
		}
	}, []);

	return (
		<View>
			<ScrollView>
				<Image
					height={height * .6}
					source={{uri: images.split(',')[0]}}
				/>
				<ViewTitle>
					<Text isTitle>{name}</Text>
				</ViewTitle>
				<ViewContent isHeader>
					{commentsCount !== 0 && (
						<Pin>
							<Text>{((commentsRate * 10) / 10).toFixed(1)}★</Text>
							<Text isLittle>({commentsCount})</Text>
						</Pin>
					)}
					{categories !== null && (
						<Pin>
							{categoryIcon[categories.find(cat => cat.id === categoryId).slug] || null}
						</Pin>
					)}
					<Pin>
						<Text isPin>{multiplayer || '4+'}</Text>
					</Pin>
					{user && user.admin && (
						<Pin>
							<TouchableOpacity onPress={async () => navigation.navigate('Edit', {game})}>
								<Icon name="pencil" size={20} color={theme.greyText} />
							</TouchableOpacity>
						</Pin>
					)}
				</ViewContent>
				<ViewContent>
					{rules.split('.').map(rule => rule.trim() !== '' && <Text key={rule.trim()}>{rule.trim()}.</Text>)}
				</ViewContent>
				{(user !== null || commentsCount > 0) && (
					<>
						<Separator />
						<ViewContent>
							{user !== null && <PostComment gameId={game.id} fetchComments={fetchComments} />}
							{comments !== null && comments.map(comment => <Comment comment={comment} key={comment.id} />)}
						</ViewContent>
					</>
				)}
			</ScrollView>
		</View>
	);
}

export default Details;