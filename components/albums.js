import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,ListView,
    ScrollView,
    Image,
ImageBackground,
    TouchableOpacity,
    Dimensions,
    Animated
} from "react-native";
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
const options = [
  'Cancel',
  'Calculus',
'Chemistry',
  'Physics',
    'C++',

]
import { LinearGradient } from 'expo-linear-gradient';

import RoundedButton from './buttons/RoundedButton';
import NavBarButton from './buttons/NavBarButton';
import Notification from './Notification';
import Spinner from 'react-native-loading-spinner-overlay';
import Lightbox from 'react-native-lightbox';

export const transparentHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
};
export const colors= {
  black: '#000000',
  lightBlack: '#484848',
  white: '#ffffff',
  green01: '#008388',
  green02: '#02656b',
  darkOrange: '#d93900',
  lightGray: '#d8d8d8',
  pink: '#fc4c54',
  gray01: '#f3f3f3',
  gray02: '#919191',
  gray03: '#b3b3b3',
  gray04: '#484848',
  gray05: '#dadada',
  gray06: '#ebebeb',
  gray07: '#f2f2f2',
  brown01: '#ad8763',
  brown02: '#7d4918',
  blue: '#4995cd',
};
const buttonSize = 60;
const buttonWrapperPadding = 0;
import _ from 'lodash'

const options1 = [
  'Cancel',
  'عربي 101',
'English 101',
  'وطنية',
    'ثقافة اعلامية',
    'مهارات تواصل فعال',
'لياقة',
]
import Icon from 'react-native-vector-icons/FontAwesome';
import Category from '../components/Explore/Category'
import Tag from '../components/Explore/Tag'
import Home from '../components/Explore/Home'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import {  Constants } from 'expo';
import uuid from 'uuid';
const { width: WindowWidth } = Dimensions.get('window');
import firebase from 'firebase'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
 async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
@inject("appStore") @observer

class Albums extends Component {
  static navigationOptions = ({ navigation }) => ({

     headerLeft: <NavBarButton
       handleButtonPress={() => navigation.goBack()}
       location="left"
       icon={<Icon name="angle-left" color={colors.lightBlack} size={30} />}
     />,
     headerStyle: transparentHeaderStyle,
     headerTransparent: true,
     headerTintColor: colors.lightBlack,
   });

  state = {
    selected: '',title:this.props.navigation.state.params.title,
    puids:this.props.navigation.state.params.puids,
     dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
     dataSources: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),

    counter: 1, image: null,
     result: null,
     uploading: false,spinner: false,
     imagePath: null,
 imageHeight: null,
 imageWidth: null,

       isLoading: true,puid:'',
       isEmpty: false,  dataSource1: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
       isFinished: false,
    edit:"",
  }
  showActionSheet = () => {
     this.ActionSheet.show()
   }
   showActionSheet2 = () => {
      this.ActionSheets.show()
    }


    get gradient () {
        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }
    _handleImagePicked = async pickerResult => {
      try {
        this.setState({ uploading: true });

        if (!pickerResult.cancelled) {
          uploadUrl = await uploadImageAsync(pickerResult.uri);
          this.setState({ image: uploadUrl });
          this.create()
        }
      } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
        this.setState({ uploading: false, spinner: false });

      } finally {
        this.setState({ uploading: false });
      }
    };
    _pickImage = async () => {
      console.log("---- iamge picker ---- ")

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this.setState({
             spinner: true
           });
      this._handleImagePicked(pickerResult);
    };
    componentWillMount() {

        this.scrollY = new Animated.Value(0)

        this.startHeaderHeight = 80
        this.endHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
            this.endHeaderHeight = 70 + StatusBar.currentHeight
        }

        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [this.startHeaderHeight, this.endHeaderHeight],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        this.animatedTagTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [-30, 10],
            extrapolate: 'clamp'
        })
        this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [50, 30],
            extrapolate: 'clamp'
        })


    }
  async  componentDidMount() {
      const uid = this.props.appStore.uid
      const name = this.props.appStore.username
   const puid =this.state.puids
   console.log("---- puid ---- "+ this.state.puids)

        firebaseApp.database().ref('albums/'+ `/${name}/` + `/${uid}/` +`/${puid}/` +'/img/' ).on('value',
        (snapshot) => {
          console.log("---- TIMELINE POST RETRIEVED ---- "+ this.state.counter +" - "+ _.toArray(snapshot.val()).length)
          if (snapshot.val()) {
            this.setState({ isEmpty: false })
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(_.reverse(_.toArray(snapshot.val()))) })
          }
          else {
            this.setState({ isEmpty: true })
          }
          this.setState({ isLoading: false })
        })
        firebaseApp.database().ref('SAVED/').orderByChild('uid').equalTo(this.props.appStore.uid).on('value',
        (snapshot) => {
          console.log("---- TIMELINE POST RETRIEVED ---- "+ this.state.counter +" - "+ _.toArray(snapshot.val()).length)
          if (snapshot.val()) {
            this.setState({ saved: true })
            this.setState({ dataSources: this.state.dataSources.cloneWithRows(_.reverse(_.toArray(snapshot.val()))) })
          }
          else {
            this.setState({ isEmpty: true })
          }
          this.setState({ isLoading: false })
        })
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
      }
    handlePress = (buttonIndex) => {

       if(buttonIndex === 1){
           this.props.navigation.navigate('subpage', {sub: 'Arabic 101'}) ;
     }

        else if(buttonIndex === 2)
           this.props.navigation.navigate('subpage', {sub: 'English 101'})
          else if(buttonIndex === 3)
             this.props.navigation.navigate('subpage', {sub: 'وطنية'})
            else if(buttonIndex === 4)
               this.props.navigation.navigate('subpage', {sub: 'ثقافة اعلامية'})
               else if(buttonIndex === 5 )
                  this.props.navigation.navigate('subpage', {sub: 'مهارات تواصل'})
                  else if(buttonIndex === 6)
                     this.props.navigation.navigate('subpage', {sub: 'لياقة'})
               else
               return null
     }
     handlePress1 = (buttonIndex) => {
        this.setState({ selected: buttonIndex })
        if(buttonIndex === 1){
            this.props.navigation.navigate('subpage', {sub: 'Calculus'}) ;
        this.setState({ selecteds: buttonIndex })
      }

         else if(buttonIndex === 2)
            this.props.navigation.navigate('subpage', {sub: 'Chemistry'})
           else if(buttonIndex === 3)
              this.props.navigation.navigate('subpage', {sub: 'Physics'})
             else if(buttonIndex === 4)
                this.props.navigation.navigate('subpage', {sub: 'C++'})
                else
                return null
      }
    render() {
      const images =  this.state.isEmpty   ? <View>
          <Image  style={{alignSelf: 'center',margin: 10,width: 200,height:200 }} borderRadius={15} source={require("../assets/empty.png")} />
          <Text style={{fontSize: 27,fontWeight: 'bold',alignSelf: 'center',margin: 10}}>
            You don't have any image yet.
          </Text>

        </View>
          :
          <ListView
                automaticallyAdjustContentInsets={false}
                initialListSize={1}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow1}
              />;
              const quotes = !this.state.saved && this.state.title === 'Saved'? <View>
                <Image  style={{alignSelf: 'center',margin: 10,width: 200,height:200 }} borderRadius={15} source={require("../assets/empty.png")} />
                <Text style={{fontSize: 27,fontWeight: 'bold',alignSelf: 'center',margin: 10}}>
                  You don't have any Saved Quote.
                </Text>

              </View>
                :
                <ListView
                      automaticallyAdjustContentInsets={false}
                      initialListSize={1}
                      dataSource={this.state.dataSources}
                      renderRow={this._renderRow12}
                    />
       { this.gradient }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 ,marginTop: 30,}}>
                <Spinner
                         visible={this.state.spinner}

                       />
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                {this.state.title}
                            </Text>
                            <Button primary
