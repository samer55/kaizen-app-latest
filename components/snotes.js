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
   Keyboard,  TouchableWithoutFeedback ,
ImageBackground,
Modal,
    TouchableOpacity,
    Dimensions,
    Animated
} from "react-native";
import * as Expo from "expo";
import Constants from 'expo-constants';

import { Container, Header, Content, List, ListItem, Picker, Left, Body, Right, Button ,Card, CardItem,Fab , Thumbnail,
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
import _ from 'lodash'

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class SNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selected: '',    selectedDate: "",add:'',   dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    counter: 1,
       isLoading: true,puid:'',
       isEmpty: false,  dataSource1: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
       isFinished: false,
    edit:"",search:'',

     modalVisible: false,
      modalVisible1: false,  isDateTimePickerVisible: false,goals:'',

       selected2: undefined
  }
  this.arrayholder = [];

this.itemsRef = this.getRef()
}
  showDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: true });
   };
   getRef() {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username

      return firebaseApp.database().ref('notes/'+ `/${name}/` + `/${uid}/` );
    }
    listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            notes: child.val().notes,
            puid: child.val().puid
          });
        });

        this.setState(
           function() {
             this.arrayholder = items;
           });

      });
    }
   hideDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: false });
   };
   componentDidMount() {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username
  const title =this.state.title


       this.listenForItems(this.itemsRef);

     }



    handlePress = (buttonIndex) => {
       this.setState({ selected: buttonIndex })
     }
     onValueChange2(value: string) {
  this.setState({
    selected2: value
  });
}

componentWillReceiveProps(nextProps){
    if(nextProps.search!==this.props.search){
        this.setState({search:nextProps.search});
         this.SearchFilterFunction(nextProps.search)
    }
  }
  SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.notes ? item.notes.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource1: this.state.dataSource1.cloneWithRows(newData),
        search:text,
      });
    }
    render() {
       const { isDateTimePickerVisible, selectedDate } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

  <ListView
        automaticallyAdjustContentInsets={false}
        initialListSize={1}
        dataSource={this.state.dataSource1}
        renderRow={this._renderRow}
      />

                </View>
            </SafeAreaView>
        );
    }
    _renderRow1 = (data, sectionID, rowID) => {
   //console.log("TIMELINE :::: _renderRow " + data.title)

   return (
     <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Albums',{title:data.albums,puids:data.puid})}} style={{borderWidth: 1,borderColor: "#dddddd",borderRadius: 13,alignItems: 'center',justifyContent: "center",padding: 30,marginHorizontal: 10}}>
     <Text style={{fontSize: 18}}>
     {data.albums}
     </Text>
     </TouchableOpacity>
   )
 }

    _renderRow = (data, sectionID, rowID) => {
   //console.log("TIMELINE :::: _renderRow " + data.title)
     rowID++
   return (
     <Card>
<CardItem buttononPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes})
}} header>
<Left>
<Text style={{fontSize:17,fontWeight:'700'}}>{rowID}</Text>
</Left>
<Right>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Notes')}}>
<Text style={{fontSize:12,fontWeight:'500',color:'red'}}>Notes</Text>
</TouchableOpacity>
</Right>
</CardItem>
<CardItem  button onPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes})
}}>
<Body>
<Text>
{data.notes}
</Text>
</Body>
</CardItem>

</Card>
   )
 }

}
export default SNotes;
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
