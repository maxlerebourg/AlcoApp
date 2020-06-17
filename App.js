import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext, GameContext} from './utils/context';
import Navigation from './components/Navigation';
import {ThemeProvider} from 'styled-components';

const dark = {
	red1: '#ff5e57',
	red2: '#ff3f34',
	grey1: '#808e9b',
	grey2: '#485460',
	grey3: '#1e272e',
	greyText: '#808e9b',
	greyTitle: '#d2dae2',
	greyBigTitle: '#d2dae2',
	white: '#ffffff',
	green: '#094009',
	gold: '#FFD700',
};

const light = {
	red1: '#ff5e57',
	red2: '#ff3f34',
	grey1: '#808e9b',
	grey2: '#bdc3c7',
	grey3: '#ecf0f1',
	greyText: '#34495e',
	greyTitle: '#2c3e50',
	greyBigTitle: '#2c3e50',
	white: '#ffffff',
	green: '#094009',
	gold: '#FFD700',
};

function App() {
  const [user, setUser] = useState(null);
	const [theme, setTheme] = useState(dark);
	const [categories, setCategories] = useState(dark);

  const login = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };
  const toggleTheme = async () => {
	  const th = await AsyncStorage.getItem('theme') || 'dark';
  	setTheme(th === 'dark' ? light : dark);
	  await AsyncStorage.setItem('theme', th === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const init = async () => {
	    const userStock = await AsyncStorage.getItem('user');
	    if (userStock) {
		    setUser(JSON.parse(userStock));
	    }
	    const themeStock = await AsyncStorage.getItem('theme') || 'dark';
	    if (themeStock !== 'dark') {
		    setTheme(light);
	    }
    };
    init();
  }, []);

  return (
  	<ThemeProvider theme={theme}>
	    <UserContext.Provider
		    value={{
		      user,
			    login,
			    logout,
			    toggleTheme
		    }}
	    >
		    <GameContext.Provider value={{categories, setCategories}}>
          <Navigation />
		    </GameContext.Provider>
	    </UserContext.Provider>
		</ThemeProvider>
  );
}

export default App;
