import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, ScrollView , Button, Pressable, TextInput, Keyboard} from 'react-native';
import React, { useState, useEffect } from 'react'
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements'
import {Stars} from 'react-native-stars';
import { SelectList } from 'react-native-dropdown-select-list'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db , storage, getDoc, doc, addDoc, setDoc , updateDoc, ref, collection, getCountFromServer, getDownloadURL} from "../firebase/firebaseConfig";



let allClothes = [
  { source: require("../clothes_images/yellowbralette.jpeg"),
      id: '8',
      text: 'FreePeople (S)' },
  { source: require("../clothes_images/denimtop.jpeg"),
      id: '9',
      text: 'Amazon (S)' },
  { source: require("../clothes_images/blackstrappydress.jpeg"),
      id: '10',
      text: 'TigerMist (S)' }, 
  { source: require("../clothes_images/pinkscarftop.jpeg"),
      id: '11',
      text: 'TigerMist (S)' }, 

];

let full_beingBorrowed = [
  { source: require("../clothes_images/denimtop.jpeg"),
      width: 160,
      height: 210,
      id: '9',
      i: 8,
      text: 'Amazon (S)',
      user: 'Kathryn',
      userIcon: require("../icons/kathpic.png") }
];

const borrowing = [
  { source: require("../clothes_images/bluedress.jpeg"),
      width: 160,
      height: 250,
      id: '8',
      i: 7,
      text: 'FreePeople (S)' },
  { source: require("../clothes_images/cowboyhatfeathers.png"),
      width: 160,
      height: 210,
      id: '9',
      i: 8,
      text: 'Amazon (S)' }
];

const reportOptions = [
{key: '1', value: 'item never returned'},
{key: '2', value: 'item damaged beyond repair'},
{key: '3', value: 'item returned in poor condition'},
{key: '4', value: 'item not cleaned according to agreed policy'},
{key: '5', value: 'item not returned on time'},
{key: '6', value: 'other'}
]

const filledStar = require('../icons/starFilled.png');
const halfStar = require('../icons/starHalf.png');
const emptyStar = require('../icons/starEmpty.png')

