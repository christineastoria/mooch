import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import * as React from 'react';

// Eventually, this component will take in the data of what was sent as a message and render each message seperately. Here, all the messages are hard coded.
function Messages({ navigation }) {
    return(
        < View style={styles.container}>
            <View style={styles.outline}>
                <Text>Hey! I'm interested in borrowing this but was wondering if it's see-through?</Text>
            </View>
            <View style={styles.outline2}>
                <Text>Hi! It is a little bit. I usually wear a tank underneath!</Text>
            </View>
            <View style={styles.outline}>
                <Text>Sounds great! I'll put in a request to borrow :)</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                // onChangeText={onChangeMessage} #use this when we build backend 
                // value={email}
                placeholder="type your message"
                />
            </View>
        </View>
    )
}

export default Messages;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '10%',
        backgroundColor: '#f7f4fd'
    },
    outline: {
        backgroundColor: '#e8def9',
        borderWidth: 1,
        borderRadius: 15,
        width: '70%',
        marginBottom: '10%',
        marginLeft: '3%',
        padding: 10,
    },
    outline2: {
        backgroundColor: '#e8def9',
        borderWidth: 1,
        borderRadius: 15,
        width: '70%',
        alignSelf: 'flex-end',
        marginBottom: '10%',
        marginRight: '3%',
        padding: 10,
    },
    inputContainer: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '80%',
    },
    input: {
        height: 40,
        width: '95%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
    },
  });