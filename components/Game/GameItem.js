import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions} from 'react-native';

const Image = styled.Image`
  margin-bottom: 4px;
  border-radius: 15px;
  width: ${props => props.dimension.width}px;
  height: ${props => props.dimension.width}px;
`;
const TouchableOpacity = styled.TouchableOpacity`
  width: ${props => props.dimension.width}px;
  height: ${props => props.dimension.height}px;
  margin: 5px;
`;
const Text = styled.Text`
	${props => props.isTitle ? `
		color: ${props.theme.greyTitle};
		font-size: 14px;
		margin-bottom: 2px;
	` : `
		color: ${props.theme.greyText};
		font-size: 12px;
	`}
`;

function GameItem({game, dimension}) {
	const navigation = useNavigation();

  return (
    <TouchableOpacity dimension={dimension} onPress={() => navigation.navigate('Detail', {game})}>
      <Image source={{uri: game.images.split(',')[0]}} dimension={dimension} />
      <Text isTitle>{game.name}</Text>
      {game.commentsRate !== 0 && game.commentsCount !== 0 && (
        <Text>{((game.commentsRate * 10) / 10).toFixed(1)}★</Text>
      )}
    </TouchableOpacity>
  );
}

export default GameItem;