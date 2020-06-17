import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import GameItem from './GameItem';
import {getGames} from '../../utils/api';
import Loader from "../Loader";

const View = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.grey3};
`;
const EmptyView = styled.View`height: 15px;`;
const FlatList = styled.FlatList`padding: 0 15px;`;
const LoadingView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
`;

function CategoryList({route: {params: {category, styled}}}) {
  const {slug, games: gamesCat} = category;
  const [games, setGames] = useState(slug ? null : gamesCat);

  useEffect(() => {
    let mount = true;
    const fetchGames = async () => {
      const gam = await getGames({category: slug});
      if (mount) {
        setGames(gam);
      }
    };
    fetchGames();
    return () => {
      mount = false;
    };
  });

  return (
    <View>
      <FlatList
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<EmptyView />}
        keyExtractor={item => item.name}
        data={games}
        renderItem={({item: game}) => <GameItem game={game} styled={styled} />}
      />
      {games === null && <Loader />}
    </View>
  );
}

export default CategoryList;
