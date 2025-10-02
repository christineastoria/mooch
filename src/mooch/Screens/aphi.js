import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable , ScrollView, KeyboardAvoidingView, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import React, {useState, useEffect} from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { FAB } from '@rneui/themed';
import { color } from 'react-native-reanimated';
import { useRoute } from "@react-navigation/native"
import { db, collection, getDocs, ref, storage, getDownloadURL, getMetadata, listAll} from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { CollectionsOutlined, LeakAddTwoTone } from '@mui/icons-material';

const categories = [
  {key:'0', value:'all'},
  {key:'1', value:'tops'},
  {key:'2', value:'bottoms'},
  {key:'3', value:'dresses'},
  {key:'4', value:'accessories'},
  {key:'5', value:'sets'},
  {key:'6', value:'shoes'},
]

const heights = [280, 220];

let full_clothes = [
    { source: require("../clothes_images/denimtop.jpeg"),
    width: 160,
    key:1,
    height: heights[Math.floor(Math.random()*heights.length)],
    id: '9',
    text: 'Amazon (S)' ,
    tags: [{name: 'all', id: '0', key:1}, {name: 'tops', id: '1', key:2}] },
  { source: require("../clothes_images/blackstrappydress.jpeg"),
    width: 160,
    key:2,
    height: heights[Math.floor(Math.random()*heights.length)],
    id: '10',
    text: 'TigerMist (S)' ,
    tags: [{name: 'all', id: '0', key:1}, {name: 'dresses', id: '1', key:2}] },
  { source: require("../clothes_images/blueoneshouldertop.jpeg"),
      width: 160,
      key:3,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '3',
      text: 'LIONESS (M)',
      tags: [{name: 'all', id: '0', key:1}, {name: 'tops', id: '1', key:2}]  },
  { source: require("../clothes_images/chainmailtop.jpeg"),
      width: 160,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '4',
      key:4,
      text: 'H&M (XS/S)' ,
      tags: [{name: 'all', id: '0', key:1}, {name: 'tops', id: '1', key:2}] },
  { source: require("../clothes_images/greendress.jpeg"),
      width: 160,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '5',
      key:5,
      text: 'SHEIN (S)',
      tags: [{name: 'all', id: '0', key:1}, {name: 'dresses', id: '1', key:2}]  },
  { source: require("../clothes_images/redscarftop.jpeg"),
      width: 160,
      key:6,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '6',
      text: 'PrincessPolly (6)' ,
      tags: [{name: 'all', id: '0', key:1}, {name: 'tops', id: '1', key:2}] },
  { source: require("../clothes_images/swirltop.jpeg"),
      width: 160,
      key:7,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '7',
      text: 'Adika (S)',
      tags: [{name: 'all', id: '0', key:1}, {name: 'tops', id: '1', key:2}]  },
  { source: require("../clothes_images/yellowbralette.jpeg"),
      width: 160,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '8',
      key:8,
      text: 'FreePeople (S)',
      tags: [{name: 'all', id: '0', key:1}, {name: 'tops', id: '1', key:2}]  },
      { source: require("../clothes_images/pinkpants.jpeg"),
      width: 160,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '1',
      key:9,
      text: 'I AM GIA (S)',
      tags: [{name: 'all', id: '0', key:1}, {name: 'bottoms', id: '1', key:2}] },
  { source: require("../clothes_images/greenset.jpeg"),
      width: 160,
      height: heights[Math.floor(Math.random()*heights.length)],
      id: '2',
      key:10,
      text: 'SHIEN (S)',
      tags: [{name: 'all', id: '0', key:1}, {name: 'bottoms', id: '1', key:2}, {name: 'sets', id: '2', key:3}, {name: 'tops', id: '3', key:4}]  },
];

//bluedress.jpeg

