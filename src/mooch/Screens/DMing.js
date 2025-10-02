import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Messages from './Messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, collection, getDocs} from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

let data = [];

const getData = async () => {
    if (user) {
      // const q = query(collection(db, "cities"), where("capital", "==", true)); -> can try this for filtering
      const q = await getDocs(collection(db, "messages"));
      q.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let newItem = doc.data();
        newItem.id = doc.id;
        data.push(newItem)
      });
      console.log(data);

    } else {
      console.log("user not signed in");
    }    
  }

class DMing extends React.Component {
    // state = {
    //   messages: [],
    // };
    componentDidMount() {
        getData();
    }   

    render() {
      return (
        <GiftedChat
          messages={data}
        />
      );
    }
  }

export default DMing;