import React from 'react';
import styled from 'styled-components';

const Image = styled.Image`
  margin-bottom: 4px;
  border-radius: 15px;
  width: ${props => props.styled.width}px;
  height: ${props => props.styled.width}px;
`;
const TouchableOpacity = styled.TouchableOpacity`
  width: ${props => props.styled.width}px;
  height: ${props => props.styled[props.isEnd ? 'width' : 'height']}px;
  margin: 5px;
`;
const TitleGame = styled.Text`
  color: ${props => props.theme.greyTitle};
  font-size: 14px;
  margin-bottom: 2px;
`;
const Text = styled.Text`
  color: ${props => props.theme.greyText};
  font-size: 12px;
`;

function GameItem({game, styled}) {
  return (
    <TouchableOpacity styled={styled} onPress={() => {}}>
      <Image
        source={{uri: game.images.split(',')[0]}}
        styled={styled}
      />
      <TitleGame>{game.name}</TitleGame>
      {game.commentsRate !== 0 && game.commentsCount !== 0 && (
        <Text>{((game.commentsRate * 10) / 10).toFixed(1)}&#9733;</Text>
      )}
    </TouchableOpacity>
  );
}

export default GameItem;