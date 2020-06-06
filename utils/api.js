const server = 'http://api.lerebourg.eu';

function convertJsonToUrl(json) {
  return Object.entries(json)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

async function getGames(cat) {
  const url = `${server}/games${cat ? `?category=${cat}` : ''}`;
  return (await fetch(url)).json();
}
async function postGame(token, json) {
  const url = `${server}/game?${convertJsonToUrl(json)}`;
  return (await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: json,
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

async function login(json) {
  const url = `${server}/login`;
  return (await fetch(url)).json();
}

async function register(json) {
  const url = `${server}/register`;
  return fetch(url, {
    method: 'POST',
    headers: {},
  }).then(data => data.json());
}
export {getGames, postGame, postComment, getComments, login, register};