// const all_clothes = [
//   { source: require("../clothes_images/swirltop.jpeg"),
//       width: 160,
//       height: 220,
//       id: '7',
//       text: 'Adika (S)', 
//       clothingType: 'Shirt',
//       washingPref: 'I wash it after you return it' ,
//       tags: [{name: 'all', id: '0'}, {name: 'tops', id: '1'}] },
//   { source: require("../clothes_images/denimtop.jpeg"),
//       width: 160,
//       height: 280,
//       id: '9',
//       text: 'Amazon (S)' ,
//       tags: [{name: 'all', id: '0'}, {name: 'tops', id: '1'}]  },
//   { source: require("../clothes_images/blackstrappydress.jpeg"),
//       width: 160,
//       height: 280,
//       id: '10',
//       text: 'TigerMist (S)',
//       tags: [{name: 'all', id: '0'}, {name: 'dresses', id: '1'}]   }
// ];

// const reference = storage();

// type ItemData = {
//   imageName: string;
//   source: string;
//   width: number;
//   height: number;
//   id: string;
// };

const cleaning_prefs = [
  {label: 'machine wash before returning', value: 'machine wash', key:1},
  {label: 'hand wash before returning', value: 'hand wash', key:2},
  {label: 'dry clean before returning', value: 'dry clean', key:3},
  {label: 'return without cleaning', value: 'no clean ', key:4},
]


