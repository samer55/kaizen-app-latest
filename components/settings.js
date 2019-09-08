import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
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
import RoundedButton from './buttons/RoundedButton';
import NavBarButton from './buttons/NavBarButton';
import Notification from './Notification';

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
import Up from '../components/Pimg'

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'
import {  Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import uuid from 'uuid';
const { width: WindowWidth } = Dimensions.get('window');

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
import Spinner from 'react-native-loading-spinner-overlay';

@inject("appStore") @observer

class Settings extends Component {
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
    selected: '',admin:'', image: null, spinner: false,
     result: null,
     uploading: false,
     imagePath: null,
 imageHeight: null,
 imageWidth: null,

  }
  showActionSheet = () => {
     this.ActionSheet.show()
   }
   showActionSheet2 = () => {
      this.ActionSheets.show()
    }
    _maybeRenderImage = () => {
      let { imagep } = this.state;
      if (imagep) {
        return(  <View
            style={{
              width: 250,
              borderRadius: 3,
              elevation: 2,
              alignSelf: 'center',
              justifyContent:'center',
              alignItems:'center'
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: 'rgba(0,0,0,1)',
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: 'hidden',
              }}>
              <TouchableOpacity onPress={this._pickImage}>
              <Image source={{ uri: imagep}} style={{   borderColor: 'grey',
              borderRadius: 55,
              borderWidth: 0.2,
              height: 110,
              marginBottom: 15,
              width: 110,}} />
  </TouchableOpacity>
            </View>


          </View>)
      }
    };

  async  componentDidMount() {

      firebaseApp.database().ref('users/'+ this.props.appStore.uid ).on('value',
      (snapshot) => {
        val = snapshot.val()
        if (snapshot.val()) {
          this.setState({
            admin:val.admin,
            first:val.first,
            last:val.last,
            email:val.email,
            phone:val.phone,
username:val.username,
imagep:val.imagep
          })
            console.log("--------- LOGGEDss  " + val.admin + " ---------"+this.props.appStore.uid)
        }

      })

      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);

    }


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
    create = () => {
      this.setState({
        postStatus: 'Posting...',
      })


            const uid = this.props.appStore.uid

            const imageName = `${uid}.jpg`

              const postData = {
                userId:uid,
                date:firebase.database.ServerValue.TIMESTAMP,
                phone:this.state.phone,
                username:this.state.username,
                imagep:this.state.image,
                first:this.state.first,
                last:this.state.last,
                  email:this.state.email,
                  admin:this.state.admin,
              }
              let updates = {}

              updates['users/' + uid] = postData

              firebaseApp.database().ref().update(updates)
              .then(() => {
                this.setState({
                                postStatus: 'Changed! Thank You.',
                                imagePath: null,
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
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 ,marginTop: 30,}}>

                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20,justifyContent:'center',alignItems:'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Settings
                            </Text>

<View style={{justifyContent:'center',alignItems:'center', paddingTop: 20 }}>
                                <ScrollView
                                >
                                {this._maybeRenderImage()}

                              {this.state.admin ?   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('NewQuote')}} style={{  ...Platform.select({
                                    ios:{
                                      shadowColor: "rgba(0, 0, 0, 0.3)",
                                      shadowOpacity: 0.5,
                                      shadowRadius: 3,
                                      shadowOffset: {
                                          height: 1,
                                          width: 1
                                      },
                                    },
                                    android:{
                                      elevation: 2
                                    }
                                  }),marginVertical: 10,width:width-20,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:20,alignSelf: 'center',borderWidth: 0.3,borderColor: '#dddddd'}} >
<Text style={{fontSize: 14}}>New Quote</Text>
                                </TouchableOpacity> : null}
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('profile')}} style={{  ...Platform.select({
                                    ios:{
                                      shadowColor: "rgba(0, 0, 0, 0.3)",
                                      shadowOpacity: 0.5,
                                      shadowRadius: 3,
                                      shadowOffset: {
                                          height: 1,
                                          width: 1
                                      },
                                    },
                                    android:{
                                      elevation: 2
                                    }
                                  }),marginVertical: 10,width:width-20,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:20,alignSelf: 'center',borderWidth: 0.3,borderColor: '#dddddd'}} >
                              <Text style={{fontSize: 14}}>Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Invite')}} style={{  ...Platform.select({
                                    ios:{
                                      shadowColor: "rgba(0, 0, 0, 0.3)",
                                      shadowOpacity: 0.5,
                                      shadowRadius: 3,
                                      shadowOffset: {
                                          height: 1,
                                          width: 1
                                      },
                                    },
                                    android:{
                                      elevation: 2
                                    }
                                  }),marginVertical: 10,width:width-20,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:20,alignSelf: 'center',borderWidth: 0.3,borderColor: '#dddddd'}} >
<Text style={{fontSize: 14}}>Invite Friend</Text>
                                </TouchableOpacity>

                              {this.state.admin ?    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Feeduser')}}  style={{  ...Platform.select({
                                    ios:{
                                      shadowColor: "rgba(0, 0, 0, 0.3)",
                                      shadowOpacity: 0.5,
                                      shadowRadius: 3,
                                      shadowOffset: {
                                          height: 1,
                                          width: 1
                                      },
                                    },
                                    android:{
                                      elevation: 2
                                    }
                                  }),marginVertical: 10,width:width-20,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:20,alignSelf: 'center',borderWidth: 0.3,borderColor: '#dddddd'}} >
<Text style={{fontSize: 14}}>Feedback</Text>
                                </TouchableOpacity>
  :
                              null}
                              {this.state.admin ?
                               <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Users')}} style={{  ...Platform.select({
                                    ios:{
                                      shadowColor: "rgba(0, 0, 0, 0.3)",
                                      shadowOpacity: 0.5,
                                      shadowRadius: 3,
                                      shadowOffset: {
                                          height: 1,
                                          width: 1
                                      },
                                    },
                                    android:{
                                      elevation: 2
                                    }
                                  }),marginVertical: 10,width:width-20,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:20,alignSelf: 'center',borderWidth: 0.3,borderColor: '#dddddd'}} >
<Text style={{fontSize: 14}}>Users</Text>
                                </TouchableOpacity>
                                :
                              null}


                                </ScrollView>
                            </View>

</View>


                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }

         _pickImage = async () => {
           let pickerResult = await ImagePicker.launchImageLibraryAsync({
             allowsEditing: true,
             aspect: [4, 3],
           });
           this.setState({
                  spinner: !this.state.spinner
                });
           this._handleImagePicked(pickerResult);
         };

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
           } finally {
             this.setState({ uploading: false });
           }
         };



}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
