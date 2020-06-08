import React from 'react';
import styled from 'styled-components/native';
import {Alert} from "react-native";
import GameItem from "./GameItem";

const View = styled.View``;
const EmptyView = styled.View`width: 15px;`;
const FlatList = styled.FlatList``;
const TouchableEnd = styled.TouchableOpacity`
  width: ${props => props.styled.width}px;
  height: ${props => props.styled.width}px;
  margin: 5px;
  justify-content: center;
`;
const TouchableTitle = styled.TouchableOpacity`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;
const Title = styled.Text`
  color: ${props => props.theme.white};
	font-size: 20px;
	font-weight: bold;
	${props => props.isTitle ? `
	  margin: 5px 20px;
	  font-size: 20px;
	` : `
	  font-size: 25px;
	`};	
`;

function HorizontalList({goCategory, category, styled}) {
  const {games, name} = category;

  return (
    <View>
      <TouchableTitle onPress={goCategory}>
        <Title isTitle>{name}</Title>
        <Title isTitle>&#8594;</Title>
      </TouchableTitle>
      <FlatList
	      decelerationRate={'fast'}
	      ListHeaderComponent={<EmptyView />}
	      ListFooterComponent={games.length === 10
          ? (
            <TouchableEnd
              styled={styled}
              onPress={goCategory}
            >
              <Title>En découvrir plus</Title>
            </TouchableEnd>
          ) : <EmptyView />
	      }
	      snapToInterval={styled.width + 10}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        data={games}
        renderItem={({item: game}) => <GameItem game={game} styled={styled} />}
      />
    </View>
  );
}

export default HorizontalList;
