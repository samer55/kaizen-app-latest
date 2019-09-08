import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    Alert,
    ScrollView,Share,
    Image,
ImageBackground,
    TouchableOpacity,
    Dimensions,
    Animated
} from "react-native";
import { PricingCard } from 'react-native-elements';

import { Container, Header, Content, List, ListItem, Form,Textarea,Thumbnail, Left, Body, Right, Button } from 'native-base';
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
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { Rating, AirbnbRating } from 'react-native-elements';

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

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class NewQuote extends Component {
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
    selected: '',isDateTimePickerVisible: false,selectedDate: "",feed:'',rating:1,author:'',
  }
  showActionSheet = () => {
     this.ActionSheet.show()
   }
   showActionSheet2 = () => {
      this.ActionSheets.show()
    }
    onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  _simpleAlertHandler=()=>{
   //function to make simple alert
   alert('Published');
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
     showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };

      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };

      handleDatePicked = date => {
     Moment.locale('en');
    var dt = date;

        this.setState({ selectedDate: Moment(dt).format("h:mm A") });
        this.hideDateTimePicker();
      };
      goals = () => {
        this.setState({
          postStatus: 'Posting...',
        })


              const uid = this.props.appStore.uid
              const name = this.props.appStore.username
      const title =this.state.title
      const newPostKey = firebaseApp.database().ref('Quote/').push().key

                const postData = {
                  uid: uid,
                  name:name,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
                  status: "available",
                  puid:newPostKey,
                  clientId: "",
                  clientName: "",
                  new_messages: 0,
                  feed:this.state.feed,
                  author:this.state.author,
                }
                let updates = {}

                updates['Quote/' ] = postData

                firebaseApp.database().ref().update(updates)
                .then(() => {
                  this.setState({
                                  postStatus: 'Created! Thank You.',
                                  feed: '',
                                  author:'',
                                  rating:2,
                                })


                  setTimeout(() => {
                      this._simpleAlertHandler()
                  }, 2000)
                })
                .catch(() => {
                  this.setState({ postStatus: 'Something went wrong!!!' })
                })

              .catch(error => {
                console.log(error)
              })



      }



    render() {
      const { isDateTimePickerVisible, selectedDate } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 ,marginTop: 30,}}>
                <Content padder>
                         <Form>
                           <Textarea rowSpan={5}
                           value={this.state.feed}
 onChangeText={tweet => this.setState({ feed: tweet })}
                            bordered placeholder="New Quote.." />
                            <Textarea rowSpan={2}
                            value={this.state.author}
  onChangeText={tweet => this.setState({ author: tweet })}
                             bordered placeholder="Author.." />
                         </Form>

             <Button onPress={this.goals} primary bordered style={{justifyContent:'center',alignItems: 'center',padding: 25,alignSelf: 'center',margin: 10}}  >
<Text style={{color:'#4286f4'}}>
             Send it
             </Text>
             </Button>
                       </Content>
                </View>
            </SafeAreaView>
        );
    }
}
export default NewQuote;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
