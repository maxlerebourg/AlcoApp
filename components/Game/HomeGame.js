import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, Animated, View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {getGames} from '../../utils/api';
import HorizontalList from './HorizontalList';
import Loader from './Loader';

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
	const fadeAnim = useRef(new Animated.Value(1)).current;
  const [offset, setOffset] = useState(0);
  const [categories, setCategories] = useState(null);
  const [styled, setStyled] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    let mounted = true;
    const fetchGames = async () => {
      const cat = await getGames();
      if (mounted) {
        setCategories(cat);
      }
    };
    fetchGames();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setStyled({
      width: (Dimensions.get('window').width - 60) / 3,
      height: (Dimensions.get('window').width - 60) / 3 + 60,
    });
  }, []);

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
	  setOffset(currentOffset);
    const direction = currentOffset > offset ? 'down' : 'up';
    const visible = direction === 'up';
    fade(visible ? 1 : 0);
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
	      {categories !== null && categories.map(category => category.games.length !== 0 && (
	        <HorizontalList
            key={category.id}
            goCategory={() => goCategory(category)}
            category={category}
            styled={styled}
          />
	      ))}
	    </ScrollView>
		  <TouchableOpacity onPress={() => navigation.navigate('Add')}>
	      <Animated.View
		      style={{
		      	flex: 1,
			      alignItems: 'center',
			      justifyContent: 'center',
			      backgroundColor: theme.red,
	      	  opacity: fadeAnim,
	        }}
	      >
	          <Icon name="cloud-upload" color={theme.white} size={20} />
	      </Animated.View>
			</TouchableOpacity>
      {categories === null && <Loader />}
    </ContainerView>
  );
}

export default HomeGame;
