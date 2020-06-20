import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const TouchableOpacity = styled.TouchableOpacity`
	flex-direction: row;
	overflow: hidden;
	border-radius: 15px;
  width: 95%;
  height: 120px;
  margin: 5px auto;
`;
const Image = styled.Image`
  border-radius: 15px;
  width: 120px;
  height: 100%;
`;
const View = styled.View`
	flex: 1;
	padding: 5px 10px;
`;
const Text = styled.Text`
	${props => (props.isTitle && `
		color: ${props.theme.greyTitle};
		font-size: 17px;
		font-weight: bold;
		margin-bottom: 2px;
	`) || (props.isPreview && `
		color: ${props.theme.greyText};
		font-size: 14px;
	`) || `
		position: absolute;
		bottom: 10px;
		left: 10px;
		color: ${props.theme.greyText};
		font-size: 14px;
	`}
`;

function FullGameItem({game}) {
	const navigation = useNavigation();
	const preview = game.preview.slice(0, 80);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', {game})}>
      <Image source={{uri: game.images.split(',')[0]}} />
      <View>
		    <Text isTitle>{game.name}</Text>
		    <Text isPreview>{preview}{preview.length === 80 && '...'}</Text>
	      {game.commentsRate !== 0 && game.commentsCount !== 0 && (
	        <Text>{((game.commentsRate * 10) / 10).toFixed(1)}★</Text>
	      )}
      </View>
    </TouchableOpacity>
  );
}

export default FullGameItem;