onPress={this._pickImage}
                             bordered style={{justifyContent:'center',alignItems: 'center',padding: 25}} >
                    <Text style={{color:'#4286f4'}}> Add image</Text>
                            </Button>
</View>
<View style={{justifyContent:'center',alignItems:'center', paddingTop: 20 }}>
                                <ScrollView
                                >
                                  <ActionSheet
            ref={o => this.ActionSheet = o}
            title={<Text style={{color: '#000', fontSize: 18}}>Which one do you like?</Text>}
            options={options}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
           onPress={this.handlePress1}
          />
          <ActionSheet
ref={o => this.ActionSheets = o}
title={<Text style={{color: '#000', fontSize: 18}}>Which one do you like?</Text>}
options={options1}
cancelButtonIndex={0}
destructiveButtonIndex={5}
onPress={this.handlePress}
/>


                                  { images
                                    }


                                </ScrollView>
                            </View>

</View>


                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
    _renderRow1 = (data, sectionID, rowID) => {
   //console.log("TIMELINE :::: _renderRow " + data.title)

   return (
     <Lightbox underlayColor="white" style={{alignSelf: 'center'}}>

     <ImageBackground
       source={{uri:data.image}}
       borderRadius={20}  style={{ width:width,height:700, resizeMode: 'contain',marginBottom:10}}           >

     </ImageBackground>
     </Lightbox>
   )
 }
 _renderRow12 = (data, sectionID, rowID) => {
//console.log("TIMELINE :::: _renderRow " + data.title)

return (
  <LinearGradient
    colors={['#bdc3c7', '#2c3e50']} style={{height: 200,width: width-10,padding: 20,borderRadius: 13,alignSelf: 'center',marginTop: 10,marginBottom: 10}} >
  <View style={{flex:1,justifyContent: 'center',alignItems: 'flex-start'}}>
  <Text style={{fontSize: 20,fontWeight: '600',color: '#fff'}}>{data.feed}</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'flex-end'}}>
  <Text style={{fontSize: 17,color: '#fff'}}>{data.author}</Text>
  </View>
  </LinearGradient>
)
}
    create = () => {
      this.setState({
        postStatus: 'Posting...',
      })
      const uid = this.props.appStore.uid
      const imageName = `${uid}.jpg`
      const name = this.props.appStore.username

const puid = this.state.puids
      const newPostKey = firebaseApp.database().ref('albums/'+ `/${name}/` + `/${uid}/` +`/${puid}/` +'/img/').push().key

              const postData = {
                uid: uid,


                status: "available",
                clientId: "",
                clientName: "",
                new_messages: 0,

                 image: this.state.image,

              }
              let updates = {}

              updates['albums/'+ `/${name}/` + `/${uid}/` +`/${puid}/` +'/img/' +newPostKey ] = postData

              firebaseApp.database().ref().update(updates)
              .then(() => {
                this.setState({
                            image:null,
                                imagePath: null,
                                spinner:!this.state.spinner
                              })


                setTimeout(() => {
                }, 1000)
              })
              .catch(() => {
                this.setState({ postStatus: 'Something went wrong!!!' })
              })

            .catch(error => {
              console.log(error)
            })



    }
}
export default Albums;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
