import { StatusBar } from 'expo-status-bar';
// import * as React from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Pressable, Button } from 'react-native'
import { requestFrame } from 'react-native-reanimated/lib/reanimated2/core';
import Modal from "react-native-modal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db , storage, getDoc, doc, getDownloadURL, setDoc , getDocs, updateDoc, arrayUnion, arrayRemove, ref, collection, deleteDoc} from "../firebase/firebaseConfig";

let full_data = [
  {name: 'Kathryn', dates: '06/10-06/15', rating: '5', itemImage: require("../clothes_images/greenscarftop.jpeg"), userIcon: require("../icons/kathpic.png"), description: 'Kathryn has requested to borrow an item, click to view request.' },
  {name: 'Christine', dates: '06/12-06/14',  rating: '5', itemImage: require("../clothes_images/denimtop.jpeg"), userIcon: require("../icons/christinepic.png"), description: 'Christine has requested to borrow an item, click to view request.' },
]



function RequestNotifications({ navigation }) {
    const data = full_data.map((item) => {return item});

    const [notifications, setNotifications] = useState(data);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [modalItem, setModalItem] = React.useState(null);

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user signed in with id", uid)
    } else {
      console.log("user not signed in");
    }      

    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handlePress = (acc) => {
        console.log("pressed!");
        let newData = notifications.filter(item => {
          console.log('item id', item.id)
          console.log('modalItem.id id', modalItem.id)
            return item.id !== modalItem.id;    
          });
        full_data = newData;
        setNotifications(newData);
        handleModal();
    };

    // if (notifications.length == 0) {
    //   return (

    //   )
    // }

    return (
      <View style={styles.container}>
        <Modal isVisible={isModalVisible}>
            <View style={styles.modalStyle}>
                <View>
                    <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={handleModal}>
                        <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
                    </Pressable>
                    <View style={styles.modalIconContainer}>
                    <Image
                    source={modalItem?.userIcon}
                    style={styles.iconInModal}
                    />
                    </View>
                    <View style={styles.modalIconContainer}>
                    <Text style={styles.userText}>{modalItem?.name}</Text>
                    </View>
                    <View style={styles.modalIconContainer}>
                    <View style={styles.ratingContainer}>
                    <Image
                    source={require("../icons/star.png")}
                    style={{width: 17, height: 17}}
                    /> 
                    <Text style={{fontSize: 17, color: '#5A5A5A'}}>{modalItem?.rating}</Text>                   
                    </View>
                    </View>
                    <View style={styles.modalIconContainer}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>has requested to borrow</Text>
                    </View>
                    <View style={styles.modalIconContainer}>
                    <Image
                    source={modalItem?.itemImage}
                    style={{width: 180, height: 230, borderRadius:10}}
                    />
                    </View>
                    <View style={styles.modalIconContainer}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>{"from ".concat(modalItem?.dates)}</Text>
                    </View>
                    <Pressable style={styles.modalButtonContainer} onPress={handlePress}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>accept</Text>
                    </Pressable>
                    <Pressable style={styles.modalButtonContainer} onPress={handlePress}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>reject</Text>
                    </Pressable>
                    <Pressable style={styles.modalButtonContainer} onPress={() => navigation.navigate('DMs')}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>{"DM ".concat(modalItem?.name)}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>  
        <FlatList
          style={styles.notificationList}
          enableEmptySections={true}
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
                <Pressable onPress={() => {
                    setModalItem(item)
                    handleModal();
                }}>        
                <SafeAreaView style={styles.notificationBox}>
                <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={item.userIcon}
                />
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.description}>{item.description}</Text>
                </View>
                </SafeAreaView>
                </Pressable>
            )
          }}
        />
      </View>
    )
  }

// function RequestNotifications({ navigation }) {
//     const [notifications, setNotifications] = useState([])
//     const [isModalVisible, setIsModalVisible] = React.useState(false);
//     const [modalItem, setModalItem] = React.useState(null);
//     const [rawNotifs, setRawNotifs] = React.useState(null);
    
//     const handleModal = () => {
//         setIsModalVisible(!isModalVisible);
//     };