function Profile({ navigation }) {
  const borrowed = full_beingBorrowed.map((item) => {return item});
  const my_clothes = allClothes.map((item) => {return item});
  const [stars, setStars] = React.useState([filledStar, filledStar, halfStar, emptyStar, emptyStar]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [modalItemDelete, setModalItemDelete] = React.useState(null);
  const [isReturnModalVisible, setIsReturnModalVisible] = React.useState(false);
  const [modalItemReturn, setModalItemReturn] = React.useState(null);
  
  const handleDeleteModal = () => {setIsDeleteModalVisible(!isDeleteModalVisible);};
  const [isReturnChecked, setIsReturnChecked] = React.useState(false);
  const handleReturnChecked = () => {setIsReturnChecked(!isReturnChecked);};
  const [isDeleteChecked, setIsDeleteChecked] = React.useState(false);
  const [numStars, setNumStars] = React.useState(2.5);
  const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
  const [reportReason, setReportReason] = React.useState(null);
  const [reportComment, setReportComment] = React.useState(null);
  const handleReportModal = () => {setIsReportModalVisible(!isReportModalVisible);};
  const [notificationIcon, setNotificationIcon] = useState(require("../icons/newnotificationoutline.png"));
  // const [notifications, setNotifications] = useState(null);
  const [myCloset, setMyCloset] = useState(my_clothes);
  // const [borrowing, setBorrowing] = useState([]);
  const [beingBorrowed, setBeingBorrowed] = useState(borrowed);

  const uid = getAuth().currentUser.uid

  const handleDeleteChecked = () => {setIsDeleteChecked(!isDeleteChecked);};

  const handleReturnModal = () => {
    setIsReturnModalVisible(!isReturnModalVisible);
  };

  const handleReturnDone = () => {
    if (isReturnChecked) {
      setBeingBorrowed([]);
      full_beingBorrowed = [];
    }
    setIsReturnModalVisible(!isReturnModalVisible)
  }
  const handleDeleteDone = () => {
    if (isDeleteChecked) {
      const newClothes = allClothes.filter((item) => {
        return item.id !== modalItemDelete.id;
      })
      setMyCloset(newClothes);
      allClothes = newClothes;
    }
    setIsDeleteModalVisible(!isDeleteModalVisible)
  }

  // var allClothes = [
  //   { source: require("../clothes_images/yellowbralette.jpeg"),
  //       id: '8',
  //       text: 'FreePeople (S)' },
  //   { source: require("../clothes_images/denimtop.jpeg"),
  //       id: '9',
  //       text: 'Amazon (S)' },
  //   { source: require("../clothes_images/blackstrappydress.jpeg"),
  //       id: '10',
  //       text: 'TigerMist (S)' }, 
  //   { source: require("../clothes_images/pinkscarftop.jpeg"),
  //       id: '11',
  //       text: 'TigerMist (S)' }, 

  // ];

  // var beingBorrowed = [
  //     { source: require("../clothes_images/denimtop.jpeg"),
  //         width: 160,
  //         height: 210,
  //         id: '9',
  //         i: 8,
  //         text: 'Amazon (S)',
  //       user: 'Christine',
  //       userIcon: require("../icons/accounticon.png") }
  // ];


  // const parsePosts = (items) => {
  //   const newItems = items.map( async (item) => {
  //     const postPath = item.split("/");
  //     const postDoc = await getDoc(doc(db, "groups", postPath[1], "posts", postPath[3]))
  //     const postImagePath = postDoc.get("imagePath");
  //     const itemUrl = await getDownloadURL(ref(storage, postImagePath));
  //     return {
  //       id: postDoc.id,
  //       source : { uri: itemUrl},
  //     }
  //   });
  //   return newItems;
  // }

  // const parseBeingBorrowed = (items) => {
  //   const newItems = items.map( async (item) => {
  //     const postPath = item.post.path.split("/");
  //     const postDoc = await getDoc(doc(db, "groups", postPath[1], "posts", postPath[3]));
  //     const postImagePath = postDoc.get("imagePath");
  //     const itemUrl = await getDownloadURL(ref(storage, postImagePath));
  //     const borrowedByPath = item.borrowedBy.path.split("/");
  //     const borrowerDoc = await getDoc(doc(db, "users", borrowedByPath[1]));
  //     const borrowerName = borrowerDoc.get("name");
  //     const borrowerIconPath = borrowerDoc.get("profilePicPath");
  //     return {
  //       id: postDoc.id,
  //       source : { uri: itemUrl},
  //       borrowedBy : item.borrowedBy.path,
  //       borrowedByName : borrowerName,
  //       borrowedByIcon : borrowerIconPath ? {uri : await getDownloadURL(ref(storage, borrowerIconPath))} : require("../icons/accounticon.png") 
  //     }
  //   });
  //   return newItems;
  // }

  // const getCloset = async () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   if (user) {
  //     console.log('here!')
  //     const userDoc = await getDoc(doc(db, "users", uid));
  //     //get user posts
  //     const posts = userDoc.get("posts");
  //     // console.log('here!')
  //     //get user borrowing
  //     if (posts) {
  //       setMyCloset(parsePosts(posts));
  //     }
  //     const borrowing = userDoc.get("borrowing");
  //     if (borrowing) {
  //       setMyCloset(parsePosts(borrowing));
  //     }
  //     //bet user being borrowed
  //     const beingBorrowed = userDoc.get("beingBorrowed");
  //     if (beingBorrowed) {
  //       setMyCloset(parseBeingBorrowed(beingBorrowed));
  //     }
  //   } else {
  //     console.log("user not signed in");
  //   }  
  // }

  // const getNotifications = async () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(uid)
  //     const snapshot = await getCountFromServer(collection(db, "users", uid, 'requests'));
  //     if (snapshot.data().count > 0) {
  //       setNotificationIcon(require('../icons/newnotificationoutline.png'));
  //     }
  //   } else {
  //     console.log("user not signed in");
  //   }  
  // }



  // useEffect( () => {
  //   getNotifications();
  //   getCloset();
  // }, []);


  const handleStar = (num) => {
    console.log(numStars);
    if (((num==stars.length-1) && stars[num] == filledStar)) {
      setStars([stars[0], stars[1], stars[2], stars[3], halfStar]);
      setNumStars(4.5);
    } else if ((num==stars.length-1) && (stars[num] == halfStar)) {
      setStars([stars[0], stars[1], stars[2], stars[3], filledStar]);
      setNumStars(5);
    } else if ((num==0) && (stars[num] == halfStar)) {
      setStars([emptyStar, emptyStar, emptyStar, emptyStar, emptyStar]);
      setNumStars(0);
    } else if ((stars[num] == emptyStar) || ((stars[num] == filledStar) && (stars[num+1] == filledStar)) || (stars[num] == halfStar)) {
      let newStars = stars.map((star, i) => {
        if (i <= num) {
          return filledStar;
        } else {
          return emptyStar;
        }
      })
      setStars(newStars);
      setNumStars(num+1);
    } else if (stars[num] == filledStar) {
      let newStars = stars.map((star, i) => {
        if (i < num) {
          return filledStar;
        } else if (i==num){
          return halfStar;
        } else {
          return emptyStar;
        }
      })
      setStars(newStars);
      setNumStars(num+0.5);
    } 
  }

  return(
    <View style={styles.container}>
    <View style={styles.header}>
    <Pressable style={styles.notificationContainer} onPress={() => navigation.navigate('RequestNotifications')}>
          <Image source={require('../icons/newnotificationoutline.png')} style={{height:27, width:23}}/>
    </Pressable>
      <View style={styles.headerContent}>
        <Image style={styles.avatar} source={require("../icons/brennanpic.png")}/>
        <Text style={styles.name}>Brennan Megregian</Text>
        <View style={styles.ratingContainer}>
            <Image
            source={require("../icons/star.png")}
            style={{width: 17, height: 17}}
            /> 
            <Text style={{fontSize: 17, color: '#5A5A5A'}}>{4.95}</Text>                   
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.statsCount}>{myCloset.length}</Text>
            <Text style={styles.statsLabel}>Items</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsCount}>{beingBorrowed.length}</Text>
            <Text style={styles.statsLabel}>Borrowed</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsCount}>{2}</Text>
            <Text style={styles.statsLabel}>Borrowing</Text>
          </View>
        </View>
      </View>
    </View>
    <Modal isVisible={isReturnModalVisible}>
            <View style={styles.returnModalStyle}>
                <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={handleReturnModal}>
                    <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
                  </Pressable>
                <View style={styles.modalTextContainer}>
                <Text style={{fontSize: 19, color: '#5A5A5A'}}>this item is being borrowed by</Text>
                </View>
                <View style={styles.modalIconContainer}>
                <Image
                source={modalItemReturn?.userIcon}
                style={{width:100,height:100}}
                />
                </View>
                <View style={styles.modalIconContainer}>
                <Text style={{fontSize: 22, color: '#5A5A5A'}}>{modalItemReturn?.user}</Text>
                </View>
                <View style={styles.modalTextContainer}>
                <Text style={{marginVertical: 5, fontSize: 17, color: '#5A5A5A', textAlign: 'center'}}>{"rate your experience with ".concat(modalItemReturn?.user)}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                     <Pressable onPress={() => {handleStar(0);}}>
                       <Image style={{height: 40, width: 40}} source={stars[0]}/>
                     </Pressable>
                     <Pressable onPress={() => {handleStar(1);}}>
                       <Image style={{height: 40, width: 40}} source={stars[1]}/>
                     </Pressable>
                     <Pressable onPress={() => {handleStar(2);}}>
                     <Image style={{height: 40, width: 40}} source={stars[2]}/>
                     </Pressable>
                     <Pressable onPress={() => {handleStar(3);}}>
                       <Image style={{height: 40, width: 40}} source={stars[3]}/>
                     </Pressable>
                     <Pressable onPress={() => {handleStar(4);}}>
                       <Image style={{height: 40, width: 40}} source={stars[4]}/>
                     </Pressable>
                  </View>
                <View>
                <CheckBox
                    center
                    title='mark item as returned'
                    iconRight
                    checkedIcon={<Image source={require('../icons/checked.png')} style={{height:20, width:20}}/>}
                    uncheckedIcon={<Image source={require('../icons/unchecked.png')} style={{height:20, width:20}}/>}
                    checked={isReturnChecked}
                    onPress={handleReturnChecked}
                    textStyle={{fontSize: 15, lineHeight: 21, letterSpacing: 0.25, color: '#5A5A5A'}}
                    containerStyle = {styles.modalIconContainer}
                  />
                </View>
                <View style={{flexDirection: 'row', gap:'90%'}}>
                  <Pressable style={styles.modalTextContainer} onPress={() => {handleReportModal();}}>
                <Text style={{marginVertical: 5, fontSize: 17, color: '#e60000', textAlign: 'center'}}>report user</Text>
                </Pressable>
                <Pressable style={styles.doneContainer} onPress={handleReturnDone}>
                <Text style={{marginVertical: 5, fontSize: 17, color: '#5A5A5A', textAlign: 'center'}}>done</Text>
                </Pressable>
                </View>
            </View>
            <Modal isVisible={isReportModalVisible}>
            <View style={styles.reportModalStyle}>
                <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={() => {handleReportModal();}}>
                    <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
                  </Pressable>
                  <View style={styles.modalTextContainer}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>what would you like to report?</Text>
                  </View>
                  <View style={styles.modalTextContainer}>
                  <SelectList 
                    setSelected={(val) => setReportReason(val)} 
                    data={reportOptions} 
                    save="value"
                    placeholder="select reason for report"
                    search={false}
                  />
                  </View>
                  <View style={styles.modalTextContainer}>
                  <TextInput
                    style={{height: 100, backgroundColor: 'white', width: '90%', padding:5, borderRadius: 10, borderColor: '#5A5A5A', borderWidth: 1}}
                    placeholder="(optional) leave a comment to explain"
                    onChangeText={(val) => {setReportComment(val)}}
                    value={reportComment}
                    multiline={true}
                    numberOfLines={5}
                    keyboardType="default"
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                  />
                  </View>
                  <Pressable style={styles.modalButtonContainer} onPress={handleReportModal}>
                    <Text style={{fontSize: 19, color: '#5A5A5A'}}>submit</Text>
                  </Pressable>
            </View>
          </Modal> 
        </Modal> 
        <Modal isVisible={isDeleteModalVisible}>
            <View style={styles.modalStyle}>
                <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={handleDeleteModal}>
                    <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
                  </Pressable>
                <View>
                <CheckBox
                    center
                    title='Remove item from closet'
                    iconRight
                    checkedIcon={<Image source={require('../icons/deletechecked.png')} style={{height:20, width:15}}/>}
                    uncheckedIcon={<Image source={require('../icons/deleteunchecked.png')} style={{height:20, width:15}}/>}
                    checked={isDeleteChecked}
                    onPress={handleDeleteChecked}
                    textStyle={{fontSize: 15, lineHeight: 21, letterSpacing: 0.25, color: '#5A5A5A'}}
                    containerStyle ={{backgroundColor: 'transparent', borderColor: 'transparent', paddingTop:'10%', paddingBottom:'10%'}}
                  />
                <Pressable style={styles.deleteDoneContainer} onPress={handleDeleteDone}>
                <Text style={{marginVertical: 5, fontSize: 17, color: '#5A5A5A', textAlign: 'center'}}>done</Text>
                </Pressable>
                </View>
            </View>
        </Modal> 
    <ScrollView>
        <View style={styles.closetContainer}>
            <Text style={styles.closetHeader}>My Closet</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {myCloset.map((item) => (
              <View key={item.id} style={{marginTop: 12, flex: 1, padding: 5}}>
                <Pressable onPress={() => {
                  setModalItemDelete(item)
                  handleDeleteModal();
                  }
                }>
                  <Image
                  source={item.source}
                  style={{
                    height: 120,
                    alignSelf: 'stretch',
                    width: 120,
                    borderRadius: 7,
                  }}
                  resizeMode="cover"
                />
                </Pressable>
              </View>         
            ))}
            </ScrollView>
        </View>
        <View style={styles.closetContainer}>
            <Text style={styles.closetHeader}>Borrowed</Text>
            {beingBorrowed.length===0 && <Text style={{textAlign: 'center', fontSize:16}}>None of your items are being borrowed at the moment!</Text>}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {beingBorrowed.map((item) => (     
              <View key={item.id} style={{marginTop: 12, flex: 1, padding: 5}}>
              <Pressable onPress={() => {
                  setModalItemReturn(item)
                  handleReturnModal();
                }
              }>
                <Image
                source={item.source}
                style={{
                  height: 120,
                  alignSelf: 'stretch',
                  width: 120,
                  borderRadius: 7,
                }}
                resizeMode="cover"
              />
              </Pressable>
            </View>     
            ))}
            </ScrollView>
        </View>
        <View style={styles.closetContainer}>
            <Text style={styles.closetHeader}>Borrowing</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {borrowing.map((item) => (
                <View key={item.id} style={styles.imageContainer}>
                    <Image style={styles.image} source={item.source}/>
                </View>            
            ))}
            </ScrollView>
        </View>
    </ScrollView>
  </View>
)
}

