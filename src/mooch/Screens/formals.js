import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import * as React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { FAB } from '@rneui/themed';

const clothes = [
    { source: require("../clothes_images/greendress.jpeg"),
        width: 160,
        height: 210,
        id: '5',
        text: 'SHEIN (S)' },
];


const Item = ({item}) => (
    <View key={item.id} style={{marginTop: 12, flex: 1}}>
      <Image
        source={item.source}
        style={{
          height: item.height,
          alignSelf: 'stretch',
          width: item.width,
          borderRadius: 7,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          marginTop: 8,
          color: '#000000',
        }}
      >
        {item.text}
      </Text>
    </View>
  );


function Formals({ navigation }) {
    return(
        <SafeAreaView style={styles.background}>
            <MasonryList
                data={clothes}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                paddingHorizontal: 24,
                alignSelf: 'stretch',
                }}
            />
            <FAB
            visible={true}
            icon={{ name: 'add', color: 'white' }}
            color="#e8def9"
            placement="right"
            onPress={() => navigation.navigate('Upload')}
        />
        </SafeAreaView>
    )
}


export default Formals;

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
  }
});