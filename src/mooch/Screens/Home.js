import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View , Image} from 'react-native';
import * as React from 'react';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DMs from './DMs';
import Profile from './Profile';
import Explore from './Explore';
import DMing from './DMing';
import DMpage from './DMpage';

const Tab = createMaterialBottomTabNavigator();

function Home({ route, navigation }) {
    return(
        <Tab.Navigator initialRouteName='Explore'>
            <Tab.Screen 
                name="DMs" 
                component={DMs}
                options={{
                    title: 'DMs',
                    tabBarIcon: ({size,focused,color}) => {
                      return ( <Image style={{ width: 26, height: 23 }} source={require('../icons/dmicon.png')} /> );
                    },
                }} />
            <Tab.Screen 
                name="Explore" 
                component={Explore} 
                options={{
                    title: 'Explore',
                    tabBarIcon: ({size,focused,color}) => {
                      return ( <Image style={{ width: 23, height: 23 }} source={require('../icons/exploreicon.png')} /> );
                    },
                }} />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    title: 'Profile',
                    tabBarIcon: ({size,focused,color}) => {
                      return ( <Image style={{ width: 23, height: 23 ,}} source={require('../icons/profileicon.png')} /> );
                    },
                }} />
        </Tab.Navigator>
    )
}

export default Home;