export default Profile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalContainer: {
    zIndex: 1,
    margin: 25,
    backgroundColor: "white"
  },
  background: {
    flex: 1
  },
  filterText: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#5A5A5A',
  },
  outerContainer: {
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: "center"
  },
  header: {
    flex : 0,
    height: 330,
    flexDirection: 'column',
    gap: 1,
    backgroundColor: 'transparent',
    alignItems: 'right',
    padding: 30,
    marginTop:20,
  },
  headerContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%'
  },
  notificationContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
    width: '100%',
    justifyContent: 'center'
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
    borderRadius: 15,
    marginTop: 10
},
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#5A5A5A',
    fontWeight: '600',
  },
  closetHeader: {
      paddingBottom: 5,
      textAlign: 'center',
      fontSize: 20,
      color: '#5A5A5A',
      fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statsBox: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statsCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5A5A5A',
  },
  statsLabel: {
    fontSize: 14,
    color: '#999999',
  },
  body: {
    alignItems: 'center',
    padding: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 7
  },
  closetContainer: {
      paddingBottom: 10
  },
  modalStyle: {
    height: '25%',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#f3eef6',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
},
returnModalStyle: {
  height: '65%',
  width: '95%',
  alignSelf: 'center',
  backgroundColor: '#f3eef6',
  borderRadius: 15,
  flexDirection: 'column',
  gap: 15,
  alignItems: 'center'
},
reportModalStyle: {
  height: '75%',
  width: '95%',
  alignSelf: 'center',
  backgroundColor: '#f3eef6',
  borderRadius: 15,
  flexDirection: 'column',
  gap: 15,
  alignItems: 'center'
},
modalIconContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  backgroundColor: 'transparent'
}, 
modalTextContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  marginHorizontal: 7
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
doneContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  marginHorizontal: 7,
  backgroundColor: '#e7deed',
  borderRadius: 15, 
  width:100
}, 
deleteDoneContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  marginHorizontal: 7,
  backgroundColor: '#e7deed',
  borderRadius: 15, 
  width:100,
  marginLeft:80
}, 
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

