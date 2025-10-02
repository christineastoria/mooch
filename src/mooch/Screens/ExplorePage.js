import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View , Image, SafeAreaView, FlatList, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import * as React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { FAB } from '@rneui/themed';
import Modal from "react-native-modal";
import { useRoute } from "@react-navigation/native"



// interface Clothes {
//     source: string;
//     width: number;
//     hieght: number;
//     text: string;
//     id: string;
//   }

const all_clothes = [
    { source: require("../clothes_images/pinkpants.jpeg"),
        width: 160,
        height: 280,
        id: '1',
        text: 'I AM GIA (S)',
        tags: [{name: 'All', id: '0'}, {name: 'Bottoms', id: '1'}] },
    { source: require("../clothes_images/greenset.jpeg"),
        width: 160,
        height: 220,
        id: '2',
        text: 'SHIEN (S)',
        tags: [{name: 'All', id: '0'}, {name: 'Bottoms', id: '1'}, {name: 'Sets', id: '2'}, {name: 'Tops', id: '3'}]  },
    { source: require("../clothes_images/blueoneshouldertop.jpeg"),
        width: 160,
        height: 220,
        id: '3',
        text: 'LIONESS (M)',
        tags: [{name: 'All', id: '0'}, {name: 'Tops', id: '1'}]  },
    { source: require("../clothes_images/chainmailtop.jpeg"),
        width: 160,
        height: 220,
        id: '4',
        text: 'H&M (XS/S)' ,
        tags: [{name: 'All', id: '0'}, {name: 'Tops', id: '1'}] },
    { source: require("../clothes_images/greendress.jpeg"),
        width: 160,
        height: 280,
        id: '5',
        text: 'SHEIN (S)',
        tags: [{name: 'All', id: '0'}, {name: 'Dresses', id: '1'}]  },
    { source: require("../clothes_images/redscarftop.jpeg"),
        width: 160,
        height: 220,
        id: '6',
        text: 'PrincessPolly (6)' ,
        tags: [{name: 'All', id: '0'}, {name: 'Tops', id: '1'}] },
    { source: require("../clothes_images/swirltop.jpeg"),
        width: 160,
        height: 280,
        id: '7',
        text: 'Adika (S)',
        tags: [{name: 'All', id: '0'}, {name: 'Tops', id: '1'}]  },
    { source: require("../clothes_images/yellowbralette.jpeg"),
        width: 160,
        height: 280,
        id: '8',
        text: 'FreePeople (S)',
        tags: [{name: 'All', id: '0'}, {name: 'Tops', id: '1'}]  },
    { source: require("../clothes_images/denimtop.jpeg"),
        width: 160,
        height: 220,
        id: '9',
        text: 'Amazon (S)' ,
        tags: [{name: 'All', id: '0'}, {name: 'Tops', id: '1'}] },
    { source: require("../clothes_images/blackstrappydress.jpeg"),
        width: 160,
        height: 280,
        id: '10',
        text: 'TigerMist (S)' ,
        tags: [{name: 'All', id: '0'}, {name: 'Dresses', id: '1'}] }
];

const categories = [
  { text: 'All',
      id: '0' },
  { text: 'Tops',
      id: '1' },
  { text: 'Bottoms',
      id: '2' },
  { text: 'Dresses',
      id: '3' },
  { text: 'Accessories',
      id: '4' },
  { text: 'Sets',
      id: '5' },
  { text: 'Shoes',
      id: '6' }
]


