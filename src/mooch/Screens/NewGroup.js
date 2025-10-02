import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, KeyboardAvoidingView, Pressable } from 'react-native';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Messages from './Messages';
import { db } from "../firebase/firebaseConfig";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { TextInput } from 'react-native-paper';

function NewGroup({ navigation }) {

    return(
        < KeyboardAvoidingView 
        behavior="padding"
        style={{flex:1}}>
            
            <View style={styles.container}>
                <Pressable></Pressable>
                <View>
                    <Text style={styles.modalText}>
                        Group name: 
                    </Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeEmail}
                        // value={email}
                    />
                </View>
                <View>
                    <Text style={styles.modalText}>
                        Group description: 
                    </Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeEmail}
                        // value={email}
                    />
                </View>
                <View>
                    <Text style={styles.modalText}>
                        Add group members: 
                    </Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeEmail}
                        // value={email}
                    />
                </View>
                <View>
                    <Text style={styles.modalText}>
                        Who can join: 
                    </Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeEmail}
                        // value={email}
                    />
                </View>
            </View>
        


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    background: {
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 0,
        margin: 0
    },
    container: {
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    scroll: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      flex: 1,
      heigh: 10
    },
    
    TouchableOpacityStyle:{
    
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 100,
        bottom: 500,
      },
    
      FloatingButtonStyle: {
    
        resizeMode: 'contain',
        width: 50,
        height: 50,
      },
      filterContainer: {
      },
    
      filterButton: {
        backgroundColor:'white',
        padding:5,
        margin:5
      },
    
      filterText: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#5A5A5A',
      },
      modalStyle: {
        height: '80%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
      },
      filterButtonContainer: {
        height: 40,
        margin: 0,
        padding: 0,
        backgroundColor: 'white',
        border: 0
      },
      input: {
        height: 20,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignSelf: 'center',
      },
    });

export default NewGroup;