import {Alert} from 'react-native';

// const server = 'http://api.lerebourg.eu';
const server = 'http://192.168.1.30:3001';

function convertJsonToUrl(json) {
  return Object.entries(json)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

async function getCategories(json) {
	const url = `${server}/categories`;
	return (await fetch(url)).json();
}

async function getGames(json) {
	const url = `${server}/games${json ? `?${convertJsonToUrl(json)}` : ''}`;
	return (await fetch(url)).json();
}

async function postGame(token, json) {
  const url = `${server}/game?${convertJsonToUrl(json)}`;
  Alert.alert('caca', url)
  return (await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  })).json();
}

async function getComments(gameId) {
  const url = `${server}/comments?gameId=${gameId}`;
  return (await fetch(url)).json();
}

async function postComment(token, json) {
  const url = `${server}/comments?${convertJsonToUrl(json)}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }).then(data => data.json());
}

async function signin(json) {
  const url = `${server}/login`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json),
  }).then(data => data.json());
}

async function signup(json) {
  const url = `${server}/register`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json),
  }).then(data => data.json());
}
export {getCategories, getGames, postGame, postComment, getComments, signin, signup};