//     const handleReject = async (notification) => {
//       //get id for main user
//       const uid = getAuth().currentUser.uid;
//       const docId = notification.id;
//       //remove requsts from user's doc
//       await deleteDoc(doc(db, "users", uid, "requests", docId));
//       //remove request from notifications
//       const newNotifs = notifications.filter((item) => {
//         return item.id != docId
//       })
//       setNotifications(newNotifs);
//       handleModal();
//     }

//     const handleAccept = async (notification) => {
//       //get id for main user
//       const uid = getAuth().currentUser.uid;
//       const docId = notification.id;
//       const requestDoc = await getDoc(doc(db, "users", uid, "requests", docId))
//       const post = requestDoc.get("post");
//       const requestUserUid = notification.userId;

//       //put item in requesting user's borrowing
//       const requestUserDoc = await getDoc(doc(db, "users", requestUserUid))
//       let borrowing = requestUserDoc.get('borrowing')
//       if (borrowing) {
//         borrowing.push(post);
//       } else {
//         borrowing = [post];
//       }
//       await updateDoc(doc(db, "users", requestUserUid), {
//         borrowing: borrowing
//       });

//       //put item in main user being borrowed
//       const userDoc = await getDoc(doc(db, "users", uid))
//       let beingBorrowed = userDoc.get('beingBorrowed')
//       const borrowInfo = {post: post, borrowedBy: doc(db, "users", requestUserUid)}
//       if (beingBorrowed) {
//         beingBorrowed.push(borrowInfo);
//       } else {
//         beingBorrowed = [borrowInfo];
//       }
//       await updateDoc(doc(db, "users", uid), {
//         beingBorrowed: beingBorrowed
//       });

//       //remove requsts from user's doc
//       await deleteDoc(doc(db, "users", uid, "requests", docId));
//       //remove request from notifications
//       const newNotifs = notifications.filter((item) => {
//         return item.id != docId
//       })
//       setNotifications(newNotifs);
//       handleModal();
//     }

//     const processNotification = async (request) => {
//       const userPath = request.get('user').path.split("/")
//       // console.log('userpath', userPath)
//       const currUser = await getDoc(doc(db, userPath[0], userPath[1]));
//       // console.log('curr user', currUser.data())
//       const currPost = await getDoc(request.get('post'));
//       // console.log('currPost', currPost.data())
//       const postImagePath = currPost.get("imagePath");
//       // console.log('postImagePath', postImagePath)
//       const itemUrl = await getDownloadURL(ref(storage, postImagePath));
//       // console.log('itemUrl', itemUrl)
//       const userPicPath = currUser.get('profilePicPath');
//       // console.log('userPicPath', userPicPath)
//       const fromDate = new Date(request.get('dateRange').from.toDate());
//       const toDate = new Date(request.get('dateRange').to.toDate());
//       const dateRange = fromDate.getMonth()+"/"+fromDate.getDate()+" - "+toDate.getMonth()+"/"+toDate.getDate()
//       // console.log('dateRange', dateRange)
//       return {
//         id: request.id,
//         userId: currUser.id,
//         name: currUser.get("name"),
//         dates: dateRange,
//         rating: currUser.get("rating") ? currUser.get("rating") : 'No rating',
//         itemImage: {uri : itemUrl},
//         userIcon: userPicPath ? {uri : await getDownloadURL(ref(storage, userPicPath))} : require("../icons/notificationaccounticon.png"),
//       }
//     }
//     const getNotifications = async () => {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (user) {
//         const uid = user.uid;
//         const requestsColl = await getDocs(collection(db, "users", uid, 'requests'));
//         requestsColl.forEach( async (requestDoc) => {
//           const newItem = await processNotification(requestDoc);
//           console.log('newitem', newItem);
//           if (!(notifications.some(item => item.id === newItem.id))) {
//             setNotifications((prevNotifications) => [...prevNotifications, newItem]);
//           }
//         });
//       } else {
//         console.log("user not signed in");
//       }  
//     }

//     useEffect( () => {
//       getNotifications();
//     }, []);

