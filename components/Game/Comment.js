import React from 'react';
import styled from 'styled-components';

const View = styled.View`
	width: 100%;
	${props => props.isHeader ? `
		flex-direction: row;
		justify-content: space-between;
	` : `
		margin: 10px 0;
	`}
`;
const Text = styled.Text`
	color: ${props => props.theme.greyText};
	font-size: 14px;
	${props => props.isName && 'font-weight: bold'};
`;

function Comment({comment}) {
	const {id, user, rate, review} = comment;
	let stars = '';
	for (let i = 0; i < 5; i += 1) stars += rate > i ? '★' : '☆';

	return (
		<View>
			<View isHeader>
				<Text isName>{user.pseudo}</Text>
				<Text>
					{stars}
				</Text>
			</View>
			<Text>{review}</Text>
		</View>
	);
}

export default Comment;