import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView,  FlatList } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
const staticImage = require("../icons/newlogo.png");

function Welcome({navigation}) {
    return(
        <ScrollView style={styles.background}>
             <Image 
             source = {staticImage}
             style = {{ marginBottom: '10%', alignSelf: 'center', marginTop: '10%'}}
             />
           <Text style={styles.headerText}>welcome to mooch!</Text>
           <Text style={styles.subHeaderText}>please accept our norms to continue</Text>

           <Text style={styles.headerText}>for lenders: </Text>

           <FlatList
                data={[
                    { key: 'be transparent with your borrower about expectations for cleaning + clothing usage' },
                    { key: 'upload only real, up-to-date images of your clothing in its current condition' },
                    { key: 'acknowledge that lending can be a risk; serious clothing damage is rare but possible.'},
                    { key: 'if damages are incurred, please report the borrower and collect damage fees from them through the app.'},
                    { key: 'only report real damages. false claims will lead to removal from the app.'},
                    { key: 'you can reject a borrow request for any personal reason, but please do not discriminate on the basis of race or gender'},
                    { key: 'be timely for agreed pickup and dropoff.'},
                    { key: 'always be kind!'},
                ]}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: 10 }}>
                        <Text style={styles.bullets}>{`\u2022 ${item.key}`}</Text>
                    </View>
                    );
                }}
        />

            <Text style={styles.headerText}>for borrowers: </Text>


           <FlatList
                data={[
                    { key: 'be respectful of the clothing you borrow.' },
                    { key: 'if damages are incurred, the borrower is responsible for damage fees and may be removed from the app based on severity.'},
                    { key: 'acknowledge that lending can be a risk; serious clothing damage is rare but possible.'},
                    { key: 'clean clothing before returning to the owner according to borrowing terms.'},
                    { key: 'ask questions to the owner if any of the terms, cleaning or otherwise, are unclear'},
                    { key: 'be transparent about damages or any other clothing incidents with the owner.'},
                    { key: 'be timely for agreed pickup and dropoff.'},
                    { key: 'always be kind!'},
                ]}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: 10 }}>
                        <Text style={styles.bullets}>{`\u2022 ${item.key}`}</Text>
                    </View>
                    );
                }}
        />

           <Button 
            buttonStyle = {styles.button}
            titleStyle= {styles.buttonText}
            title='accept' 
            onPress={() => navigation.navigate('Home')
            }/>
        </ScrollView>
    )
}

export default Welcome;



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
      marginBottom: 20, 
   },
   headerText: {
    color:'#5A5A5A', 
    alignSelf: 'center',
    fontSize: 20,
    paddingBottom: 20,
   }, 
   subHeaderText: {
    color:'#5A5A5A', 
    alignSelf: 'center',
    fontSize: 15,
    paddingBottom: 20,
   }, 
   regText: {
    color:'#5A5A5A', 
    fontSize: 15,
    alignSelf: 'center',
    paddingBottom: 20, 
   }, 
   bullets: {
    color:'#5A5A5A', 
    fontSize: 15,
    alignSelf: 'center',
    width: '80%', 
   }, 
   buttonText: {
    color:'#5A5A5A', 
   },
  background: {
    height: '100%',
    backgroundColor: '#f7f4fd',
    // justifyContent: 'center'
   }
  });
