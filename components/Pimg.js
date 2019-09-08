import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native'
import { Button } from "react-native-elements";
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import PropTypes from 'prop-types';
import { Container, Header, Content, Form, Item, Input, Label,Picker,Icon,CheckBox } from 'native-base';
import { ImagePicker, Permissions, Constants } from 'expo';
import uuid from 'uuid';
const { width: WindowWidth } = Dimensions.get('window');
import firebase from 'firebase'

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
const url= 'gs://tuto-7416f.appspot.com/'
@inject("appStore") @observer
export default class Up extends Component {
  constructor(props) {
    super(props)
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    this.state = {
      init: true,
      errMsg: null,
      signUpSuccess: false,
      name: '',
      phone:'',
        info: '',
      email: '',
      skills:'',
      password: '',
      time1:'',
      loc:'',
      language: 'js',
modalIsVisible: false,
modalAnimatedValue: new Animated.Value(0),

      week1:'',
      week2:'',
      selected: undefined,
 selectedButton: null,
 selected1: undefined,
 image: null,
 result: null,
 uploading: false,
 ui:this.props.appStore.uid,

      labname:'',
      time2:'',
      uploadURL:'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png',
      imagePath: null,
  imageHeight: null,
  imageWidth: null,

      modalVisible: false,
    }
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  onValueChange1(value: string) {
    this.setState({
      selected1: value
    });
  }
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }
  _handlePressDone = () => {
     Animated.timing(this.state.modalAnimatedValue, {
       toValue: 0,
       duration: 150,
       useNativeDriver: true,
     }).start(() => {
       this.setState({ modalIsVisible: false });
     });
   };

   _handlePressOpen = () => {
     if (this.state.modalIsVisible) {
       return;
     }

     this.setState({ modalIsVisible: true }, () => {
       Animated.timing(this.state.modalAnimatedValue, {
         toValue: 1,
         duration: 200,
         useNativeDriver: true,
       }).start();
     });
   };
    _maybeRenderUploadingOverlay = () => {
      if (this.state.uploading) {
        return (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <ActivityIndicator color="#fff" animating size="large" />
          </View>
        );
      }
    };

      _maybeRenderModal = () => {
        if (!this.state.modalIsVisible) {
          return null;
        }

        const { modalAnimatedValue } = this.state;
        const opacity = modalAnimatedValue;
        const translateY = modalAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        });

        return (
          <View
            style={StyleSheet.absoluteFill}
            pointerEvents={this.state.modalIsVisible ? 'auto' : 'none'}>
            <TouchableWithoutFeedback onPress={this._handlePressDone}>
              <Animated.View style={[styles.overlay, { opacity }]} />
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                transform: [{ translateY }],
              }}>
              <View style={styles.toolbar}>
                <View style={styles.toolbarRight}>
                  <Button title="Done" onPress={this._handlePressDone} />
                </View>
              </View>
            <View style={{ width: WindowWidth, backgroundColor: '#ffffff' }}>
            <Button
                      onPress={this._pickImage}
                      title="Pick an image from camera roll"
                    />

                    <Button onPress={this._takePhoto} title="Take a photo" />
            </View>
            </Animated.View>
          </View>
        );
      };
    _maybeRenderImage = () => {
      let { image } = this.state;
      if (image) {
        return(  <View
            style={{
              width: 250,
              borderRadius: 3,
              elevation: 2,
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
              <Image source={{ uri: image}} style={{   borderColor: 'grey',
              borderRadius: 55,
              borderWidth: 3,
              height: 110,
              marginBottom: 15,
              width: 110,}} />
  </TouchableOpacity>
            </View>


          </View>)
      }
else if (!image) {

      return (
        <View
          style={{
            width: 250,
            borderRadius: 3,
            elevation: 2,
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
            <TouchableOpacity onPress={this._handlePressOpen}>
            <Image source={{ uri: 'https://cdn0.iconfinder.com/data/icons/basic-outline/64/icon-basic-set_12-camera-512.png' }} style={{   borderColor: 'grey',
            borderRadius: 55,
            borderWidth: 3,
            height: 110,
            marginBottom: 15,
            width: 110,}} />
</TouchableOpacity>
          </View>


        </View>
      );
    }
    };
    _takePhoto = async () => {
       let pickerResult = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         aspect: [4, 3],
       });

       this._handleImagePicked(pickerResult);
     };

     _pickImage = async () => {
       let pickerResult = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         aspect: [4, 3],
       });

       this._handleImagePicked(pickerResult);
     };

     _handleImagePicked = async pickerResult => {
       try {
         this.setState({ uploading: true });

         if (!pickerResult.cancelled) {
           uploadUrl = await uploadImageAsync(pickerResult.uri);
           this.setState({ image: uploadUrl });
         }
       } catch (e) {
         console.log(e);
         alert('Upload failed, sorry :(');
       } finally {
         this.setState({ uploading: false });
       }
     };
  render() {
    let { image } = this.state;

    return (
      <ScrollView>

      <View style={styles.container}>



      {this._maybeRenderImage()}

      {image}


      </View>
      </ScrollView>

    );
  }
  create = () => {
    this.setState({
      postStatus: 'Posting...',
    })


          const uid = this.props.appStore.uid

          const imageName = `${uid}.jpg`

            const postData = {
              uid: uid,
              name:this.state.name,

              status: "available",
              clientId: "",
              clientName: "",
              new_messages: 0,

               image: this.state.image,
              phone: this.state.phone,
              skills: this.state.skills,
              type:this.state.selected,
              edu:this.state.selected1,
              bio:this.state.bio,
            }
            let updates = {}

            updates['/users/' + uid] = postData

            firebaseApp.database().ref().update(updates)
            .then(() => {
              this.setState({
                              postStatus: 'Created! Thank You.',
                              phone: '',
                              skills: '',
                              name: '',
                              imagePath: null,
                            })
                            this.props.navigation.navigate('home')

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
      borderBottomColor: 'black',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:400,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:50,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }, overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  toolbarRight: {
    alignSelf: 'flex-end',
  },
});