// // const auth = getAuth();
// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     // User is signed in, see docs for a list of available properties
// //     // https://firebase.google.com/docs/reference/js/auth.user
// //     const uid = user.uid;
// //     // ...
// //   } else {
// //     // User is signed out
// //     // ...
// //   }
// // });

// // //or
// // const auth = getAuth();
// // const user = auth.currentUser;

// // if (user) {
// //   // User is signed in, see docs for a list of available properties
// //   // https://firebase.google.com/docs/reference/js/auth.user
// //   // ...
// // } else {
// //   // No user is signed in.
// // }



// const allClothes = [
//     { source: require("../clothes_images/yellowbralette.jpeg"),
//         id: '8',
//         text: 'FreePeople (S)' },
//     { source: require("../clothes_images/denimtop.jpeg"),
//         id: '9',
//         text: 'Amazon (S)' },
//     { source: require("../clothes_images/blackstrappydress.jpeg"),
//         id: '10',
//         text: 'TigerMist (S)' }, 
//     { source: require("../clothes_images/pinkscarftop.jpeg"),
//         id: '11',
//         text: 'TigerMist (S)' }, 

// ];

// const beingBorrowed = [
//     { source: require("../clothes_images/denimtop.jpeg"),
//         width: 160,
//         height: 210,
//         id: '9',
//         i: 8,
//         text: 'Amazon (S)' }
// ];

