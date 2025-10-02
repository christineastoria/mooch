import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView,} from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-elements';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const staticImage = require("../icons/newlogo.png");

function Login({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    return(
          < KeyboardAvoidingView 
          behavior="padding"
          style={styles.background}>
             <Image
             source = {staticImage}
             style = {{ marginBottom: '5%', alignSelf: 'center'}}
             />
            <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={onChangeEmail}
            value={email}
            />
            <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
          />
            <Button
            buttonStyle= {styles.button}
            titleStyle={styles.buttonText}
            title='login' 
            onPress={() => authenticate(email, password, navigation)}
            />
          </ KeyboardAvoidingView>
    )
}

export default Login;

function authenticate(email, password, navigation) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`Signed in user with email ${email}!`);
    // console.log(user.uid);
    navigation.navigate('Home', { userId: user.uid });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`errorCode ${errorCode} and errorMessage ${errorMessage}`); // TODO: error catching
  });
}



const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 15,
      alignSelf: 'center',
    },
    button: {
      backgroundColor:  '#e8def9', 
      borderColor: '#f5dceb',
      marginBottom: 20,
      width: '50%',
      borderWidth: 0,
      borderRadius: 15,       
      alignSelf: 'center',
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


//<View style={styles.container}>
     //     <Button typeof title='login'></Button>
     //     <Button typeof title='create account'></Button>
        {/* <Drawer.Navigator>
          <Drawer.Screen name='My Friends' component={MyFriends} />
          <Drawer.Screen name='Profile' component={Profile} />
        </Drawer.Navigator> */}

    //      <StatusBar style="auto" />
    //    </View>