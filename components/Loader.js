import React from 'react';
import styled from 'styled-components/native';

const LoadingView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Loading = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
`;

function Loader() {
  return (
    <LoadingView>
      <Loading>
        <Image source={require('../images/dice.gif')} />
      </Loading>
    </LoadingView>
  );
}

export default Loader;