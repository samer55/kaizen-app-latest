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

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      counter: 1,
      a:'',b:'',c:'',ag:'',bg:'',cg:'',type:'',
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
     itemsRef.on('value', (snap) => {

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

                this.setState({
            empty:false,a:child.val().a,b:child.val().b,c:child.val().c,ag:child.val().ag,bg:child.val().bg,cg:child.val().cg
                });
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

    this.listenForItems(this.itemsRef);

        }
        goals = () => {
          this.setState({
            postStatus: 'Posting...',
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

    render() {
      var detail =
        this.state.data.map( (item, index) =>
        {
          return (
            <View>
           <Form style={{marginHorizontal:20}}>
           <Label  style={{fontWeight: 'bold'}}>*Habits: </Label>
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
                    <Input value={this.state.c} placeholder={item.c} onChangeText={tweet => this.setState({ c: tweet })} />
                  </Item>
                    <Label  style={{fontWeight: 'bold'}}>*Goals: </Label>
                    <Item inlineLabel>
                      <Label>a-</Label>
                      <Input value={this.state.ag} placeholder={item.ag} onChangeText={tweet => this.setState({ ag: tweet })}/>
                    </Item>
                    <Item inlineLabel >
                      <Label>b-</Label>
                      <Input value={this.state.bg} placeholder={item.bg} onChangeText={tweet => this.setState({ bg: tweet })}/>
                    </Item>
                    <Item inlineLabel last>
                      <Label>c-</Label>
                      <Input value={this.state.cg} placeholder={item.cg} onChangeText={tweet => this.setState({ cg: tweet })}/>
                    </Item>
                </Form>

           </View>
          );
        });

      const details =
        <View>
       <Form style={{marginHorizontal:20}}>
       <Label style={{fontWeight: 'bold'}}>*Habits: </Label>

              <Item inlineLabel>
                <Label>a-</Label>
                <Input    onChangeText={tweet => this.setState({ a: tweet })}/>
              </Item>
              <Item inlineLabel>
                <Label>b-</Label>
                <Input onChangeText={tweet => this.setState({ b: tweet })} />
              </Item>
              <Item inlineLabel last>
                <Label>c-</Label>
                <Input onChangeText={tweet => this.setState({ c: tweet })} />
              </Item>
                <Label  style={{fontWeight: 'bold'}}>*Goals: </Label>
                <Item inlineLabel>
                  <Label>a-</Label>
                  <Input  onChangeText={tweet => this.setState({ ag: tweet })}/>
                </Item>
                <Item inlineLabel>
                  <Label>b-</Label>
                  <Input  onChangeText={tweet => this.setState({ bg: tweet })}/>
                </Item>
                <Item inlineLabel last>
                  <Label>c-</Label>
                  <Input  onChangeText={tweet => this.setState({ cg: tweet })}/>
                </Item>
            </Form>

       </View>;




var fontWeight = this.state.empty ? details : detail;
const {
a,b,c,ag,bg,cg
} = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 ,marginTop: 30,}}>

                    <ScrollView

                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>


                            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20,padding:10 }}>
                           <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Spirtuality'})}}>

                                  <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                      1- Spirtuality.
                                  </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Body'})}}>

                                         <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                             2- Body.
                                         </Text>
                                         </TouchableOpacity>
                                         <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Mind/Emotion'})}}>

                                                <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                                    3- Mind/Emotion.
                                                </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Relationship'})}}>

                                                       <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                                           4- Relationship.
                                                       </Text>
                                                       </TouchableOpacity>
                                                       <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Family'})}}>

                                                              <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                                                  5- Family.
                                                              </Text>
                                                              </TouchableOpacity>
                                                              <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Business/career'})}}>

                                                                     <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                                                         6- Business/career.
                                                                     </Text>
                                                                     </TouchableOpacity>
                                                                     <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Money/Finance'})}}>

                                                                            <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                                                                7- Money/Finance.
                                                                            </Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Pland', {type: 'Social/Fun/Friends'})}}>

                                                                                   <Text style={{ fontSize: 18, fontWeight: '700', paddingHorizontal: 20,color:'#4286f4',margin:10 }}>
                                                                                      8- Social/Fun/Friends.
                                                                                   </Text>
                                                                                   </TouchableOpacity>
                                        </View>
</View>

                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Plan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