// const borrowing = [
//     { source: require("../clothes_images/bluedress.jpeg"),
//         width: 160,
//         height: 250,
//         id: '8',
//         i: 7,
//         text: 'FreePeople (S)' },
//     { source: require("../clothes_images/cowboyhatfeathers.png"),
//         width: 160,
//         height: 210,
//         id: '9',
//         i: 8,
//         text: 'Amazon (S)' }
// ];

// const reportOptions = [
//   {key: '1', value: 'item never returned'},
//   {key: '2', value: 'item damaged beyond repair'},
//   {key: '3', value: 'item returned in poor condition'},
//   {key: '4', value: 'item not cleaned according to agreed policy'},
//   {key: '5', value: 'item not returned on time'},
//   {key: '6', value: 'other'}
// ]

// function Profile({ navigation }) {
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
//   const [modalItemDelete, setModalItemDelete] = React.useState(null);
//   const [isReturnModalVisible, setIsReturnModalVisible] = React.useState(false);
//   const [modalItemReturn, setModalItemReturn] = React.useState(null);
//   const handleReturnModal = () => {setIsReturnModalVisible(!isReturnModalVisible);};
//   const handleDeleteModal = () => {setIsDeleteModalVisible(!isDeleteModalVisible);};
//   const [isReturnChecked, setIsReturnChecked] = React.useState(false);
//   const handleReturnChecked = () => {setIsReturnChecked(!isReturnChecked);};
//   const [isDeleteChecked, setIsDeleteChecked] = React.useState(false);
//   const [numStars, setNumStars] = React.useState(null);
//   const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
//   const [reportReason, setReportReason] = React.useState(null);
//   const [reportComment, setReportComment] = React.useState(null);
//   const handleReportModal = () => {setIsReportModalVisible(!isReportModalVisible);};

//   const handleDeleteChecked = () => {setIsDeleteChecked(!isDeleteChecked);};

