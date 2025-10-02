import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import * as React from 'react';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Image } from 'react-native'

const staticImage = require("../icons/newlogo.png");

function Landing({ navigation }) {
    return(
        <SafeAreaView style={styles.background}>
             <Image
             source = {staticImage}
             style = {{ marginBottom: '10%', alignSelf: 'center'}}
             />
           <Button 
            title='login'
            buttonStyle={styles.button}
            titleStyle= {styles.buttonText}
            onPress={() => navigation.navigate('Login')}
            />
           <Button 
            buttonStyle = {styles.button}
            titleStyle= {styles.buttonText}
            title='sign up' 
            onPress={() => navigation.navigate('Create Account')
            }/>
        </SafeAreaView>
    )
}

export default Landing;


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      backgroundColor:  '#e8def9', 
      borderColor: '#f5dceb',
      width: '70%',
      marginBottom: 20,
      borderWidth: 0,
      borderRadius: 15,    
      marginLeft: 25,
      marginRight: 25,   
      alignSelf: 'center'
   },
   buttonText: {
    color:'#5A5A5A', 
   },
   background: {
      backgroundColor: '#f7f4fd', //not sure about this
      height: '100%',
      justifyContent: 'center',
   }
  });