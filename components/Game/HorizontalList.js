import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import GameItem from "./GameItem";
import {useWindowDimensions} from "react-native";

const View = styled.View``;
const EmptyView = styled.View`width: 15px;`;
const FlatList = styled.FlatList``;
const TouchableEnd = styled.TouchableOpacity`
  width: ${props => props.dimension.width}px;
  height: ${props => props.dimension.width}px;
  margin: 5px;
  justify-content: center;
`;
const TouchableTitle = styled.TouchableOpacity`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;
const Text = styled.Text`
  color: ${props => props.theme.greyBigTitle};
	font-size: 20px;
	font-weight: bold;
\t  font-size: 20px;
	${props => props.isTitle && 'margin: 5px 20px'};
`;

function HorizontalList({category}) {
	const {width} = useWindowDimensions();
	const dimension = {
		width: (width - 60) / 3,
		height: (width - 60) / 3 + 60,
	};
	const navigation = useNavigation();
  const {games, name} = category;

  return (
    <View>
      <TouchableTitle onPress={() => navigation.navigate('Category', {category})}>
        <Text isTitle>{name}</Text>
        <Text isTitle>&#8594;</Text>
      </TouchableTitle>
      <FlatList
	      decelerationRate={'fast'}
	      ListHeaderComponent={<EmptyView />}
	      ListFooterComponent={games.length === 10
          ? (
            <TouchableEnd
	            dimension={dimension}
              onPress={() => navigation.navigate('Category', {category})}
            >
              <Text>En découvrir plus</Text>
            </TouchableEnd>
          ) : <EmptyView />
	      }
	      snapToInterval={dimension.width + 10}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        data={games}
        renderItem={({item: game}) => <GameItem game={game} dimension={dimension} />}
      />
    </View>
  );
}

export default HorizontalList;
