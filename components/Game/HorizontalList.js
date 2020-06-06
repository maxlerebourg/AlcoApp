import React from 'react';
import styled from 'styled-components/native';

const View = styled.View``;
const CommentView = styled.View``;
const EmptyView = styled.View`width: 15px;`;
const Image = styled.Image`
  border-radius: 15px;
  width: ${props => props.styled.width}px;
  height: ${props => props.styled.width}px;
`;
const TouchableOpacity = styled.TouchableOpacity`
  width: ${props => props.styled.width}px;
  height: ${props => props.styled.height}px;
  margin: 5px;
`;
const Title = styled.Text`
  color: ${props => props.theme.white};
	font-size: 20px;
	font-weight: bold;
	margin: 5px 20px;	
`;
const TitleGame = styled.Text`
  color: ${props => props.theme.greyTitle};
`;
const Text = styled.Text`
  color: ${props => props.theme.greyText};
  font-size: 12px;
`;

const FlatList = styled.FlatList``;

function GameItem({game, styled}) {
	return (
		<TouchableOpacity styled={styled}>
			<Image
				source={{uri: game.images.toString().split(',')[0]}}
				styled={styled}
			/>
			<TitleGame>{game.name}</TitleGame>
			{game.commentsRate && game.commentsCount ? (
				<CommentView>
					<Text>{((game.commentsRate * 10) / 10).toFixed(1)}&#9733;</Text>
				</CommentView>
			) : null}
		</TouchableOpacity>
	)
}

function HorizontalList({name, games, styled}) {
  return (
    <View>
      <Title>{name}</Title>
      <FlatList
	      decelerationRate={'fast'}
	      ListHeaderComponent={<EmptyView />}
	      ListFooterComponent={<EmptyView />}
	      snapToInterval={styled.width + 10}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        data={games}
        renderItem={({item}) => <GameItem game={item} styled={styled} />}
      />
    </View>
  );
}

export default HorizontalList;
