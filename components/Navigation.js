import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import styled from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Game/Home';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;


function LoginScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function ToolsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const GameStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Account" component={LoginScreen} />
	      <Tab.Screen name="Games" component={Home} />
	      <Tab.Screen name="Search" component={Home} />
        <Tab.Screen name="Tools" component={ToolsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