//   var allClothes = [
//     { source: require("../clothes_images/yellowbralette.jpeg"),
//         id: '8',
//         text: 'FreePeople (S)' },
//     { source: require("../clothes_images/denimtop.jpeg"),
//         id: '9',
//         text: 'Amazon (S)' },
//     { source: require("../clothes_images/blackstrappydress.jpeg"),
//         id: '10',
//         text: 'TigerMist (S)' }, 
//     { source: require("../clothes_images/pinkscarftop.jpeg"),
//         id: '11',
//         text: 'TigerMist (S)' }, 

// ];

// var beingBorrowed = [
//     { source: require("../clothes_images/denimtop.jpeg"),
//         width: 160,
//         height: 210,
//         id: '9',
//         i: 8,
//         text: 'Amazon (S)',
//       user: 'Christine',
//       userIcon: require("../icons/accounticon.png") }
// ];


// }

// export default Profile;

// {/* <Modal visible={isReturnModalVisible} onRequestClose={handleReturnModal}>
// <View style={styles.modalStyle}>
//     <View>
//         <Text>{'Mark item as returned?'}</Text>
//         <Button title="Hide modal" onPress={handleReturnModal} />
//     </View>
// </View>
// </Modal>  */}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff'
//     },
//     modalContainer: {
//       zIndex: 1,
//       margin: 25,
//       backgroundColor: "white"
//     },
//     background: {
//       flex: 1
//     },
//     filterText: {
//       fontSize: 12,
//       lineHeight: 21,
//       letterSpacing: 0.25,
//       color: '#5A5A5A',
//     },
//     outerContainer: {
//       position: "absolute", 
//       top: 0, 
//       left: 0, 
//       right: 0, 
//       bottom: 0, 
//       justifyContent: "center"
//     },
//     header: {
//       flex : 0,
//       height: 300,
//       flexDirection: 'column',
//       gap: 1,
//       backgroundColor: 'transparent',
//       alignItems: 'right',
//       padding: 30,
//       marginTop:20,
//     },
//     headerContent: {
//       alignItems: 'center',
//       backgroundColor: 'transparent',
//       height: '100%',
//       width: '100%'
//     },
//     notificationContainer: {
//       alignItems: 'flex-end',
//       marginTop: 5,
//       width: '100%',
//       justifyContent: 'center'
//     },
//     avatar: {
//       width: 130,
//       height: 130,
//       borderRadius: 63,
//       borderWidth: 4,
//       borderColor: 'white',
//       marginBottom: 10,
//     },
//     name: {
//       fontSize: 22,
//       color: '#5A5A5A',
//       fontWeight: '600',
//     },
//     closetHeader: {
//         paddingBottom: 5,
//         textAlign: 'center',
//         fontSize: 20,
//         color: '#5A5A5A',
//         fontWeight: '600',
//     },
//     statsContainer: {
//       flexDirection: 'row',
//       marginTop: 10,
//     },
//     statsBox: {
//       alignItems: 'center',
//       marginHorizontal: 10,
//     },
//     statsCount: {
//       fontSize: 18,
//       fontWeight: '600',
//       color: '#5A5A5A',
//     },
//     statsLabel: {
//       fontSize: 14,
//       color: '#999999',
//     },
//     body: {
//       alignItems: 'center',
//       padding: 30,
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//     },
//     imageContainer: {
//       padding: 5,
//     },
//     image: {
//       width: 120,
//       height: 120,
//       borderRadius: 7
//     },
//     closetContainer: {
//         paddingBottom: 10
//     },
//     modalStyle: {
//       height: '20%',
//       width: '95%',
//       alignSelf: 'center',
//       backgroundColor: '#f3eef6',
//       borderRadius: 15,
//   },
//   returnModalStyle: {
//     height: '65%',
//     width: '95%',
//     alignSelf: 'center',
//     backgroundColor: '#f3eef6',
//     borderRadius: 15,
//     flexDirection: 'column',
//     gap: 15,
//     alignItems: 'center'
//   },
//   reportModalStyle: {
//     height: '75%',
//     width: '95%',
//     alignSelf: 'center',
//     backgroundColor: '#f3eef6',
//     borderRadius: 15,
//     flexDirection: 'column',
//     gap: 15,
//     alignItems: 'center'
//   },
//   modalIconContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//     backgroundColor: 'transparent'
//   }, 
//   modalTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//     marginHorizontal: 7
//   }, 
//   modalButtonContainer: {
//     backgroundColor:  '#e7deed', 
//     borderColor: '#f5dceb',
//     width: 200,
//     height: 35,
//     borderWidth: 0,
//     borderRadius: 15,    
//     marginLeft: 25,
//     marginRight: 25,   
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 9
//   },
//   doneContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//     marginHorizontal: 7,
//     backgroundColor: '#e7deed',
//     borderRadius: 15, 
//     width:100
//   }, 
//   });


