import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import * as React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db , getFirestore, collection, doc, addDoc, setDoc , updateDoc} from "../firebase/firebaseConfig"; // IMPORTANT: this ensures that getAuth is called before we use auth in this file
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const staticImage = require("../icons/newlogo.png");

function CreateAccount({ route, navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [name, onChangeName] = React.useState('');

  const authenticate = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(`Created new user with id ${user.uid}!`);

        const addNewUser = async (userUID) => {
          try {
            await setDoc(doc(db, "users", userUID), {
              name: name,
              email: email,
            });
            console.log("new user document updated id", userUID);
          } catch (e) {
            console.error("Error writing document: ", e);
          }
        }
        addNewUser(user.uid);
        navigation.navigate('Welcome', { userId: user.uid});
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorCode ${errorCode} and errorMessage ${errorMessage}`);
        // ..
      });
  }

    return(
      < KeyboardAvoidingView 
      behavior="padding"
      style={styles.background}>
             <Image
             source = {staticImage}
             style = {{ marginTop: 20, marginBottom: 20, alignSelf: 'center'}}
             />
            <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={onChangeEmail}
            value={email}
            />
            <TextInput
            style={styles.input}
            placeholder="display name"
            onChangeText={onChangeName}
            value={name}
            />
            {/* <TextInput
            style={styles.input}
            // onChangeText={onChangeUsername}  
            // value={username}
            placeholder="username"
            /> */}
             <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
          />
            <Button
            buttonStyle = {styles.button}
            titleStyle = {styles.buttonText}
            title='create account' 
            onPress={authenticate}
            />
        </KeyboardAvoidingView>
    )
}

export default CreateAccount;

// let newUser = {}

// function authenticate(name, email, password, navigation) {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       console.log(`Created new user with email ${email}!`);
//       newUser.id = user.uid;
//       newUser.name = name;
//       newUser.email = email;
//       navigation.navigate('Home', { userId: user.uid });
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(`errorCode ${errorCode} and errorMessage ${errorMessage}`);
//       // ..
//     });
// }


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
  height: '100%',
  backgroundColor: '#f7f4fd',
  justifyContent: 'center'
 }
});