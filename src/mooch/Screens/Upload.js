import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import * as React from 'react';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useState} from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { BottomNavigation } from 'react-native-paper';
import { app, db , storage, getFirestore, collection, doc, addDoc, setDoc , updateDoc, arrayUnion, ref, uploadBytes} from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DropDownPicker from 'react-native-dropdown-picker';



function Upload({ navigation }) {
    // image picker
    const route = useRoute();
    const group = route.params?.group;

    const [image, setImage] = useState(null);
    // const [uploading, setUploading] = useState(false);
    const [selectedTags, setSelectedTags] = React.useState([]); //tags
    const [size, setSize] = React.useState(null);  //size
    const [brand, setBrand] = React.useState(null); //brand
    const [cleaningPref, setCleaningPref] = React.useState(null);// cleaning
    const [docRef, setDocRef] = React.useState(null);// cleaning
    const [filename, setFilename] = React.useState(null);// cleaning

    // const [cleaningPref, setCleaningPref] = React.useState(null);// cleaning


    //for dropdown picker
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeItems, setTypeItems] = useState([
      {label: 'machine wash before returning', value: 'machine wash'},
      {label: 'hand wash before returning', value: 'hand wash'},
      {label: 'dry clean before returning', value: 'dry clean'},
      {label: 'return without cleaning', value: 'no clean '},
    ]);


  
    const tags = [
        {key:'1', value:'tops'},
        {key:'2', value:'bottoms'},
        {key:'3', value:'dresses'},
        {key:'4', value:'accessories'},
        {key:'5', value:'sets'},
        {key:'6', value:'shoes'},
    ]

    // const handleUpload = () => {
    //   const auth = getAuth();
    //   const user = auth.currentUser;
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const uid = user.uid;
    //     console.log("user signed in with id", uid)

    //     const uploadImage = async () => {
    //       const filename = image.substring(image.lastIndexOf('/') + 1);
    //       const imagePath = 'groupImages/'+group+"/"+filename;
    //       const storageRef = ref(storage, imagePath);
    //       //convert iamge to array of bytes
    //       console.log("selected tags", selectedTags.toString())
    //       const metadata = {
    //         customMetadata: {
    //           'size': size.toString(),
    //           'brand': brand.toString(),
    //           'cleaningPref': cleaningPref.toString(),
    //           'owner': '/users/'.concat(uid),
    //           'tags': selectedTags.toString(), 
    //           'imagePath': imagePath 
    //         }           
    //       };
    //       try {
    //         const img = await fetch(image);
    //         const bytes = await img.blob();
    //         await uploadBytes(storageRef, bytes, metadata);
    //         console.log("image uploaded");
    //         const uploadPost = async () => {
    //           try {
    //             const docRef = await addDoc(collection(db, "groups", group, "posts"), {
    //               size: size.toString(),
    //               brand: brand.toString(),
    //               cleaningPref: cleaningPref.toString(),
    //               owner: '/users/'.concat(uid),
    //               tags: selectedTags, 
    //               imagePath: imagePath           
    //             });
    //             console.log("new post document written with id", docRef.id);
    //             const updateUser = async () => {
    //               try {
    //                 const userRef = doc(db, "users", uid);
    //                 console.log(userRef)
    //                 await updateDoc(userRef, {
    //                   posts: arrayUnion(docRef)
    //                 });
    //                 console.log("user update written");
    //               } catch (e) {
    //                 console.error("Error updating user document: ", e);
    //               }
    //             }
    //             updateUser();
    //           } catch (e) {
    //             console.error("Error writing post document: ", e);
    //           }
    //         }
    //         uploadPost();
    //       } catch (e) {
    //         console.error("Error uploading image: ", e);
    //       }
    //     };
    //     uploadImage();
    //   } else {
    //     console.log("user not signed in");
    //   }      
    //   setImage(null);
    //   setSelectedTags([]);
    //   setSize(null);
    //   setBrand(null);
    //   setCleaningPref(null);
    //   navigation.navigate('Explore');
    // }


  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });  
      if (!result.canceled) {
        // console.log(result);
        setImage(result.assets[0].uri);
      }
    };
    return(
      < KeyboardAvoidingView 
      behavior="padding"
      style={styles.background}>
          <ScrollView Vertical={true} showsVerticalScrollIndicator={false} style = {{ width: '100%'}}>
            <Button 
            buttonStyle= {styles.button}
            titleStyle={styles.buttonText}
            title="upload an image from camera roll" onPress={pickImage} />
         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center', marginBottom:20}} />}
         <View style={{width: '100%', justifyContent: 'center', alignItems : 'center'}}>
         <MultipleSelectList 
                setSelected={(val) => setSelectedTags(val)} 
                data={tags} 
                save="value"
                label="Categories"
                placeholder='select clothing type'
            />
         </View>
          <TextInput
          style={styles.input}
          placeholder="item brand"
          onChangeText={setBrand}
          value={brand}
          />
          <TextInput
          style={styles.input}
          placeholder="item size"
          onChangeText={setSize}
          value={size}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="cleaning preference"
          onChangeText={setCleaningPref}
          value={cleaningPref}
        /> */}
       <DropDownPicker style= {styles.input}
          open={typeOpen}
          value={cleaningPref}
          items={typeItems}
          setOpen={setTypeOpen}
          setItems={setTypeItems}
          setValue={setCleaningPref}
          placeholder="cleaning preference"
        />

          <Button
          buttonStyle= {styles.button}
          titleStyle={styles.buttonText}
          title='upload' onPress={handleUpload}/>
         <Button
          buttonStyle= {styles.button}
          titleStyle={styles.buttonText}
          title='cancel' onPress={() =>
          navigation.navigate('Explore')
          }/>
          </ScrollView>
          </KeyboardAvoidingView>
  )
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
      backgroundColor:  '#f7f4fd', 
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
    justifyContent: 'center',
    alignItems: 'center',
   }
  });


