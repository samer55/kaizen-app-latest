import React, { Component } from "react";
import {
    View,
    Text,ListView,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
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
import Sgoals from '../components/sgoals'
import SDaily from '../components/sdaily'
import SNotes from '../components/snotes'
import SBegratful from '../components/sbegratful'
import SDeadnotes from '../components/sdeadnotes'

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

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class Search extends Component {

    constructor(props) {
      super(props);
      this.state = {
    selected: '', dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    counter: 1,
       isLoading: true,data:[],
       puid:'',
       isEmpty: false,
       isFinished: false,searchs:'',click:true,
     modalVisible: false,
      modalVisible1: false,
       selected2: undefined
  };
  this.itemsRef = this.getRef()
  }
  getRef() {
    const uid = this.props.appStore.uid
    const name = this.props.appStore.username

     return firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` );
   }
   listenForItems(itemsRef) {
     itemsRef.on('value', (snap) => {

       // get children as an array
       var items = [];
       snap.forEach((child) => {
         items.push({
           name: child.val().name,
           number: child.val().number
         });
       });

       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(items),data:items
       });

     });
   }

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
    componentDidMount() {
      const uid = this.props.appStore.uid
      const name = this.props.appStore.username

  this.listenForItems(this.itemsRef);


      }
    firstSearch() {
    this.searchDirectory(this.itemsRef);
  }



searchDirectory(itemsRef) {

var searchText = this.state.searchText.toString();

if (searchText == ""){
  this.listenForItems(itemsRef);
}else{
  itemsRef.orderByChild("searchable").startAt(searchText).endAt(searchText).on('value', (snap) => {

    items = [];
    snap.forEach((child) => {
      items.push({
        address: child.val().address,
        firstLetter: child.val().firstLetter,
        title: child.val().title,
      });
    });


    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });

  });
}

}
    handlePress = (buttonIndex) => {
       this.setState({ selected: buttonIndex })
     }
     onValueChange2(value: string) {
  this.setState({
    selected2: value
  });
}
  changePath=(text)=>{
    this.setState({searchs: text});
  }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Modal
         animationType="slide"
         transparent={false}
         style={styles.modal}
         visible={this.state.modalVisible1}
         onRequestClose={() => {
           Alert.alert('Modal has been closed.');
         }}>

         <View
           style={{
             alignSelf: "flex-start",
             alignItems: "center",
             flexDirection: "row",
             padding: 5,
             paddingRight: 10,
             paddingTop:10,
           }}
         >
           <Button style={{marginTop:10}} transparent onPress={() => {
                  this.setModalVisible1(!this.state.modalVisible1);
                }} >
             <FontAwesome name="close" style={{ color: "black", fontSize: 32 }} />
           </Button>
           <View style={{ flex: 1 }} />

           <Button
             rounded
             style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

           >
             <Text style={{ color: "white" ,alignSelf:'center'}}>Post</Text>
           </Button>
         </View>
          <DismissKeyboard>
         <View
           style={{
             flex: 1,
             justifyContent: "flex-start",
             alignItems: "flex-start",
             width: "100%"
           }}
         >
           <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}

                          style={{ width: undefined }}
                          placeholder="Miss or Found"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.selected2}
                          onValueChange={this.onValueChange2.bind(this)}
                        >
                          <Picker.Item label="Missing" value="key0" />
                          <Picker.Item label="Found" value="key1" />

                        </Picker>
           <Input
             style={{
               flex: 1,
               width: "100%",
               fontSize: 24,
               alignContent: "flex-start",
               justifyContent: "flex-start",
               textAlignVertical: "top",
               margin: 5
             }}
             multiline

             placeholder="What do you lost or found?"

             onChangeText={tweet => this.setState({ newTweetContent: tweet })}
           />

         </View>
          </DismissKeyboard>


       </Modal>
                  <Modal
         animationType="slide"
         transparent={false}
         style={styles.modal}
         visible={this.state.modalVisible}
         onRequestClose={() => {
           Alert.alert('Modal has been closed.');
         }}>

         <View
           style={{
             alignSelf: "flex-start",
             alignItems: "center",
             flexDirection: "row",
             padding: 5,
             paddingRight: 10,
             paddingTop:10,
           }}
         >
           <Button style={{marginTop:10}} transparent onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }} >
             <FontAwesome name="close" style={{ color: "black", fontSize: 32 }} />
           </Button>
           <View style={{ flex: 1 }} />

           <Button
             rounded
             style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

           >
             <Text style={{ color: "white" ,alignSelf:'center'}}>Reply</Text>
           </Button>
         </View>
          <DismissKeyboard>
         <View
           style={{
             flex: 1,
             justifyContent: "flex-start",
             alignItems: "flex-start",
             width: "100%"
           }}
         >

           <Input
             style={{
               flex: 1,
               width: "100%",
               fontSize: 24,
               alignContent: "flex-start",
               justifyContent: "flex-start",
               textAlignVertical: "top",
               margin: 5
             }}
             multiline

             placeholder="What's happening?"

             onChangeText={tweet => this.setState({ newTweetContent: tweet })}
           />

         </View>
          </DismissKeyboard>


       </Modal>
                  <View style={{ height:70, backgroundColor: 'white', borderBottomColor: '#dddddd' }}>
                      <View style={{
                          flexDirection: 'row', padding: 10,
                          backgroundColor: 'white', marginHorizontal: 20,
                          shadowOffset: { width: 0, height: 0 },
                          shadowColor: 'black',
                          shadowOpacity: 0.2,
                          elevation: 1,
                          marginTop: Platform.OS == 'android' ? 30 : null
                      }}>
                          <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                          <View

                              style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' ,justifyContent:'center'}}
                          >
                            <Input
                              style={{
                                flex: 1,

                              }}


                              placeholder="Search.."

                              onChangeText={this.changePath}
                            />
                          </View>

                      </View>


                  </View>

                    <ScrollView
                        scrollEventThrottle={16}

                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>

<View style={{ paddingTop: 20 }}>

           <Sgoals navigation={this.props.navigation} search={this.state.searchs} />

           <SDaily navigation={this.props.navigation} search={this.state.searchs}/>
 <SNotes navigation={this.props.navigation} search={this.state.searchs}/>
<SBegratful navigation={this.props.navigation}  search={this.state.searchs}/>

<SDeadnotes navigation={this.props.navigation} search={this.state.searchs}/>
                            </View>

</View>


                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Search;
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
