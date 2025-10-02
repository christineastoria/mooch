import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DMpage from './DMpage';
import DMing from './DMing';
import { FlatList } from 'react-native-gesture-handler';
import { db, collection, getDocs} from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function DMs({ navigation }) {

    // // adding backend functionality 
    // const messagesRef = db.collection('messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);

    // // listen to data using react hook
    // const [messages] = useCollectionData(query, {idfield: 'id'});

    const Stack = createNativeStackNavigator();

    return(
      <Stack.Navigator>
        <Stack.Screen name="Messages" component={DMpage} />
        <Stack.Screen name='DMing' component={DMing} options={({route}) => ({title:route.params.userName})}/>
      </Stack.Navigator>
    )
}

export default DMs;

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 15
    },
    button: {
      backgroundColor:  '#e8def9', 
      borderColor: '#f5dceb',
      marginBottom: 20,
      borderWidth: 0,
      borderRadius: 15,       
      justifyContent: 'center',
      margin: 12,
      padding: 10,
   },
   buttonText: {
    color:'#5A5A5A', 
   },
  background: {
    paddingTop: 50,
    height: '100%',
    backgroundColor: 'white',
   }
  });