function ExplorePage({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalItem, setModalItem] = React.useState(null);
  const [filterCategory, setFilterCategory] = React.useState('All');
  let clothes = all_clothes.filter(item => {
    return item.tags.some(tag => filterCategory === tag.name);    
  })
  const handleFilterCategory = ({item}) => {
  
    setFilterCategory(item.text);
};
  const handleModal = () => {
  
      setIsModalVisible(!isModalVisible);
  };
  const Item = ({item}) => (
      <View key={item.id} style={{marginTop: 12, flex: 1}}>
        <Pressable onPress={() => {
          setModalItem(item)
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
    return(
        <SafeAreaView style={styles.background}>
          <View style={styles.filterContainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {categories.map((item) => (
              <Pressable style={styles.filterButton} key={item.id} onPress={() => handleFilterCategory({item})}>
                <Text style={styles.filterText}>{item.text}</Text>
              </Pressable>
            ))}     
            </ScrollView>
          </View>
          <Modal isVisible={isModalVisible}>
                <View style={styles.modalStyle}>
                    <View>
                        <Image
                        source={modalItem?.source}
                        style={{
                            height: modalItem?.height,
                            alignSelf: 'stretch',
                            width: modalItem?.width,
                            borderRadius: 7,
                        }}
                        resizeMode="cover"
                        />
                        <Text>{modalItem?.text}</Text>
                        <Text>{modalItem?.washingPref}</Text>
                        <Button title="Hide modal" onPress={handleModal} />
                    </View>
                </View>
            </Modal>                 
            <MasonryList
            
                data={clothes}
                renderItem={({item}) => {
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
            onPress={() => navigation.navigate('Upload', {group: 'public'})}
        />
        </SafeAreaView>
    )
}


export default ExplorePage;

/* <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
<Image 
source={require("../icons/uploadicon.png")} 
style={styles.FloatingButtonStyle} />
</TouchableOpacity> */

const styles = StyleSheet.create({

background: {
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 0,
    margin: 0

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
  },
  filterButtonContainer: {
    height: 40,
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    border: 0

  }
});

// function ExplorePage({ navigation }) {
//     return(
//         <View>
//         <FAB
//             visible={true}
//             icon={{ name: 'add', color: 'white' }}
//             color="#e8def9"
//             placement="right"
//         />
//         <MasonryList
//             data={clothes}
//             renderItem={({item}) => <Item item={item} />}
//             keyExtractor={item => item.id}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             ListHeaderComponent={<View />}
//             contentContainerStyle={{
//             paddingHorizontal: 24,
//             alignSelf: 'stretch',
//             }}
//         />
//       </View>
//     )
// }

{/* <TouchableOpacity activeOpacity={0.5}>
<Image
    ssource={require("../icons/uploadicon.png")}
/>
onPress={() => navigation.navigate('Upload')}
</TouchableOpacity> */}

{/* <Button 
icon={
    <Icon
    name="arrow-right"
    size={15}
    color="white"
    />
}
buttonStyle = {{position: 'absolute', bottom:0, left:0}}
onPress={() => navigation.navigate('Create Account')}
/> */}
// return(
//     <SafeAreaView>
//         <FlatList
//         data={DATA}
//         renderItem={({item}) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//         />
//         <MasonryList
//             data={clothes}
//             renderItem={({item}) => <Item item={item} />}
//             keyExtractor={item => item.id}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             ListHeaderComponent={<View />}
//             contentContainerStyle={{
//             paddingHorizontal: 24,
//             alignSelf: 'stretch',
//             }}
//         />   
//     </SafeAreaView>     

{/* <View key={item.id} style={[{marginTop: 12, flex: 1}, style]}> */}

// const getRandomNumber = () => {
//     const randomNumber = Math.floor(Math.random() * 100) + 1;
//     setNumber(randomNumber);
// }

// const randomBool = useMemo(() => Math.random() < 0.5, []);

{/* <Image
source={item.source}
style={{
  height: randomBool ? 150 : 280,
  alignSelf: 'stretch',
}}
resizeMode="cover"
/> */}

// const light = {
//     background: '#FFFFFF',
//     paper: '#EAEBF4',
//     primary: '#393D7A',
//     accent: '#B446BF',
//     link: '#393D7A',
//     heading: '#393D7A',
//     titleText: '#000000',
//     subText: '#404040',
//     text: '#000000',
//     textContrast: '#D3D8E8',
//     disabled: colors.mediumGray,
//     border: '#EDEDED',
//     placeholder: '#999999',
//   };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//       backgroundColor: '#f9c2ff',
//       padding: 20,
//       marginVertical: 8,
//       marginHorizontal: 16,
//     },
//     title: {
//       fontSize: 32,
//     },
//   });

// const DATA = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'First Item',
//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       title: 'Second Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: 'Third Item',
//     },
//   ];
  
  
  
// const Item = ({title}) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
  
//   const App = () => {
//     return (
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           data={DATA}
//           renderItem={({item}) => <Item item={item.title} />}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//         />
//       </SafeAreaView>
//     );
//   };
  

// return(
//     <View>
//         <MasonryList
//             data={clothes}
//             keyExtractor={(item, index): string => index.toString()}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             renderItem={({item}) => <CardItem />}
//             refreshing={isLoadingNext}
//             onRefresh={() => refetch({first: ITEM_CNT})}
//             onEndReachedThreshold={0.1}
//             onEndReached={() => loadNext(ITEM_CNT)}
//         />        
//     </View>
// )

//