import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DMing from './DMing';
import { db, collection, getDocs} from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TO-DO: CHANGE DRAWERS TO DM CONVOS (AKA PPLS NAMES)
const messages = [
  {
    id: '1',
    userName: 'Brennan',
    userImg: require("../icons/accounticon.png"),
    messageTime: '2 mins ago',
    messageText: 'Hey, I was wondering if this shirt is see through?',
  },
  {
    id: '2',
    userName: 'Christine',
    userImg: require("../icons/accounticon.png"),
    messageTime: '15 mins ago',
    messageText: 'Is 5pm okay?',
  },
]

const DMpage = ({ navigation }) => {

    // // adding backend functionality 
    // const messagesRef = db.collection('messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);

    // // listen to data using react hook
    // const [messages] = useCollectionData(query, {idfield: 'id'});

    const auth = getAuth();
    const user = auth.currentUser;

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <View style={styles.messContainer}>
                        <TouchableOpacity style={styles.tO} onPress={() => navigation.navigate('DMing', {userName: item.userName})}>
                            <View style={styles.info}>
                                <View style={styles.photo}>
                                    <Image style={styles.pic} source={require("../icons/accounticon.png")}></Image>
                                </View>
                                <View style={styles.messText}>
                                    <View style={styles.messText2}>
                                        <Text style={styles.buttonText}>
                                        {item.userName}
                                        </Text>
                                        <Text style={styles.buttonText}>
                                        {item.messageTime}
                                        </Text>
                                    </View>
                                    <Text>{item.messageText}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                  </View>
                )}
            />
      </SafeAreaView>
    )
}

export default DMpage;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#e8def9',
    },
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
   },
   messContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'space-between',
  },
   tO: {
    backgroundColor: 'white',
    padding: 10,
    width: 380,
    height: 80,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#5A5A5A',
   },
   info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   },
   photo: {
    paddingBottom: 5,
    paddingTop: 5,
   },
   pic: {
    width: 50,
    height: 50,
    borderRadius: 20,
   },
   messText: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    marginLeft: 10,
    width: 300,
   },
   messText2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
   }
  });