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

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class Sgoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
          selected: '',    selectedDate: "",      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    counter: 1,
       isLoading: true,puid:'',
       isEmpty: false,searchText:this.props.search,
       isFinished: false,
    edit:"",

     modalVisible: false, search: '',
      modalVisible1: false,  isDateTimePickerVisible: false,goals:'',
       selected2: undefined
  }
  this.itemsRef = this.getRef()
this.arrayholder = [];
  }
  getRef() {
    const uid = this.props.appStore.uid
    const name = this.props.appStore.username

     return  firebaseApp.database().ref('goals/'+ `/${name}/` + `/${uid}/` );
   }
   listenForItems(itemsRef) {
     itemsRef.on('value', (snap) => {

       // get children as an array
       var items = [];
       snap.forEach((child) => {
         items.push({
           goals: child.val().goals,
           puid: child.val().puid
         });
       });

       this.setState({
      data:items
       },
          function() {
            this.arrayholder = items;
          });

     });
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

     this.setState({ selectedDate: Moment(dt).format("MM/DD/YYYY h:mm A") });
     this.hideDateTimePicker();
   };

   setModalVisible1(visible) {
     this.setState({modalVisible1: visible});
   }

 setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }

 firstSearch() {
 this.searchDirectory(this.itemsRef);
}



searchDirectory(itemsRef) {

var searchText = this.state.searchText.toString();

if (searchText == ""){
this.listenForItems(itemsRef);
}else{
itemsRef.startAt(searchText).endAt(searchText).on('value', (snap) => {

 items = [];
 snap.forEach((child) => {
   items.push({
     goals: child.val().goals,
     puid: child.val().puid
   });
 });


 this.setState({
   dataSource: this.state.dataSource.cloneWithRows(items)
 });

});
}

}
 componentDidMount() {
   const uid = this.props.appStore.uid
   const name = this.props.appStore.username


   this.listenForItems(this.itemsRef);
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
goals = () => {
  this.setState({
    postStatus: 'Posting...',
  })


        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const title =this.state.title
const newPostKey = firebaseApp.database().ref('goals/'+ `/${name}/` + `/${uid}/`).push().key

          const postData = {
            uid: uid,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            Category:title,
            new_messages: 0,
puid:newPostKey,
            goals:this.state.goals,
          }
          let updates = {}

          updates['goals/'+ `/${name}/` + `/${uid}/`  + newPostKey] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            goals: '',
                          })
                          this.setModalVisible1(!this.state.modalVisible1);

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
updateItem = () => {
  this.setState({
    postStatus: 'Posting...',
  })


        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const title =this.state.title

          const postData = {
            uid: uid,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            new_messages: 0,
puid:this.state.puid,
            goals:this.state.edit,
          }
          let updates = {}

          updates['goals/'+ `/${name}/` + `/${uid}/` +  `/${title}/` + this.state.puid] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            edit: '',
                            puid:'',
                          })
                          this.setModalVisible(!this.state.modalVisible);

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
componentWillReceiveProps(nextProps){
    if(nextProps.search!==this.props.search){
        this.setState({search:nextProps.search});
         this.SearchFilterFunction(nextProps.search)
    }
  }

    render() {

       const { isDateTimePickerVisible, selectedDate } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>



<View style={{ paddingTop: 20 }}>
  <ListView
        automaticallyAdjustContentInsets={false}
        initialListSize={1}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
                </View>
            </SafeAreaView>
        );
    }

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = item.goals ? item.goals.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          dataSource: this.state.dataSource.cloneWithRows(newData),
          search:text,
        });
      }
    _renderRow = (data, sectionID, rowID) => {
   //console.log("TIMELINE :::: _renderRow " + data.title)
   return (
     <Card>
<CardItem buttononPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.goals})
}} header>
<Right>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Goals')}}>
<Text style={{fontSize:12,fontWeight:'500',color:'red'}}>Goals</Text>
</TouchableOpacity>
</Right>
</CardItem>
<CardItem  button onPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.goals})
}}>
<Body>
<Text>
{data.goals}
</Text>
</Body>
</CardItem>

</Card>
   )
 }
}
export default Sgoals;
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
