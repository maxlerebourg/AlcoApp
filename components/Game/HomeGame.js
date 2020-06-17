import React, {
	useState, useEffect, useContext, useRef,
} from 'react';
import {Animated, useWindowDimensions} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {getGames} from '../../utils/api';
import HorizontalList from './HorizontalList';
import Loader from '../Loader';
import {GameContext} from '../../utils/context';

const ContainerView = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.grey3};
`;
const EmptyView = styled.View`
  height: 15px;
`;
const ScrollView = styled.ScrollView``;
const TouchableOpacity = styled.TouchableOpacity`
	position: absolute;
	bottom: 2%;
	right: 2%;
	width: 55px;
	height: 55px;
  overflow: hidden;
  borderRadius: 100px;
`;

function HomeGame({navigation}) {
	const {setCategories} = useContext(GameContext);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const [offset, setOffset] = useState(0);
	const [cat, setCat] = useState(null);
  const {width} = useWindowDimensions();
  const styled = {
	  width: (width - 60) / 3,
	  height: (width - 60) / 3 + 60,
  };
  const theme = useTheme();

  useEffect(() => {
    let mounted = true;
    const fetchGames = async () => {
      const cats = await getGames();
	    setCategories(cats.filter(category => category.slug !== undefined).map(
		    category => ({id: category.id, name: category.name, slug: category.slug}),
	    ));
      if (mounted) {
        setCat(cats);
      }
    };
    fetchGames();
    return () => {
      mounted = false;
    };
  }, []);

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > offset ? 'down' : 'up';
    const visible = direction === 'up';
    fade(visible ? 1 : 0);
	  setOffset(currentOffset);
  };

	const fade = val => {
		Animated.timing(fadeAnim, {
			toValue: val,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

  const goCategory = category => navigation.navigate('Category', {category, styled});

  return (
  	<ContainerView>
	    <ScrollView onScrollBeginDrag={onScroll} onScrollEndDrag={onScroll}>
		    <EmptyView />
	      {cat !== null && cat.map(category => category.games.length !== 0 && (
	        <HorizontalList
            key={category.id}
            goCategory={() => goCategory(category)}
            category={category}
            styled={styled}
          />
	      ))}
	    </ScrollView>
		  <TouchableOpacity
			  onPress={() => navigation.navigate('Add')}
		  >
	      <Animated.View
		      style={{
		      	flex: 1,
			      alignItems: 'center',
			      justifyContent: 'center',
			      backgroundColor: theme.red2,
	      	  opacity: fadeAnim,
	        }}
	      >
	          <Icon name="cloud-upload" color={theme.white} size={20} />
	      </Animated.View>
			</TouchableOpacity>
      {cat === null && <Loader />}
    </ContainerView>
  );
}

export default HomeGame;