//     return (
//       <View style={styles.container}>
//         {!notifications && <Text>No current notifications</Text>}
//         {notifications && <View style={styles.container}>
//         <Modal isVisible={isModalVisible}>
//             <View style={styles.modalStyle}>
//                 <View>
//                     <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={handleModal}>
//                         <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
//                     </Pressable>
//                     <View style={styles.modalIconContainer}>
//                     <Image
//                     source={modalItem?.userIcon}
//                     style={styles.iconInModal}
//                     />
//                     </View>
//                     <View style={styles.modalIconContainer}>
//                     <Text style={styles.userText}>{modalItem?.name}</Text>
//                     </View>
//                     <View style={styles.modalIconContainer}>
//                     <View style={styles.ratingContainer}>
//                     <Image
//                     source={require("../icons/star.png")}
//                     style={{width: 17, height: 17}}
//                     /> 
//                     <Text style={{fontSize: 17, color: '#5A5A5A'}}>{modalItem?.rating}</Text>                   
//                     </View>
//                     </View>
//                     <View style={styles.modalIconContainer}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>has requested to borrow</Text>
//                     </View>
//                     <View style={styles.modalIconContainer}>
//                     <Image
//                     source={modalItem?.itemImage}
//                     style={{width: 180, height: 230, borderRadius: 5}}
//                     />
//                     </View>
//                     <View style={styles.modalIconContainer}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>{"from ".concat(modalItem?.dates)}</Text>
//                     </View>
//                     <Pressable style={styles.modalButtonContainer} onPress={() => {handleAccept(modalItem)}}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>accept</Text>
//                     </Pressable>
//                     <Pressable style={styles.modalButtonContainer} onPress={() => {handleReject(modalItem)}}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>reject</Text>
//                     </Pressable>
//                     <Pressable style={styles.modalButtonContainer} onPress={() => navigation.navigate('DMs')}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>{"DM ".concat(modalItem?.name)}</Text>
//                     </Pressable>
//                 </View>
//             </View>
//         </Modal>  
//         <FlatList
//           style={styles.notificationList}
//           enableEmptySections={true}
//           data={notifications}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => {
//             return (
//                 <Pressable onPress={() => {
//                     setModalItem(item)
//                     handleModal();
//                 }}>        
//                 <SafeAreaView style={styles.notificationBox}>
//                 <View style={styles.iconContainer}>
//                 <Image
//                   style={styles.icon}
//                   source={item.userIcon}
//                 />
//                 </View>
//                 <View style={styles.textContainer}>
//                 <Text style={styles.description}>{item.name+" has requested to borrow an item, click to view request."}</Text>
//                 </View>
//                 </SafeAreaView>
//                 </Pressable>
//             )
//           }}
//         />
//         </View>}
//       </View>
//     )
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationList: {
      marginTop: 20,
      padding: 10,
      height: '100%',
      width: '100%'
    },
    textContainer: {
        flexDirection:'row',
        width: '80%',
        alignItems: 'center',
    },
    notificationBox: {
      height: 80,
      padding: 20,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: '#f3eef6',
      flexDirection: 'row',
      borderRadius: 10,
    },
    iconContainer: {
        paddingLeft: 10,
        paddingRight: 5,
        alignContent: 'center',
        justifyContent: 'center'
    },
    icon: {
      width: 45,
      height: 45,
    },
    iconInModal: {
        width: 100,
        height: 100,
      },
    description: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 18,
      color: '#4d4d4d',
      marginLeft: 5,
    },
    userText: {
        fontSize: 25,
        color: '#5A5A5A'
    },
    modalStyle: {
        height: '90%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#f3eef6',
        borderRadius: 15,
        flexDirection: 'column',
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    modalButtonContainer: {
        backgroundColor:  '#e7deed', 
        borderColor: '#f5dceb',
        width: 200,
        height: 35,
        borderWidth: 0,
        borderRadius: 15,    
        marginLeft: 25,
        marginRight: 25,   
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 9
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        borderRightWidth: 5,
        borderRightColor:'#e7deed',
        borderLeftWidth: 5,
        borderLeftColor:'#e7deed',
        gap: 5,
        backgroundColor: '#e7deed',
        borderRadius: 15
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
  });

export default RequestNotifications;