function Aphi({ navigation }) {
    const all_clothes = full_clothes.map((item) => {
      item.cleaningPref = cleaning_prefs[Math.floor(Math.random()*cleaning_prefs.length)];
      return item;
    })
    console.log(all_clothes)
    const group = 'Aphi';
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [clothes, setClothes] = useState(all_clothes);
    const [startDate, setstartDate] = React.useState(''); //these variables get populated with startDate and endDate!
    const [endDate, setendDate] = React.useState('');
    const [isUploadVisible, setIsUploadVisible] = React.useState(false);
    const [modalItemTags, setModalItemTags] = useState(null);

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
    const [typeItems, setTypeItems] = useState(cleaning_prefs);

    const handleUploadVisible = () => {
      setIsUploadVisible(!isUploadVisible);
    }


    const auth = getAuth();
    const user = auth.currentUser;

    // https://github.com/mmazzarolo/react-native-modal-datetime-picker
    const [isTimePickerVisibleStart, setTimePickerVisibilityStart] = useState(false);

    const [isTimePickerVisibleEnd, setTimePickerVisibilityEnd] = useState(false);

    const showTimePickerStart = () => {
      setTimePickerVisibilityStart(true);
    };
    const showTimePickerEnd = () => {
      setTimePickerVisibilityEnd(true);
    };
    const hideTimePickerStart = () => {
      setTimePickerVisibilityStart(false);
    };
    const hideTimePickerEnd = () => {
      setTimePickerVisibilityEnd(false);
    };
    const handleConfirmStart = (date) => {
      hideTimePickerStart();
      setstartDate(date)
      console.warn("A start date has been picked: ", startDate); // datetime format
    };
    const handleConfirmEnd = (date) => {
      hideTimePickerEnd();
      setendDate(date)
      console.warn("An end date has been picked: ", endDate); // datetime format
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [7, 3],
        quality: 1,
      });  
      if (!result.canceled) {
        // console.log(result);
        setImage(result.assets[0].uri);
      }
    };
      
    // let all_clothes = [];
    // const heights = [280, 220];

    // useEffect(() => {
    //   const imagesRef = ref(storage, 'groupImages/'+group);
    //   listAll(imagesRef)
    //     .then((res) => {
    //       setClothes([]);
    //       // let newClothes = [];
    //       res.items.forEach( async (imageRef) => {
    //         const imagePath = imageRef.fullPath;
    //         // console.log("imagePath", imagePath);
    //         const url = await getDownloadURL(ref(storage, imagePath));
    //         const metadata = await getMetadata(ref(storage, imagePath));
    //         // console.log("metadata", metadata)
    //         // .substring(0, url.lastIndexOf('.jpg')+4)
    //         const itemData = {
    //           id: imagePath.substring(imagePath.lastIndexOf('/') + 1),
    //           text: metadata.customMetadata?.brand + " (" + metadata.customMetadata?.size + ")",
    //           source: {uri : url} ,
    //           cleaningPref: metadata.customMetadata?.cleaningPref,
    //           owner: metadata.customMetadata?.owner,
    //           tags: metadata.customMetadata?.tags.split(","),
    //           width: 160,
    //           height: heights[Math.floor(Math.random()*heights.length)]
    //         };
    //         // newClothes.push(itemData);
    //         // console.log("imageRef", imageRef);
    //         if ((filterCategory == 'all') || itemData.tags.includes(filterCategory)) {
    //           setClothes(prev => [...prev, itemData]);
    //         }
    //       });
    //       // console.log("new cloths", newClothes);
    //       // setClothes(prev => [...prev]+newClothes);
    //     })
    //     .catch((error) => {
    //       console.log("error", error)
    //       // Uh-oh, an error occurred!
    //     });

    // }, []);

    // const getData = async () => {
    //   reference
    //     .ref('items')
    //   if (user) {
    //     let data = [];
    //     const q = await getDocs(collection(db, "groups", group, "posts"));
    //     q.forEach( async (doc) => {
    //       let newItem = doc.data();
    //       newItem.id = doc.id;
    //       newItem.width = 160;
    //       newItem.height = heights[Math.floor(Math.random()*heights.length)];
    //       newItem.text = newItem.brand + " (" + newItem.size + ")"
    //       console.log("newItem pre", newItem);
    //       const url = await getDownloadURL(ref(storage, newItem.imagePath))
    //       newItem.source = url
    //       data.push(newIem);
    //     });
    //     // all_clothes = all_clothes.concat(data);
    //     setClothes(data)
    //     // console.log("data", data);
    //   } else {
    //     console.log("user not signed in");
    //   }    
    // }
    // getData();

    // console.log("start")


    // const handleData = () => {
    //   const getData = async () => {
    //     if (user) {
    //       // const q = query(collection(db, "cities"), where("capital", "==", true)); -> can try this for filtering
    //       // let data = [];
    //       const q = await getDocs(collection(db, "groups", group, "posts"));
    //       q.forEach( async (doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         let newItem = doc.data();
    //         newItem.id = doc.id;
    //         // newItem.source = do something here
    //         newItem.width = 160;
    //         newItem.height = heights[Math.floor(Math.random()*heights.length)];
    //         newItem.text = newItem.brand + " (" + newItem.size + ")"
    //         console.log("newItem pre", newItem);
    //         // const url = await getDownloadURL(ref(storage, newItem.imagePath));
    //         // newItem.source = url
    //         const url = await getDownloadURL(ref(storage, newItem.imagePath))
    //           // .then((url) => {
    //           //   console.log("url", url)
    //           //   newItem["source"] = url
    //           // })
    //           // .catch((error) => {
    //           //   console.log("error getting image url:", error);
    //           // })
    //         newItem.source = url
    //         // console.log("newItem", newItem);
    //         // data.push(newItem);
    //         // console.log("pre data", data);
    //         all_clothes.push(newIem);
  
    //       });
    //       all_clothes = all_clothes.concat(data);
    //       // console.log("data", data);
    //     } else {
    //       console.log("user not signed in");
    //     }    
    //   }
    //   getData();
    // }



    // handleData();
    // console.log("all clothes", all_clothes);

    // let clothes = all_clothes.filter((item) => {
    //   return item.tags.some(tag => filterCategory === tag.name);    
    // })

    // console.log("clothes", clothes)
    const handleFilterCategory = ({item}) => {
      let filterName = item.value
      setFilterCategory(filterName);
      console.log("filtername", filterName)
      console.log("clothes", clothes)
      let filteredClothes = full_clothes.filter((e) => {
        console.log("e", e)
        return e.tags.some(tag => filterName === tag.name);    
      })
      console.log("filtered",filteredClothes);
      setClothes(filteredClothes);
  };
    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleUpload = () => {
      let newItem = { source: require("../clothes_images/bluedress.jpeg"),
        width: 160,
        height: heights[Math.floor(Math.random()*heights.length)],
        id: '11',
        text: 'Lioness (M)',
        key:11,
        tags: [{name: 'all', id: '0'}, {name: 'dresses', id: '1'}],
        cleaningPref:  {label: 'hand wash before returning', value: 'hand wash'}};
        full_clothes.unshift(newItem);
        setClothes(prev => [newItem, ...prev]);
        setIsUploadVisible(false);
    }


    const Item = ({item}) => (
        <View key={item.id} style={{marginTop: 12, flex: 1}}>
          <Pressable onPress={() => {
            let itemTagsTemp = item.tags.filter((e) => {
              return e.name != 'all';
            })
            let itemTags = itemTagsTemp.map((e) => {
              return e.name;
            })
            setModalItem(item);
            setModalItemTags(itemTags);
            handleModal();
            }
          }>
            <Image
            source={item.source}
            style={{
              height: item.height,
              marginLeft:15,
              marginRight: 5,
              alignSelf: 'stretch',
              width: item.width,
              borderRadius: 7,
            }}
            resizeMode="cover"
          />
          </Pressable>
          <Text
            style={{
              marginTop: 8,
              color: '#5A5A5A',
              textAlign: 'center'
            }}
          >
            {item.text}
          </Text>
        </View>
      );

    console.log(categories)
    return(
        <SafeAreaView style={styles.background}>
          <View style={styles.filterContainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {categories.map((item) => (
              <Pressable style={styles.filterButton} key={item.id} onPress={() => handleFilterCategory({item})}>
                <Text style={styles.filterText}>{item.value}</Text>
              </Pressable>
            ))}     
            </ScrollView>
           </View> 
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalStyle}>
                    <>
                        <Image
                        source={modalItem?.source}
                        style={{
                            height: modalItem?.height * 1,
                            alignSelf: 'center',
                            width: modalItem?.width * 1,
                            borderRadius: 7,
                            borderColor: 'grey',
                        }}
                        resizeMode="cover"
                        />
                        <Text style={{ 
                                fontSize: 25,
                                color: '#5A5A5A', 
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                }}>{modalItem?.text}</Text>
                        <Text style={{fontSize: 15,
                                color: '#5A5A5A', 
                                alignSelf: 'center',}}><Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Type:</Text> {modalItemTags ? modalItemTags.toString() : ''}</Text>
                        <Text style={{fontSize: 15,
                                color: '#5A5A5A', 
                                alignSelf: 'center',}}><Text style={{ fontWeight: 'bold' }}>Clean preference:</Text> {modalItem?.cleaningPref?.label}</Text>
                        
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                          <DateTimePickerModal
                                  isVisible={isTimePickerVisibleStart}
                                  mode='date'
                                  onConfirm={handleConfirmStart}
                                  onCancel={hideTimePickerStart}
                                  isDarkModeEnabled={true}
                                />
                         <DateTimePickerModal
                                  isVisible={isTimePickerVisibleEnd}
                                  mode='date'
                                  onConfirm={handleConfirmEnd}
                                  onCancel={hideTimePickerEnd}
                                  isDarkModeEnabled={true}
                                />
                          <Button 
                                  buttonStyle= {{backgroundColor:  '#e8def9', 
                                  borderColor: '#f5dceb',
                                  width: '70%',
                                  borderWidth: 0,
                                  borderRadius: 15,       
                                  alignSelf: 'center',
                                  padding: 10,}} 
                              titleStyle={{ color:'#5A5A5A' }} 
                                  title="start date"
                                  onPress={showTimePickerStart}
                                  />
                        <Button 
                                  buttonStyle= {{backgroundColor:  '#e8def9', 
                                  borderColor: '#f5dceb',
                                  width: '70%',
                                  borderWidth: 0,
                                  borderRadius: 15,       
                                  alignSelf: 'center',
                                  padding: 10,}} 
                              titleStyle={{ color:'#5A5A5A' }} 
                                  title="end date"
                                  onPress={showTimePickerEnd}
                                  />
                        </View> 
                        
                        <Button buttonStyle={{backgroundColor:  '#e8def9', 
                                                borderColor: '#f5dceb',
                                                width: '50%',
                                                borderWidth: 0,
                                                borderRadius: 15,       
                                                alignSelf: 'center',
                                                padding: 10,}} 
                                            titleStyle={{ color:'#5A5A5A' }} 
                                            title="request" 
                                            onPress={handleModal} />
                        <Button buttonStyle={{borderWidth: 2,
                                                borderColor: '#e8def9',
                                                marginBottom: 10,
                                                width: '50%',
                                                borderRadius: 15,       
                                                alignSelf: 'center',
                                                }} 
                                            type='outline'
                                            titleStyle={{ color:'#5A5A5A' }} 
                                            title="go back" 
                                            onPress={handleModal} />
                    </>
                </View>
            </Modal>
            <Modal isVisible={isUploadVisible}>
              < KeyboardAvoidingView
                behavior="padding" 
                style={styles.uploadbackground}>
                <ScrollView Vertical={true} showsVerticalScrollIndicator={false} style = {{ width: '100%'}} nestedScrollEnabled={true}>
                  <Pressable style= {styles.uploadbutton} onPress={pickImage}>
                    <Text style={styles.uploadbuttonText}>upload an image from camera roll</Text>
                  </Pressable>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center', marginBottom:20}} />}
                <View style={{width: '100%', justifyContent: 'center', alignItems : 'center'}}>
                <MultipleSelectList 
                        setSelected={(val) => setSelectedTags(val)} 
                        data={categories} 
                        save="value"
                        label="Categories"
                        placeholder='select clothing type'
                  />
                  </View>
                    <TextInput
                    style={styles.uploadinput}
                    placeholder="item brand"
                    placeholderTextColor="#5A5A5A"
                    onChangeText={setBrand}
                    value={brand}
                    />
                    <TextInput
                    style={styles.uploadinput}
                    placeholder="item size"
                    placeholderTextColor="#5A5A5A"
                    onChangeText={setSize}
                    value={size}
                  />
                <DropDownPicker style= {styles.uploadinput}
                    open={typeOpen}
                    value={cleaningPref}
                    items={typeItems}
                    setOpen={setTypeOpen}
                    setItems={setTypeItems}
                    setValue={setCleaningPref}
                    placeholder="cleaning preference"
                    listMode="SCROLLVIEW"
                  />
                  <Pressable style= {styles.uploadbutton} onPress={handleUpload}>
                    <Text style={styles.uploadbuttonText}>upload</Text>
                  </Pressable>
                  <Pressable style= {styles.uploadbutton} onPress={handleUploadVisible}>
                    <Text style={styles.uploadbuttonText}>cancel</Text>
                  </Pressable>
                    </ScrollView>
                    </KeyboardAvoidingView>
            </Modal>
            <MasonryList
                data={clothes}
                renderItem={({item}) => {
                    // console.log(handleModal);
                    // console.log(isModalVisible);
                    // console.log(setIsModalVisible);
                    return <Item item={item} /> 
                }}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                  marginRight:15,
                  marginLeft:5,
                  alignSelf: 'stretch',
                  alignContent: 'stretch',
                  }}
            >
            </MasonryList>
            <FAB
            visible={true}
            icon={{ name: 'add', color: 'white' }}
            color="#e8def9"
            placement="right"
            onPress={handleUploadVisible}
        />
        </SafeAreaView>
    )
}

export default Aphi;


// //handle date confirmation
// const handleConfirm = (date) => {
//   console.warn("A date has been picked: ", date); // note that this time will have the current date associated with it
//   hideTimePicker();
// };

/* <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
<Image 
source={require("../icons/uploadicon.png")} 
style={styles.FloatingButtonStyle} />
</TouchableOpacity> */

const styles = StyleSheet.create({

background: {
    flex: 1,
    backgroundColor: 'white',
},
modalStyle: {
    height: '80%',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#f7f4fd',
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
},
modalText: {
    fontSize: 10,
    color: '#5A5A5A',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor:'transparent',
    padding:5,
    margin:5
  },

  filterText: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#5A5A5A',
  },
  uploadinput: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor:  '#f7f4fd', 
  },
  uploadbutton: {
    backgroundColor:  '#e8def9', 
    borderColor: '#f5dceb',
    marginBottom: 20,
    width: '50%',
    borderWidth: 0,
    borderRadius: 15,       
    alignSelf: 'center',
    margin: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
 },
 uplaodbuttonText: {
  color:'#5A5A5A', 
 },
uploadbackground: {
  height: '85%',
  backgroundColor: '#f7f4fd',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:10
 }
});