import React, {
	useState, useEffect, useContext, useRef,
} from 'react';
import {Animated} from 'react-native';
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
const TouchableOpacity = styled.TouchableOpacity``;

let offset = 0;
let visible = true;

function HomeGame({navigation}) {
	const {setCategories} = useContext(GameContext);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const [cat, setCat] = useState(null);
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
    if ((currentOffset < offset) !== visible){
	    fade(visible ? 0 : 1);
	    visible = !visible;
    }
	  offset = currentOffset;
  };

	const fade = val => {
		Animated.timing(fadeAnim, {
			toValue: val,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

  return (
  	<ContainerView>
	    <ScrollView onScroll={onScroll}>
		    <EmptyView />
	      {cat !== null && cat.map(category => category.games.length !== 0 && (
	        <HorizontalList
            key={category.id}
            category={category}
          />
	      ))}
	    </ScrollView>
		  <Animated.View
			  style={{
				  position: 'absolute',
				  bottom: '2%',
				  right: '2%',
				  width: 55,
				  height: 55,
				  overflow: 'hidden',
				  borderRadius: 100,
				  alignItems: 'center',
				  justifyContent: 'center',
				  backgroundColor: theme.red2,
				  opacity: fadeAnim,
			  }}
		  >
			  <TouchableOpacity onPress={() => navigation.navigate('Add')}>
	          <Icon name="cloud-upload" color={theme.white} size={20} />
				</TouchableOpacity>
		  </Animated.View>
      {cat === null && <Loader />}
    </ContainerView>
  );
}

export default HomeGame;