export default Upload;


    // const uploadImage = async () => {
    //   const file = image.substring(image.lastIndexOf('/') + 1);
    //   setFilename(file);
    //   const storageRef = ref(storage, 'items/'+file);
    //   //convert iamge to array of bytes
    //   const img = await fetch(image);
    //   const bytes = await img.blob();
    //   await uploadBytes(storageRef, bytes);
    //   // return filename
    // }

    // const uploadPost = async (uid) => {
    //   try {
    //     const docReff = await addDoc(collection(db, "groups", group, "posts"), {
    //       size: size,
    //       brand: brand,
    //       cleaningPref: cleaningPref,
    //       owner: '/users/'.concat(uid),
    //       tags: selectedTags, 
    //       imagePath: 'items/'+filename
    //     });
    //     setDocRef(docReff);
    //     console.log("new post document written with id", docReff.id);
    //   } catch (e) {
    //     console.error("Error writing post document: ", e);
    //   }
    // }
    

    // const updateUser = async (uid) => {
    //   try {
    //     const userRef = doc(db, "users", uid);
    //     console.log(userRef)
    //     await updateDoc(userRef, {
    //       posts: arrayUnion(docRef)
    //     });
    //     console.log("user update written");
    //   } catch (e) {
    //     console.error("Error updating user document: ", e);
    //   }
    // }

    // const handleUpload = () => {
    //   const auth = getAuth();
    //   const user = auth.currentUser;
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const uid = user.uid;
    //     console.log("user signed in with id", uid)
    //     uploadImage();
    //     uploadPost(uid);
    //     updateUser(uid);
    //   } else {
    //     console.log("user not signed in");
    //   }      
    //   setImage(null);
    //   setSelectedTags([]);
    //   setSize(null);
    //   setBrand(null);
    //   setCleaningPref(null);
    //   navigation.navigate('Explore');
    // }