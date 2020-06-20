import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import HomeGame from './Game/HomeGame';
import HomeAuth from './Auth/HomeAuth';
import HomeTools from './Tools/HomeTools';
import Register from './Auth/Register';
import Add from './Game/Add';
import Edit from './Game/Edit';
import Search from './Game/Search';
import Details from './Game/Details';
import CategoryList from './Game/CategoryList';

const GameStack = createStackNavigator();
const SearchGameStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStackScreen() {
  const theme = useTheme();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.grey3,
	        height: 0,
	        opacity: 0,
        },
        headerTintColor: theme.white,
      }}
    >
      <AuthStack.Screen
        name="Account"
        component={HomeAuth}
        options={{title: 'Connection'}}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{title: 'S\'inscrire'}}
      />
    </AuthStack.Navigator>
  );
}

function GameStackScreen() {
	const theme = useTheme();
	return (
		<GameStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.grey3,
					height: 0,
					opacity: 0,
				},
				headerTintColor: theme.white,
			}}
		>
			<GameStack.Screen
				name="Games"
				component={HomeGame}
				options={{title: 'Jeux de soirées'}}
			/>
			<GameStack.Screen
				name="Add"
				component={Add}
				options={{title: 'Ajouter un jeu'}}
			/>
			<GameStack.Screen
				name="Edit"
				component={Edit}
				options={{title: 'Editer un jeu'}}
			/>
			<GameStack.Screen
				name="Category"
				component={CategoryList}
				options={({route}) => ({title: route.params.category.name})}
			/>
			<GameStack.Screen
				name="Detail"
				component={Details}
				options={({route}) => ({title: route.params.game.name})}
			/>
		</GameStack.Navigator>
	);
}

function SearchGameStackScreen() {
	const theme = useTheme();
	return (
		<SearchGameStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.grey3,
					height: 0,
					opacity: 0,
				},
				headerTintColor: theme.white,
			}}
		>
			<SearchGameStack.Screen
				name="Search"
				component={Search}
				options={{title: 'Chercher un jeu'}}
			/>
			<SearchGameStack.Screen
				name="Detail"
				component={Details}
				options={({route}) => ({title: route.params.game.name})}
			/>
			<SearchGameStack.Screen
				name="Edit"
				component={Edit}
				options={{title: 'Editer un jeu'}}
			/>
		</SearchGameStack.Navigator>
	);
}

function Navigation() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: theme.red2,
          inactiveTintColor: theme.greyText,
          style: {
            backgroundColor: theme.grey3,
            height: 40,
          },
          showLabel: false,
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let icon;
            if (route.name === 'Games') {
              icon = 'grid';
            } else if (route.name === 'Account') {
	            icon = 'user';
            } else if (route.name === 'Search') {
	            icon = 'magnifier';
            } else {
              icon = 'wrench';
            }
            return <Icon name={icon} color={color} size={size} />;
          },
        })}
      >
	      <Tab.Screen name="Games" component={GameStackScreen} />
	      <Tab.Screen name="Search" component={SearchGameStackScreen} />
        <Tab.Screen name="Account" component={AuthStackScreen} />
        <Tab.Screen name="Tools" component={HomeTools} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
