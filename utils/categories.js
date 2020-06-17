import React from 'react';
import styled from 'styled-components';

const Icon = styled.Image`
	height: 25px;
	width: 25px;
`;

const categoryIcon = {
	cartes: <Icon source={require('../images/cartes.png')} />,
	des: <Icon source={require('../images/des.png')} />,
	local: <Icon source={require('../images/local.png')} />,
	lan: <Icon source={require('../images/lan.png')} />,
	balles: <Icon source={require('../images/balles.png')} />,
	rien: <Icon source={require('../images/rien.png')} />,
	mobile: <Icon source={require('../images/mobile.png')} />,
	jeu_de_societe: <Icon source={require('../images/jeu_de_societe.png')} />,
	dominos: <Icon source={require('../images/dominos.png')} />,
	caps: <Icon source={require('../images/caps.png')} />,
};

export {categoryIcon};