import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {getGames} from '../../utils/api';
import HorizontalList from './HorizontalList';

const View = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.grey3};
`;
const EmptyView = styled.View`
  height: 15px;
`;
const ScrollView = styled.ScrollView``;
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
const TouchableOpacity = styled.TouchableOpacity`
	position: absolute;
	bottom: 2%;
	right: 2%;
`;
const PlusView = styled.View`
  opacity: ${props => props.isVisible ? 1 : 0};
  width: 55px;
  height: 55px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background: red;
`;
const PlusText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

function Home({navigation}) {
  const [addConf, setAddConf] = useState({visible: true, offset: 0});
  const [categories, setCategories] = useState(null);
  const [styled, setStyled] = useState(null);

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
    const direction = currentOffset > addConf.offset ? 'down' : 'up';
    const visible = direction === 'up';
    if (visible !== addConf.visible) {
      setAddConf({offset: currentOffset, visible: visible});
    } else {
      setAddConf({offset: currentOffset, visible: addConf.visible});
    }
  };
  return (
  	<View>
	    <ScrollView onScroll={onScroll}>
		    <EmptyView />
	      {categories && categories.map(({name, games}) => (
	        <HorizontalList name={name} games={games} styled={styled} />
	      ))}
	    </ScrollView>
      <TouchableOpacity onPress={() => {}}>
	      <PlusView isVisible={addConf.visible}>
          <PlusText>+</PlusText>
	      </PlusView>
      </TouchableOpacity>
      {categories === null && (
        <LoadingView>
          <Image source={require('../../images/dice.gif')} />
        </LoadingView>
      )}
    </View>
  );
}

export default Home;
