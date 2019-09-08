import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,ListView,
    StatusBar,
    ScrollView,
    Image,
   Keyboard,  TouchableWithoutFeedback ,
ImageBackground,
Modal,
    TouchableOpacity,
    Dimensions,
    Animated
} from "react-native";
import * as Expo from "expo";
import _ from 'lodash'
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "./Avatar";
import Colors from "./Colors";
import Constants from 'expo-constants';

const Container = styled.View`
  padding: 15px 10px;
  border-radius: 15px;
  border: ${props => (props.unread ? "1px solid #EBEBEB" : "0")};
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const AvatarColumn = styled.View`
  margin-right: 20px;
`;

const Column = styled.View``;

const UnreadNumber = styled.View`
  background-color: ${Colors.tintColor};
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 100px;
  border-radius: 10px;
  padding: 2px;
  margin-left: 10px;
`;

const UnreadNumberText = styled.Text`
  color: white;
  font-size: 12px;
`;

const NameTime = styled.Text`
  color: ${Colors.greyColor};
`;

const PreviewContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 26px;
`;

const PreviewText = styled.Text`
  font-weight: ${props => (props.unread ? "600" : "400")};
  margin-right: ${props => (props.unread ? "0px" : "10px")};
`;

const IconContainer = styled.View`
  height: 26px;
`;


import {  Header, Content, List, ListItem, Picker, Left, Body, Right, Button ,Card, CardItem,Fab , Thumbnail,
  Col,
  Row,
  Grid,

  Spinner,

Icon,
  Footer,
  Input,
  } from 'native-base';
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
const options = [
  'Cancel',
  'Apple',
  <Text style={{color: 'yellow'}}>Banana</Text>,
  'Watermelon',
  <Text style={{color: 'red'}}>Durian</Text>
]
import Category from '../components/Explore/Category'
import Tag from '../components/Explore/Tag'
import Home from '../components/Explore/Home'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { Rating, AirbnbRating } from 'react-native-elements';

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class Users extends Component {
  state = {
    selected: '',    selectedDate: "",     dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    counter: 1,
       isLoading: true,puid:'',
       isEmpty: false,
       isFinished: false,
    edit:"",
     modalVisible: false,
      modalVisible1: false,  isDateTimePickerVisible: false,goals:'',

       selected2: undefined
  }
  showDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: true });
   };

   hideDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: false });
   };
   componentDidMount() {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username
  const title =this.state.title

       console.log("--------- TIMELINE --------- " + name + uid + title)
       firebaseApp.database().ref('users/').on('value',
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
     }

   handleDatePicked = date => {
  Moment.locale('en');
 var dt = date;

     this.setState({ selectedDate: Moment(dt).format("MM/DD/YYYY h:mm A") });
     this.hideDateTimePicker();
   };

   setModalVisible1(visible) {
     this.setState({modalVisible1: visible});
   }

 setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }

  showActionSheet = () => {
     this.ActionSheet.show()
   }
    componentWillMount() {

        this.scrollY = new Animated.Value(0)

        this.startHeaderHeight = 120
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
       this.setState({ selected: buttonIndex })
     }
     onValueChange2(value: string) {
  this.setState({
    selected2: value
  });
}

    render() {
       const { isDateTimePickerVisible, selectedDate } = this.state;
        return (
          <Container
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
          <ListView
                automaticallyAdjustContentInsets={false}
                initialListSize={1}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
              />
          </Container>


        );
    }
    _renderRow = (data, sectionID, rowID) => {
   //console.log("TIMELINE :::: _renderRow " + data.title)
let delivered = false,
   readReceipt = false,
   unread = false,
   pendingRead = 0;
   var dates=<Moment format="DD MMM YYYY" element={Text}>{new Date(data.date)}</Moment>
   return (
     <TouchableWithoutFeedback>
       <Container unread={unread}>
         <AvatarColumn>
           <Avatar source={{uri:data.imagep}} />
         </AvatarColumn>
         <Column>
           <NameTime>{`${data.first} ${data.last} • ${Moment(data.date).format("MM/DD/YYYY")}`}</NameTime>
           <PreviewContainer>
             <PreviewText unread={unread}>{data.email}</PreviewText>
             {(delivered || readReceipt) && (
               <IconContainer>
                 <Ionicons
                   name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
                   color={delivered ? Colors.tintColor : Colors.greyColor}
                   size={Platform.OS === "ios" ? 28 : 20}
                 />
               </IconContainer>
             )}
           </PreviewContainer>
         </Column>



       </Container>
     </TouchableWithoutFeedback> )
 }
}
export default Users;
const styles = StyleSheet.create({
  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "white",
    zIndex: -1
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  tweetText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555"
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalFooter: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 54,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5
  },
  modal: {
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    zIndex: 4,
    marginTop:10,
    elevation: 4,
    height: Dimensions.get("window").height - Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight / 2
  }
});
