import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import GameItem from './GameItem';
import {getGames} from '../../utils/api';
import Loader from "../Loader";
import {useWindowDimensions} from "react-native";

const View = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.grey3};
`;
const EmptyView = styled.View`height: 15px;`;
const FlatList = styled.FlatList`padding: 0 15px;`;

function CategoryList({route: {params: {category}}}) {
	const {width} = useWindowDimensions();
	const dimension = {
		width: (width - 60) / 3,
		height: (width - 60) / 3 + 60,
	};
  const {slug, games: gamesCat} = category;
  const [games, setGames] = useState(slug ? null : gamesCat);

  useEffect(() => {
    let mount = true;
    if (!slug) {
	    const fetchGames = async () => {
		    const gam = await getGames({category: slug});
		    if (mount) {
			    setGames(gam);
		    }
	    };
	    fetchGames();
    }
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
        renderItem={({item: game}) => <GameItem game={game} dimension={dimension} />}
      />
      {games === null && <Loader />}
    </View>
  );
}

export default CategoryList;
