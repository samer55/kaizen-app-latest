import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,Share,
    Image,
ImageBackground,
    TouchableOpacity,
    Dimensions,
    Animated
} from "react-native";
import { PricingCard } from 'react-native-elements';

import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button,Input ,Item,Form,Label} from 'native-base';
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
import InputField from '../components/Input';

const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'
import _ from 'lodash'

@inject("appStore") @observer

class Pland extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      type:this.props.navigation.state.params.type,
      counter: 1,
      a:'',b:'',c:'',ag:'',bg:'',cg:'',
         isLoading: true,data:[],
         puid:'',empty:true,
         isEmpty: false,
         isFinished: false,
    };
  this.itemsRef = this.getRef()
  }
  getRef() {
    const uid = this.props.appStore.uid
    const name = this.props.appStore.username
    const type = this.state.type

     return firebaseApp.database().ref('plan/'+ `/${name}/` + `/${uid}/`+ `/${type}/` );
   }
   listenForItems(itemsRef) {
     const uid = this.props.appStore.uid
     const name = this.props.appStore.username
     const type = this.state.type
     console.log("uid----------------"+this.props.appStore.uid+this.state.type)

     firebaseApp.database().ref('plan/'+ `/${name}/` + `/${uid}/`+ `/Spirtuality` ).on('value', (snap) => {

       // get children as an array
       var items = [];
       snap.forEach((child) => {
         items.push({
           a: child.val().a,
           b: child.val().b,
           c: child.val().c,
           ag: child.val().ag,
           bg: child.val().bg,
           cg: child.val().cg,

         });

console.log("sadasdasdasdasd----------------"+child.val().a)
                this.setState({
            empty:false,a:child.val().a,b:child.val().b,c:child.val().c,ag:child.val().ag,bg:child.val().bg,cg:child.val().cg
                });
                console.log("state----------------"+this.state.a)

       });

       this.setState({
    data:items
       });

     });
   }


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
    selected: '',clicked:false,clicked1:false,clicked2:false,clicked3:false,clicked4:false,clicked5:false,clicked6:false,clicked7:false,
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
      componentDidMount() {
        const uid = this.props.appStore.uid
        const name = this.props.appStore.username
           firebaseApp.database().ref('plan/'+ `/${name}/` + `/${uid}/`+ `/${this.state.type}` ).on('value',
        (snapshot) => {
          val = snapshot.val()
          if (snapshot.val()) {
            this.setState({

     a:val.a,
     b:val.b,
     c:val.c,
     ag:val.ag,
     bg:val.bg,
     cg:val.cg,
            })
            console.log("sadasdasdasdasd----------------"+val.a)

          }

        })

        }
        goals = () => {
          this.setState({
            postStatus: 'Saving...',
          })


                const uid = this.props.appStore.uid
                const name = this.props.appStore.username
        const title =this.state.type

                  const postData = {
                    uid: uid,
                    name:name,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
                    status: "available",
                    clientId: "",
                    clientName: "",
                    new_messages: 0,
                a:this.state.a,
                    b:this.state.b,
                        c:this.state.c,
                            ag:this.state.ag,
                                bg:this.state.bg,
                                    cg:this.state.cg,

                  }
                  let updates = {}

                  updates['plan/'+ `/${name}/` + `/${uid}/` +  `/${title}/`] = postData

                  firebaseApp.database().ref().update(updates)
                  .then(() => {
                    this.setState({
                                    postStatus: 'Saved! Thank You.',
                                    goals: '',

                                  })

                    setTimeout(() => {
                    }, 1000)
                  })
                  .catch(() => {
                    this.setState({ postStatus: 'Something went wrong!!!' })
                  })

                .catch(error => {
                  console.log(error)
                  this.setState({ postStatus: error })

                })



        }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 ,marginTop: 30,}}>

                    <ScrollView

                    >
                    <Text style={{fontSize: 17,color: 'red',alignSelf: 'center'}}>{this.state.postStatus}</Text>
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
               <Button
                               rounded
                               bordered
                               onPress={this.goals}
                               style={{ color: "#4286f4", height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10,alignSelf: 'flex-end',marginRight: 10}}

                             >
                               <Text style={{ color: "#4286f4" ,alignSelf:'center',fontSize: 20}}>Save</Text>
                             </Button>
                        <View>

                       <Form style={{marginHorizontal:20}}>
                       <Label  style={{fontWeight: 'bold',fontSize: 24}}>*Habits: </Label>
                       <Item inlineLabel >

                       <Label>a-</Label>
                       <Input value={this.state.a}  onChangeText={tweet => this.setState({ a: tweet })} />
                     </Item>
                              <Item inlineLabel >
                                <Label>b-</Label>
                                <Input value={this.state.b} onChangeText={tweet => this.setState({ b: tweet })} />
                              </Item>
                              <Item inlineLabel last>
                                <Label>c-</Label>
                                <Input value={this.state.c}  onChangeText={tweet => this.setState({ c: tweet })} />
                              </Item>
                                <Label  style={{fontWeight: 'bold',fontSize: 24}}>*Goals: </Label>
                                <Item inlineLabel>
                                  <Label>a-</Label>
                                  <Input value={this.state.ag}  onChangeText={tweet => this.setState({ ag: tweet })}/>
                                </Item>
                                <Item inlineLabel >
                                  <Label>b-</Label>
                                  <Input value={this.state.bg}  onChangeText={tweet => this.setState({ bg: tweet })}/>
                                </Item>
                                <Item inlineLabel last>
                                  <Label>c-</Label>
                                  <Input value={this.state.cg}  onChangeText={tweet => this.setState({ cg: tweet })}/>
                                </Item>
                            </Form>

                       </View>
</View>

                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Pland;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
