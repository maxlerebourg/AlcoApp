import React, {useState} from 'react';
import {UserProvider} from './utils/UserContext';
import Navigation from './components/Navigation';
import {ThemeProvider} from "styled-components";

function App() {
  const [user, setUser] = useState(null);

  const login = user => setUser(user);
  const logout = () => setUser(null);

  return (
  	<ThemeProvider
		  theme={{
			  red:'#f53b57',
			  grey1: '#808e9b',
			  grey2: '#485460',
			  grey3: '#1e272e',
			  greyText: '#808e9b',
			  greyTitle: '#d2dae2',
			  white: '#d2dae2',
			  green: '#094009',
			  gold: '#FFD700',
		  }}
	  >
	    <UserProvider value={{user, login, logout}}>
	      <Navigation />
	    </UserProvider>
		</ThemeProvider>
  );
}

export default App;
