import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,RefreshControl,
    ScrollView,
    Image,ImageBackground,
    TouchableOpacity,
    Dimensions,
    Animated
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from '../components/Explore/Category'
import Tag from '../components/Explore/Tag'
import Home from '../components/Explore/Home'
import Swiper from 'react-native-swiper'
import Slider from '../components/Slider'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {  Thumbnail, Left, Body, Right,Button } from 'native-base';
import Moment from 'moment';

import { LinearGradient } from 'expo-linear-gradient';
const rows = 5;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const widths = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const heights = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#ffffff',
    background2: '#ffffff'
};


import { Card, ListItem, Header } from 'react-native-elements'
const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

class HomeScreen extends Component {
  constructor(props){
      super(props)

      this.state = {
         width: '99%',admin:'false',uid:'',  counter: 1,times:'',quote:false,
              isLoading: true,data:[],
              puid:'',myfeed:'',auth:'',
              isEmpty: false,feed:'',timer:'',
              isFinished: false,motivation:'',refreshing: false,
          imagesSlider: [

            { uri:'http://langcenter.yu.edu.jo/sites/default/files/slider_images/yu%20%281%29.jpg' },
                { uri:'https://i.pinimg.com/564x/23/b1/da/23b1da664ec94a9f7ab0854cd5d5adb1.jpg' },
                { uri:'https://i.pinimg.com/564x/60/2e/50/602e50a07a27b77439f7bb005a44236f.jpg' },

{ uri:'https://www.wired.com/images_blogs/wiredscience/2009/10/nikon2003_1st_wittmann.jpg' },
          ]
      }
      this.itemsRef = this.getRef()
      this.itemsRef1 = this.getRef1()
      this.itemsRef2 = this.getRef2()


  }
  get gradient () {
      return (
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            startPoint={{ x: 1, y: 0 }}
            endPoint={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
      );
  }
  _onRefresh = () => {
     this.setState({refreshing: true});
     this.componentDidMount()

       this.setState({refreshing: false});

   }

    componentDidMount() {
      firebaseApp.auth().onAuthStateChanged(user => {
          if (user) {
        console.log("--------- LOGGED AS " + user.displayName + " ---------")
        this.props.appStore.username =user.displayName

                this.props.appStore.uid =user.uid
                firebaseApp.database().ref('quotes/'+  `/${user.uid}` ).on('value',
                (snapshot) => {
                  val = snapshot.val()
                  if (snapshot.val()) {
                    this.setState({

            motivation:val.feed,

                    })
                      console.log("--------- LOGGEDssv  " + this.props.appStore.img + " ---------"+user.uid)
                  }

                })
                firebaseApp.database().ref('Quote/' ).on('value',
                (snapshot) => {
                  val = snapshot.val()
                  if (snapshot.val()) {
                    this.setState({

            feed:val.feed,

                    })
                      console.log("--------- feeds  " + this.state.feed + " ---------")
                  }

                })

              }
      })
        console.log("--------- LOGGED AS uid " + this.state.uid + " ---------")
        console.log("--------- quotes1 " + this.state.motivation + " ---------")
        console.log("--------- feeds  " + this.state.feed + " ---------")

      console.log("--------- LOGGEDss  " + this.state.admin + " ---------"+this.state.uid)

      this.listenForItems(this.itemsRef);
  this.listenForItems1(this.itemsRef1);
  this.listenForItems2(this.itemsRef2);


    }
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    getRef2() {
      const uid = this.props.appStore.uid
      const name = this.props.appStore.username
      console.log("--------- myuid " + uid + " ---------")
       return firebaseApp.database().ref('Quote/' );
     }

     listenForItems2(itemsRef) {
       itemsRef.on('value',
       (snapshot) => {
         val = snapshot.val()
         if (snapshot.val()) {
           this.setState({

   myfeed:val.feed,
auth:val.author
           })
           console.log("--------- myfeed  " + val.feed )

         }
         if (this.state.times )
         {
           if (this.state.myfeed.length > 0) {
             this.componentWillMoun();

           }
           console.log("checked")
         }
       })
     }
    getRef() {
      const uid = this.props.appStore.uid
      const name = this.props.appStore.username
       return firebaseApp.database().ref('dates/'+  `/${uid}/`);
     }

     listenForItems(itemsRef) {
       itemsRef.on('value',
       (snapshot) => {
         val = snapshot.val()
         if (snapshot.val()) {
           this.setState({

 times:val.time,
           })
         }
       })


     }
     getRef1() {
       const uid = this.props.appStore.uid
       const name = this.props.appStore.username
       console.log("--------- myuid " + uid + " ---------")
        return firebaseApp.database().ref('quotes/'+  `/${uid}` );
      }

      listenForItems1(itemsRef) {

        itemsRef.on('value',
        (snapshot) => {
          val = snapshot.val()
          if (snapshot.val()) {
            this.setState({

    motivation:val.feed,
timer:val.date,
            })

          }

        })
      }
      componentWillMoun() {

        let newa = Moment().format('YYYY-MM-DD') ;
          let hour = new Date();
        var totime =this.state.times
        var dateto = hour.getHours();
        const date =Moment().format('ll') ;
        console.log(dateto >= totime && newa > this.state.auth + "fdsfsdfsdfsdfsdfsdfsdfsf")
        console.log('newa' +newa +' timer ' +this.state.auth )

  if (totime) {

    if (dateto >= totime && newa >= this.state.timer) {
      console.log("--------- import  check true "  )

      this.importquote(this.state.myfeed,this.state.auth)

    } else {

    }
  }


      }
     importquote = (feed,auther) => {

       console.log(auther + 'auther')
       console.log('thgdgfgdfgdfgdfgdfgdfgdfgdfgd')

       var currentDate = new Date();
       var date = new Date(currentDate.getTime() + (20 * 60 * 1000));

             const uid = this.props.appStore.uid
             const name = this.props.appStore.username

               const postData = {
                 feed:feed,
                 date:Moment(currentDate).add(1, 'day').format('YYYY-MM-DD'),
author:auther
               }
               let updates = {}

               updates['quotes/' + uid] = postData
               console.log(postData)

               firebaseApp.database().ref().update(updates)
               .then(() => {



               })
               .catch(() => {
                 this.setState({ postStatus: 'Something went wrong!!!' })
               })

             .catch(error => {
               console.log(error)
             })



     }
     _simpleAlertHandler=()=>{
      //function to make simple alert
      alert('Saved succesfully');
    }
    render() {
      let newa = new Date();
       console.log(this.state.myfeed + "checkll")


      var totime =this.state.times
      var dateto = newa.getHours();
      const date =Moment().format('ll') ;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
 { this.gradient }
 <Header backgroundColor="white"
  leftComponent={{ icon: 'settings', color: "#4286f4",onPress:()=>{this.props.navigation.navigate('Settings')} }}
  centerComponent={{ text: date, style: { color: 'black' },onPress:()=>{this.props.navigation.navigate('Date')}  }}
  rightComponent={{ icon: 'search', color: "#4286f4",onPress:()=>{this.props.navigation.navigate('Search')} }}
/>
                    <ScrollView
                        scrollEventThrottle={16}
                        refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >

                      <View style={{  backgroundColor: 'white',  borderBottomColor: '#dddddd' }}>
{this.state.motivation.length > 0 ?
<LinearGradient
  colors={['#bdc3c7', '#2c3e50']} style={{height: 200,width: width-10,padding: 20,borderRadius: 13,alignSelf: 'center'}} >
<View style={{flex:1,justifyContent: 'center',alignItems: 'flex-start'}}>
<Text style={{fontSize: 20,fontWeight: '600',color: '#fff'}}>{this.state.motivation}</Text>
</View>
<View style={{flex:1,justifyContent: 'center',alignItems: 'flex-end'}}>
<Text style={{fontSize: 17,color: '#fff'}}>{this.state.auth}</Text>
</View>
</LinearGradient>
   :
    null
}

</View>

                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                        <View style={{ flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',}}>
                          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Goals')}}>
                        <LinearGradient
                          colors={['#2193b0', '#6dd5ed']}
                          style={{ marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: widths,
    height: heights,
 borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',}}>
                          <FontAwesome name="trophy"  size={24} color='white' />

                          <Text
                            style={{
                              backgroundColor: 'transparent',
                              fontSize: 15,
                              color: '#fff',
                            }}>
                            Goals
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Notes')}}>

                        <LinearGradient
                          colors={['#373B44', '#4286f4']}
                          style={{ marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: widths,  borderRadius: 20,
    height: heights,
    justifyContent: 'center',
    alignItems: 'center',}}>
                          <FontAwesome name="sticky-note" size={24} color='white' />

                          <Text
                            style={{
                              backgroundColor: 'transparent',
                              fontSize: 15,
                              color: '#fff',
                            }}>
                            Notes
                          </Text>
                        </LinearGradient>
                        </TouchableOpacity>
</View>
<View style={{ flex: 1,
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
alignItems: 'center',}}>
  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Begratful')}}>
<LinearGradient
  colors={['#1f4037', '#99f2c8']}
  style={{ marginTop: marginVertical,
marginBottom: marginVertical,
marginLeft: marginHorizontal, borderRadius: 20,
marginRight: marginHorizontal,
width: widths,
height: heights,
justifyContent: 'center',
alignItems: 'center',}}>
  <FontAwesome name="smile-o"  size={24} color='white' />

  <Text
    style={{
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#fff',
    }}>
    Be Grateful
  </Text>
</LinearGradient>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Deadline')}}>

<LinearGradient
  colors={['#3494E6', '#EC6EAD']}
  style={{ marginTop: marginVertical,
marginBottom: marginVertical,
marginLeft: marginHorizontal, borderRadius: 20,
marginRight: marginHorizontal,
width: widths,
height: heights,
justifyContent: 'center',
alignItems: 'center',}}>
  <FontAwesome name="calendar"  size={24} color='white' />

  <Text
    style={{
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#fff',
    }}>
    Deadline
  </Text>
</LinearGradient>
</TouchableOpacity>

</View>
<View style={{ flex: 1,
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
alignItems: 'center',}}>
  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Charts')}}>
<LinearGradient
  colors={['#fc00ff', '#00dbde']}
  style={{ marginTop: marginVertical,
marginBottom: marginVertical,
marginLeft: marginHorizontal, borderRadius: 20,
marginRight: marginHorizontal,
width: widths,
height: heights,
justifyContent: 'center',
alignItems: 'center',}}>
  <Feather name="pie-chart"  size={24} color='white' />

  <Text
    style={{
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#fff',
    }}>
    Life Circle
  </Text>
</LinearGradient>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Daily')}}>

<LinearGradient
  colors={['#00c6ff', '#0072ff']}
  style={{ marginTop: marginVertical,
marginBottom: marginVertical,
marginLeft: marginHorizontal, borderRadius: 20,
marginRight: marginHorizontal,
width: widths,
height: heights,
justifyContent: 'center',
alignItems: 'center',}}>
  <FontAwesome name="list-ul"  size={24} color='white' />

  <Text
    style={{
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#fff',
    }}>
    Daily Schedule
  </Text>
</LinearGradient>
</TouchableOpacity>
</View>
<View style={{ flex: 1,
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
alignItems: 'center',}}>
  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Plan')}}>
<LinearGradient
  colors={['#00B4DB', '#0083B0']}
  style={{ marginTop: marginVertical,
marginBottom: marginVertical,
marginLeft: marginHorizontal, borderRadius: 20,
marginRight: marginHorizontal,
width: widths,
height: heights,
justifyContent: 'center',
alignItems: 'center',}}>
  <Feather name="briefcase"  size={24} color='white' />

  <Text
    style={{
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#fff',
    }}>
    Business Plan
  </Text>
</LinearGradient>
</TouchableOpacity>
</View>



                        </View>
                    </ScrollView>
<View style={{height: 50}}>
              <Button onPress={()=>{this.props.navigation.navigate('Feedback')}} danger style={{flex:1,justifyContent:'center'}} full><Text style={{textAlign:'center',color:'white'}}> Feedback? </Text></Button>
</View>
                </View>
            </SafeAreaView>
        );
    }
}
export default HomeScreen;

const styles =  StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    recentlyPlayedTitleBar: {
  paddingHorizontal: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},



 markerWrap: {
   alignItems: "center",
   justifyContent: "center",
 },
 card: {
   flex: 1,
 },
 title: {
   fontSize: 20,
   fontWeight: '800',
   padding: 5,
   color: '#444',
 },
 postImage: {
   backgroundColor: '#eee',
 },
 postInfo: {
   padding: 3,
   alignItems: 'center',
 },
 postButtons: {
   padding: 5,
   flexDirection: 'row',
   flex: 1,
   alignItems: 'center',
 },
 button: {
   flex: 3,
   padding: 5,
   margin: 6,
   borderRadius: 2,
   borderWidth: 1,
   borderColor: '#999',
   alignItems: 'center',
   backgroundColor: '#4285f4',
 },
 info: {
   fontSize: 15,
   color:'black',
   margin:10
 },
 bold: {
   fontWeight: 'bold',
   color:'#2196f3'
 },
 boldd: {
   fontWeight: 'bold',
   fontSize:20

 },
 marker: {
   width: 10,
   height: 10,
   borderRadius: 4,
   backgroundColor: "rgba(130,4,150, 0.9)",
 },
 ring: {
   width: 24,
   height: 24,
   borderRadius: 12,
   backgroundColor: "transparent",
   position: "absolute",
   borderWidth: 1,
   borderColor: "rgba(130,4,150, 0.5)",
 },
TextInputStyleClass:{

textAlign: 'center',
height: 40,
borderWidth: 1,
borderColor: 'grey',
borderRadius: 20 ,
backgroundColor : "#fff"

},
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',

    },
    title1: {
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        color: 'black',
        margin:10,
        fontSize: 25,
        fontWeight: 'bold',

    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'grey',
        fontSize: 13,
        fontStyle: 'italic',
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});
