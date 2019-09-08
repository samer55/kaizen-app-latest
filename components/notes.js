import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    Alert,
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

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selected: '',    selectedDate: "",add:'',   dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    counter: 1,
       isLoading: true,puid:'',
       isEmpty: false,  dataSource1: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
       isFinished: false,
    edit:"",

     modalVisible: false,
      modalVisible1: false,  isDateTimePickerVisible: false,goals:'',

       selected2: undefined
  }
this.itemsRef = this.getRef()
}
  showDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: true });
   };
   getRef() {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username

      return firebaseApp.database().ref('albums/'+ `/${name}/` + `/${uid}/` );
    }
    listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            albums: child.val().albums,
            puid: child.val().puid
          });
        });

        this.setState({
          dataSource1: this.state.dataSource.cloneWithRows(items)
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

       console.log("--------- TIMELINE --------- " + name + uid + title)
       firebaseApp.database().ref('notes/'+ `/${name}/` + `/${uid}/` ).on('value',
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
       this.listenForItems(this.itemsRef);

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
     deleteitem = () => {

      }
    handlePress = (buttonIndex) => {
       this.setState({ selected: buttonIndex })
     }
     onValueChange2(value: string) {
  this.setState({
    selected2: value
  });
}
deleteItems = () => {



        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const title =this.state.title



if (this.state.puid.length > 0) {
          firebaseApp.database().ref('notes/'+ `/${name}/` + `/${uid}/` +   `/${this.state.puid}`).remove()
}


}
deleteAlbums = () => {



        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const title =this.state.title



if (this.state.puids.length > 0) {
          firebaseApp.database().ref('albums/'+ `/${name}/` + `/${uid}/` +   `/${this.state.puids}`).remove()
}


}

albums = () => {
  this.setState({
    postStatus: 'Posting...',
  })


        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const newPostKey = firebaseApp.database().ref('albums/'+ `/${name}/` + `/${uid}/` ).push().key

          const postData = {
            uid: uid,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            new_messages: 0,
puid:newPostKey,
            albums:this.state.add,
          }
          let updates = {}

          updates['albums/'+ `/${name}/` + `/${uid}/` +newPostKey ] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            add: '',
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
goals = () => {
  this.setState({
    postStatus: 'Posting...',
  })


        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const title =this.state.title
const newPostKey = firebaseApp.database().ref('notes/'+ `/${name}/` + `/${uid}/` ).push().key

          const postData = {
            uid: uid,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            new_messages: 0,
puid:newPostKey,
            notes:this.state.add,
          }
          let updates = {}

          updates['notes/'+ `/${name}/` + `/${uid}/`  + newPostKey] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            add: '',
                          })
                          this.setModalVisible1(!this.state.modalVisible1);

            setTimeout(() => {
              this.setState({
                              postStatus: '',

                            })
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
            notes:this.state.edit,
          }
          let updates = {}

          updates['notes/'+ `/${name}/` + `/${uid}/` +   this.state.puid] = postData

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
    <Text style={{textAlign:'center'}}>{this.state.postStatus}</Text>
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

    {this.state.albumsbutton ?      <Button
             rounded
                onPress={this.albums}
             style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

           >
             <Text style={{ color: "white" ,alignSelf:'center'}}>Post</Text>
           </Button> :<Button
                    rounded
                       onPress={this.goals}
                    style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

                  >
                    <Text style={{ color: "white" ,alignSelf:'center'}}>Post</Text>
                  </Button>}
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

             placeholder='add notes..'
value={this.state.add}
             onChangeText={tweet => this.setState({ add: tweet })}
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
                onPress={this.updateItem}
             style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

           >
             <Text style={{ color: "white" ,alignSelf:'center'}}>Edit</Text>
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
value={this.state.edit}
             onChangeText={tweet => this.setState({ edit: tweet })}
           />

         </View>
          </DismissKeyboard>


       </Modal>


                    <ScrollView
                        scrollEventThrottle={16}

                    >
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                          Albums
                        </Text>
                        <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    />
                    <Button primary bordered style={{justifyContent:'center',alignItems: 'center',padding: 25}} onPress={() => {
                              this.setModalVisible1(true);
                              this.setState({add:'Albums name...',albumsbutton:true})
                            }} >
                    <Text style={{color:'#4286f4'}}>Add Albums</Text>
                    </Button>
                    <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                            <ScrollView horizontal={true} style={{paddingHorizontal: 20}}
                            >

                              <ListView
                                    automaticallyAdjustContentInsets={false}
                                    initialListSize={1}
                                    horizontal={true}
                                    dataSource={this.state.dataSource1}
                                    renderRow={this._renderRow1}
                                  />

                            </ScrollView>
                        </View>

                    </View>


                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                              Notes
                            </Text>
                            <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
      />
   <Button primary bordered style={{justifyContent:'center',alignItems: 'center',padding: 25}}   onPress={() => {
             this.setModalVisible1(true);
           }} >
  <Text style={{color:'#4286f4'}}>Add notes</Text>
   </Button>
   <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
      />
</View>
<View style={{ paddingTop: 20 ,flex:1}}>
<ScrollView>
{this.state.isEmpty ? <View>
  <Image  style={{alignSelf: 'center',margin: 10,width: 200,height:200 }} borderRadius={15} source={require("../assets/empty.png")} />
  <Text style={{fontSize: 27,fontWeight: 'bold',alignSelf: 'center',margin: 10}}>
    You don't have any notes yet, Please Add your first goal.
  </Text>

</View>
  :
  <ListView
        automaticallyAdjustContentInsets={false}
        initialListSize={1}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />}

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
     <TouchableOpacity onLongPress={() => {

     this.setState({title:data.albums,puids:data.puid})
     Alert.alert(
           'Alert Confirm',
           'Are you sure you want to delete this Album?!',
           [
             {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
             {text: 'YES', onPress: () => this.deleteAlbums()},
           ]
         );

     }} onPress={()=>{this.props.navigation.navigate('Albums',{title:data.albums,puids:data.puid})}} style={{borderWidth: 1,borderColor: "#dddddd",borderRadius: 13,alignItems: 'center',justifyContent: "center",padding: 30,marginHorizontal: 10}}>
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
<CardItem  header>
<Left>
<TouchableOpacity onPress={() => {

this.setState({puid:data.puid,edit:data.notes})
Alert.alert(
      'Alert Confirm',
      'Are you sure you want to delete this note?!',
      [
        {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => this.deleteItems()},
      ]
    );

}}>
<Text style={{fontSize:12,fontWeight:'500',color:'red'}}>delete</Text>
</TouchableOpacity>
</Left>

<Right>
<Text style={{fontSize:12,fontWeight:'500',color:'red'}}>{this.state.selectedDate}</Text>
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
export default Notes;
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
