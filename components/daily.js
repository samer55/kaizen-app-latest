import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,ListView,
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
 Tab, Tabs,
  Spinner,

Icon,Form,
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

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class Daily extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "",      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      counter: 1, dataSource1: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
         isLoading: true,puid:'',
         isEmpty: false,
         isFinished: false,
      edit:"",

       modalVisible: false,
        modalVisible1: false,  selected: "Negative",
         selected2: undefined
    };
  this.itemsRef = this.getRef()
  this.itemsRef1 = this.getRef1()

  }
  getRef() {
    const uid = this.props.appStore.uid
    const name = this.props.appStore.username

     return firebaseApp.database().ref('daily/'+ `/${name}/` + `/${uid}/`  );
   }
   getRef1() {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username

      return firebaseApp.database().ref('daily/'+ `/${name}/` + `/${uid}/` );
    }

   listenForItems(itemsRef) {
     itemsRef.orderByChild('type').equalTo('Positive').on('value', (snap) => {

       // get children as an array
       var items = [];
       snap.forEach((child) => {
         items.push({
           notes: child.val().goals,
           type: child.val().type,
           puid: child.val().puid

         });
       });

       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(items)
       });

     });
   }
   listenForItems1(itemsRef) {
     itemsRef.orderByChild('type').equalTo('Negative').on('value', (snap) => {

       // get children as an array
       var items = [];
       snap.forEach((child) => {
         items.push({
           notes: child.val().goals,
           type: child.val().type,
           puid: child.val().puid

         });
       });

       this.setState({
         dataSource1: this.state.dataSource1.cloneWithRows(items)
       });

     });
   }
   componentDidMount() {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username

 this.listenForItems(this.itemsRef);
 this.listenForItems1(this.itemsRef1);


     }

   setModalVisible1(visible) {
     this.setState({modalVisible1: visible});
   }
   onValueChange(value: string) {
      this.setState({
        selected: value
      });
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
goals = () => {
  this.setState({
    postStatus: 'Posting...',
  })


        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
const type =this.state.selected
const newPostKey = firebaseApp.database().ref('daily/'+ `/${name}/` + `/${uid}/`).push().key

          const postData = {
            uid: uid,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            type:type,
            clientName: "",
            new_messages: 0,
puid:newPostKey,
            goals:this.state.goals,
          }
          let updates = {}

          updates['daily/'+ `/${name}/` + `/${uid}/` +  newPostKey] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            goals: '',
                            selected:'Negative'
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
const type =this.state.type

          const postData = {
            uid: uid,
            name:name,
createdAt: firebase.database.ServerValue.TIMESTAMP,
updatedAt: firebase.database.ServerValue.TIMESTAMP,
            status: "available",
            clientId: "",
            clientName: "",
            type:type,
            new_messages: 0,
puid:this.state.puid,
            goals:this.state.edit,
          }
          let updates = {}

          updates['daily/'+ `/${name}/` + `/${uid}/` +   this.state.puid] = postData

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
           onPress={this.goals}
           style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

         >
           <Text style={{ color: "white" ,alignSelf:'center'}}>Post</Text>
         </Button>
       </View>
        <DismissKeyboard>

       <View
         style={{
           flex: 1,

           width: "100%"
         }}
       >
       <Form>
                 <Picker
                   mode="dropdown"
                   iosIcon={<Icon name="arrow-down" />}
                   headerBackButtonText="Back"
                   selectedValue={this.state.selected}
                   onValueChange={this.onValueChange.bind(this)}
                 >

                   <Picker.Item label="Positive" value="Positive" />
                   <Picker.Item label="Negative" value="Negative" />
                 </Picker>
               </Form>
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

           placeholder="What is your notes?.."
      value={this.state.goals}
           onChangeText={tweet => this.setState({ goals: tweet })}
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
                          <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                        Write one thing positive and one negative at the end of the day and make sure to keep doing that to improve.
                          </Text>
                           <Tabs>
                          <Tab heading="Positive">
<View>
                          {this.state.isEmpty ? <View>
                            <Image  style={{alignSelf: 'center',margin: 10,width: 200,height:200 }} borderRadius={15} source={require("../assets/empty.png")} />
                            <Text style={{fontSize: 27,fontWeight: 'bold',alignSelf: 'center',margin: 10}}>
                              You don't have any goals yet, Please Add your first goal.
                            </Text>

                          </View>
                            :
                            <ListView
                                  automaticallyAdjustContentInsets={false}
                                  initialListSize={1}
                                  dataSource={this.state.dataSource}
                                  renderRow={this._renderRow}
                                />}
                                </View>
        </Tab>
        <Tab heading="Negative">
<View>
        {this.state.isEmpty ? <View>
          <Image  style={{alignSelf: 'center',margin: 10,width: 200,height:200 }} borderRadius={15} source={require("../assets/empty.png")} />
          <Text style={{fontSize: 27,fontWeight: 'bold',alignSelf: 'center',margin: 10}}>
            You don't have any goals yet, Please Add your first goal.
          </Text>

        </View>
          :
          <ListView
                automaticallyAdjustContentInsets={false}
                initialListSize={1}
                dataSource={this.state.dataSource1}
                renderRow={this._renderRow1}
              />}
</View>

</Tab>
      </Tabs>



      </View>


                  </ScrollView>
                  <Fab
                             active={this.state.active}
                             direction="up"
                             containerStyle={{ }}
                             style={{ backgroundColor: '#4a90e2' }}
                             position="bottomRight"
                             onPress={() => {
                                    this.setModalVisible1(true);
                                  }}>
                             <Feather name="edit" size={30} color="#ffffff"  />
                                </Fab>
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
this.setState({puid:data.puid,edit:data.notes,type:data.type})
}} header>
</CardItem>
<CardItem  button onPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes,type:data.type})
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
 _renderRow1 = (data, sectionID, rowID) => {
//console.log("TIMELINE :::: _renderRow " + data.title)
return (
  <Card>
<CardItem buttononPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes,type:data.type})
}} header>
</CardItem>
<CardItem  button onPress={() => {
this.setModalVisible(true);
this.setState({puid:data.puid,edit:data.notes,type:data.type})
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
export default Daily;
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
