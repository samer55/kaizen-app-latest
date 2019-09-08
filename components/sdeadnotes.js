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

class SDeadnotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selected: '',    selectedDate: "",    dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    counter: 1,
       isLoading: true,puid:'',
       isEmpty: false,
       editdate:'',
       isFinished: false,
    edit:"",
 search: '',
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

   hideDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: false });
   };

   handleDatePicked = date => {
  Moment.locale('en');
 var dt = date;

     this.setState({ selectedDate: Moment(dt).format("MM/DD/YYYY h:mm A") });
     this.hideDateTimePicker();
   };
   handleDateedit = date => {
  Moment.locale('en');
 var dt = date;

     this.setState({ editdate: Moment(dt).format("MM/DD/YYYY h:mm A") });
     this.hideDateTimePicker();
   };
   setModalVisible1(visible) {
     this.setState({modalVisible1: visible});
   }

 setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }
 componentDidMount() {
   const uid = this.props.appStore.uid
   const name = this.props.appStore.username


   this.listenForItems(this.itemsRef);
   }

 getRef() {
   const uid = this.props.appStore.uid
   const name = this.props.appStore.username

    return  firebaseApp.database().ref('Deadline/'+ `/${name}/` + `/${uid}/` );
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          notes: child.val().notes,
          puid: child.val().puid,
            date: child.val().date
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
           dataSource: this.state.dataSource.cloneWithRows(newData),
           search:text,
         });
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
const newPostKey = firebaseApp.database().ref('Deadline/'+ `/${name}/` + `/${uid}/` ).push().key

          const postData = {
            uid: uid,
            date : this.state.selectedDate,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            new_messages: 0,
puid:newPostKey,
            notes:this.state.goals,
          }
          let updates = {}

          updates['Deadline/'+ `/${name}/` + `/${uid}/`  + newPostKey] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            goals: '',
                            editdate:'',
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
            date:this.state.editdate,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            new_messages: 0,
puid:this.state.puid,
            notes:this.state.edit,
          }
          let updates = {}

          updates['Deadline/'+ `/${name}/` + `/${uid}/` +  `/${title}/` + this.state.puid] = postData

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
    render() {
       const { isDateTimePickerVisible, selectedDate } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
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
    _renderRow = (data, sectionID, rowID) => {
   //console.log("TIMELINE :::: _renderRow " + data.title)

   return (
     <Card>
<CardItem buttononPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes,editdate:date.date})
}} header>

<Right>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Deadline')}}>
<Text style={{fontSize:12,fontWeight:'500',color:'red'}}>Deadline</Text>
</TouchableOpacity>
</Right>
</CardItem>
<CardItem  button onPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes,editdate:data.date})
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
export default SDeadnotes;
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