// (
//   <View style={styles.container}>
//     {!uid && <Text>Please sign in to view profile</Text>}
//     {uid && <View style={styles.container}>
//     <View style={styles.header}>
//     <Pressable style={styles.notificationContainer} onPress={() => navigation.navigate('RequestNotifications')}>
//           <Image source={notificationIcon} style={{height:27, width:23}}/>
//     </Pressable>
//       <View style={styles.headerContent}>
//         <Image style={styles.avatar} source={require("../icons/accounticon.png")}/>
//         <Text style={styles.name}>Brennan Megregian</Text>
//         <View style={styles.statsContainer}>
//           <View style={styles.statsBox}>
//             <Text style={styles.statsCount}>{myCloset.length}</Text>
//             <Text style={styles.statsLabel}>Items</Text>
//           </View>
//           <View style={styles.statsBox}>
//             <Text style={styles.statsCount}>{beingBorrowed.length}</Text>
//             <Text style={styles.statsLabel}>Borrowed</Text>
//           </View>
//           <View style={styles.statsBox}>
//             <Text style={styles.statsCount}>{borrowing.length}</Text>
//             <Text style={styles.statsLabel}>Borrowing</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//     <Modal isVisible={isReturnModalVisible}>
//             <View style={styles.returnModalStyle}>
//                 <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={handleReturnModal}>
//                     <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
//                   </Pressable>
//                 <View style={styles.modalTextContainer}>
//                 <Text style={{fontSize: 19, color: '#5A5A5A'}}>this item is being borrowed by</Text>
//                 </View>
//                 <View style={styles.modalIconContainer}>
//                 <Image
//                 source={modalItemReturn?.borrowedByIcon}
//                 style={{width:100,height:100}}
//                 />
//                 </View>
//                 <View style={styles.modalIconContainer}>
//                 <Text style={{fontSize: 22, color: '#5A5A5A'}}>{modalItemReturn?.borrowedByName}</Text>
//                 </View>
//                 <View style={styles.modalTextContainer}>
//                 <Text style={{marginVertical: 5, fontSize: 17, color: '#5A5A5A', textAlign: 'center'}}>{"rate your experience with ".concat(modalItemReturn?.borrowedByName)}</Text>
//                 </View>
//                 <View style={{alignItems:'center'}}>
//                   <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
//                     <Pressable onPress={() => {handleStar(0);}}>
//                       <Image style={{height: 40, width: 40}} source={stars[0]}/>
//                     </Pressable>
//                     <Pressable onPress={() => {handleStar(1);}}>
//                       <Image style={{height: 40, width: 40}} source={stars[1]}/>
//                     </Pressable>
//                     <Pressable onPress={() => {handleStar(2);}}>
//                       <Image style={{height: 40, width: 40}} source={stars[2]}/>
//                     </Pressable>
//                     <Pressable onPress={() => {handleStar(3);}}>
//                       <Image style={{height: 40, width: 40}} source={stars[3]}/>
//                     </Pressable>
//                     <Pressable onPress={() => {handleStar(4);}}>
//                       <Image style={{height: 40, width: 40}} source={stars[4]}/>
//                     </Pressable>
//                   </View>
//                 </View>
//                 <View>
//                 <CheckBox
//                     center
//                     title='mark item as returned'
//                     iconRight
//                     checkedIcon={<Image source={require('../icons/checked.png')} style={{height:20, width:20}}/>}
//                     uncheckedIcon={<Image source={require('../icons/unchecked.png')} style={{height:20, width:20}}/>}
//                     checked={isReturnChecked}
//                     onPress={handleReturnChecked}
//                     textStyle={{fontSize: 15, lineHeight: 21, letterSpacing: 0.25, color: '#5A5A5A'}}
//                     containerStyle = {styles.modalIconContainer}
//                   />
//                 </View>
//                 <View style={{flexDirection: 'row', gap:'90%'}}>
//                   <Pressable style={styles.modalTextContainer} onPress={handleReportModal}>
//                 <Text style={{marginVertical: 5, fontSize: 17, color: '#e60000', textAlign: 'center'}}>report user</Text>
//                 </Pressable>
//                 <Pressable style={styles.doneContainer} onPress={handleReturnModal}>
//                 <Text style={{marginVertical: 5, fontSize: 17, color: '#5A5A5A', textAlign: 'center'}}>submit</Text>
//                 </Pressable>
//                 </View>
//             </View>
//             <Modal isVisible={isReportModalVisible}>
//             <View style={styles.reportModalStyle}>
//                 <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={() => {handleReportModal();}}>
//                     <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
//                   </Pressable>
//                   <View style={styles.modalTextContainer}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>what would you like to report?</Text>
//                   </View>
//                   <View style={styles.modalTextContainer}>
//                   <SelectList 
//                     setSelected={(val) => setReportReason(val)} 
//                     data={reportOptions} 
//                     save="value"
//                     placeholder="select reason for report"
//                     search={false}
//                   />
//                   </View>
//                   <View style={styles.modalTextContainer}>
//                   <TextInput
//                     style={{height: 100, backgroundColor: 'white', width: '90%', padding:5, borderRadius: 10, borderColor: '#5A5A5A', borderWidth: 1}}
//                     placeholder="(optional) leave a comment to explain"
//                     onChangeText={(val) => {setReportComment(val)}}
//                     value={reportComment}
//                     multiline={true}
//                     numberOfLines={5}
//                     keyboardType="default"
//                     returnKeyType="done"
//                     blurOnSubmit={true}
//                     onSubmitEditing={()=>{Keyboard.dismiss()}}
//                   />
//                   </View>
//                   <Pressable style={styles.modalButtonContainer} onPress={handleReportModal}>
//                     <Text style={{fontSize: 19, color: '#5A5A5A'}}>submit</Text>
//                   </Pressable>
//             </View>
//           </Modal> 
//         </Modal> 
//         <Modal isVisible={isDeleteModalVisible}>
//             <View style={styles.modalStyle}>
//                 <Pressable style={{paddingLeft: '90%', paddingTop: '3%'}} onPress={handleDeleteModal}>
//                     <Image source={require('../icons/close.png')} style={{height:20, width:20}}/>
//                   </Pressable>
//                 <View>
//                 <CheckBox
//                     center
//                     title='Remove item from closet'
//                     iconRight
//                     checkedIcon={<Image source={require('../icons/deletechecked.png')} style={{height:20, width:15}}/>}
//                     uncheckedIcon={<Image source={require('../icons/deleteunchecked.png')} style={{height:20, width:15}}/>}
//                     checked={isDeleteChecked}
//                     onPress={handleDeleteChecked}
//                     textStyle={{fontSize: 15, lineHeight: 21, letterSpacing: 0.25, color: '#5A5A5A'}}
//                     containerStyle ={{backgroundColor: 'transparent', borderColor: 'transparent', paddingTop:'10%', paddingBottom:'10%'}}
//                   />
//                 </View>
//             </View>
//         </Modal> 
//     <ScrollView>
//         <View style={styles.closetContainer}>
//             <Text style={styles.closetHeader}>My Closet</Text>
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             {myCloset.map((item) => (
//               <View key={item.id} style={{marginTop: 12, flex: 1, padding: 5}}>
//                 <Pressable onPress={() => {
//                   setModalItemDelete(item)
//                   handleDeleteModal();
//                   }
//                 }>
//                   <Image
//                   source={item.source}
//                   style={{
//                     height: 120,
//                     alignSelf: 'stretch',
//                     width: 120,
//                     borderRadius: 7,
//                   }}
//                   resizeMode="cover"
//                 />
//                 </Pressable>
//               </View>         
//             ))}
//             </ScrollView>
//         </View>
//         <View style={styles.closetContainer}>
//             <Text style={styles.closetHeader}>Borrowed</Text>
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             {beingBorrowed.map((item) => (     
//               <View key={item.id} style={{marginTop: 12, flex: 1, padding: 5}}>
//               <Pressable onPress={() => {
//                   setModalItemReturn(item)
//                   handleReturnModal();
//                 }
//               }>
//                 <Image
//                 source={item.source}
//                 style={{
//                   height: 120,
//                   alignSelf: 'stretch',
//                   width: 120,
//                   borderRadius: 7,
//                 }}
//                 resizeMode="cover"
//               />
//               </Pressable>
//             </View>     
//             ))}
//             </ScrollView>
//         </View>
//         <View style={styles.closetContainer}>
//             <Text style={styles.closetHeader}>Borrowing</Text>
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             {borrowing.map((item) => (
//                 <View key={item.id} style={styles.imageContainer}>
//                     <Image style={styles.image} source={item.source}/>
//                 </View>            
//             ))}
//             </ScrollView>
//         </View>
//     </ScrollView>
//   </View>}
//   </View>
// )