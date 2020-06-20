import React, {useState, useEffect, useRef} from 'react';
import styled, {useTheme} from 'styled-components';
import {getGames} from '../../utils/api';
import FullGameItem from './FullGameItem';

const TouchableOpacity = styled.TouchableOpacity`flex: 1;`;
const View = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.grey3};
  justify-content: center;
`;
const FlatList = styled.FlatList``;
const EmptyView = styled.View`height: 5px;`;
const TextInput = styled.TextInput`
	width: 100%;
	border-bottom-width: 1px;
	border-bottom-color: ${props => props.theme.grey2};
	color: ${props => props.theme.greyTitle};
  background: ${props => props.theme.grey3};
  font-size: 18px;
  text-align: center;
`;

function Search() {
	const theme = useTheme();
	const ref = useRef(null);
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		let mount = true;
		if (search.length >= 2 && !/[()%]/.test(search)) {
			const fetchGames = async () => {
				const games = await getGames({search});
				if (mount) {
					setResults(games);
				}
			};
			fetchGames();
		}
		return () => {mount = false;};
	}, [search]);

	return (
		<View>
			<TextInput
				ref={ref}
				onChangeText={text => setSearch(text)}
				placeholderTextColor={theme.grey1}
				placeholder="Chercher un jeu"
			/>
			{results.length > 1 ? (
				<FlatList
					ListHeaderComponent={<EmptyView />}
					ListFooterComponent={<EmptyView />}
					keyExtractor={item => item.name}
					data={results}
					renderItem={({item: game}) => <FullGameItem game={game} />}
				/>
				) : <TouchableOpacity onPress={() => ref.current.focus()} />}
		</View>
	);
}

export default Search;