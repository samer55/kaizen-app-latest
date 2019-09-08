import React, { Component } from 'react';
import {
  StyleSheet,
  Text,ListView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AreaSpline from './js/charts/AreaSpline';
import Pie from './js/charts/Pie';
import Theme from './js/theme';
import data from './resources/data';
import { Container, Header, Content, List, ListItem, Picker, Left, Body, Right, Button ,Card, CardItem,Fab , Thumbnail,
  Col,
  Row,
  Grid,

  Spinner,

Icon,
  Footer,
  Input,
  } from 'native-base';
type State = {
  activeIndex: number,
  spendingsPerYear: any,

  item:0
}
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'
import _ from 'lodash'

@inject("appStore") @observer

export default class Charts extends Component {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0, dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      counter: 1,
         isLoading: true,data:[],
         clicked:true,
         puid:'',item:'',
         isEmpty: false,itemname:'',itemuid:'',
         isFinished: false,
      spendingsPerYear: data.spendingsPerYear,
    };
    this._onPieItem = this._onPieItem.bind(this);
  this.itemsRef = this.getRef()
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
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
           number: child.val().number,
           uid:child.val().puid,
         });
       });

       this.setState({
         dataSource: this.state.dataSource.cloneWithRows(items),data:items
       });

     });
   }
  _onPieItemSelected(newIndex){
    this.setState({...this.state, activeIndex: newIndex, spendingsPerYear: this._shuffle(data.spendingsPerYear)});
  }
_onPieItem(item,uid,name){
  this.setState({item:item,itemname:name,itemuid:uid,clicked:true});
}
  _shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }
  componentDidMount() {
    const uid = this.props.appStore.uid
    const name = this.props.appStore.username
    const newPostKey = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey1 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey2 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey3 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey4 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey5 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey6 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key
    const newPostKey7 = firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).push().key

      firebaseApp.database().ref('chart/'+ `/${name}/` + `/${uid}/` ).on('value',
      (snapshot) => {
        console.log("---- TIMELINE POST RETRIEVED ---- "+ this.state.counter +" - "+ _.toArray(snapshot.val()).length)
        if (snapshot.val()) {
this.listenForItems(this.itemsRef);
        }
        else {
          let updates = {}
          const postData = {
            uid: uid,
            name:'Family',
            puid:newPostKey,
            number:8,
          }
          const postData1 = {
            uid: uid,
            name:'Business/career',
              puid:newPostKey1,
            number:9,
          }
          const postData2 = {
            uid: uid,
              puid:newPostKey2,
            name:'Spirtual',
            number:30,
          }
          const postData3 = {
            uid: uid,
            name:'Body',
              puid:newPostKey3,
            number:50,
          }
          const postData4 = {
            uid: uid,
            name:'Mind/Emotion',
            number:17,
              puid:newPostKey4,
          }
          const postData5 = {
            uid: uid,
            name:'Money/Finance',
              puid:newPostKey5,
            number:60,
          }
          const postData6 = {
            uid: uid,
            name:'Relationship',
              puid:newPostKey6,
            number:30,
          }
          const postData7 = {
            uid: uid,
            name:'Social/Friends/Fun',
              puid:newPostKey7,
            number:44,
          }

          updates['chart/'+ `/${name}/` + `/${uid}/`+newPostKey  ] = postData
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey1 ] = postData1
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey2 ] = postData2
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey3 ] = postData3
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey4 ] = postData4
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey5 ] = postData5
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey6 ] = postData6
          updates['chart/'+ `/${name}/` + `/${uid}/` +newPostKey7 ] = postData7

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'Created! Thank You.',
                            add: '',
                          })


            setTimeout(() => {
            }, 1000)
          })
        }
        this.setState({ isLoading: false })
      })
    }
    updateItem = () => {


            const uid = this.props.appStore.uid
            const name = this.props.appStore.username
    const puid =this.state.itemuid

    const postData = {
      puid:puid,
      uid: uid,
      name:this.state.itemname,
      number:this.state.item,
    }
              let updates = {}

              updates['chart/'+ `/${name}/` + `/${uid}/`+puid ] = postData

              firebaseApp.database().ref().update(updates)
              .then(() => {


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
    const height = 600;
    const width = 500;

    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>Note : Click On The Name To Edit The Percentage When You Improve It. </Text>
      { this.state.clicked  ? <View>
         <Input
         style={{
    flex:1,
    backgroundColor: 'white',
           width: 50,
           fontSize: 12,
          height:50,
           margin: 5
         }}

      placeholder="%"
        value={`${this.state.item}`}
         onChangeText={tweet => this.setState({ item: tweet })}
        />
          { this.state.item > 0  ?  <Button
          transparent
onPress={()=>{this.setState({item:0})
this.updateItem()}}
          style={{ height: 40, width: 94,alignItems:'center',justifyContent:'center',marginTop:10 }}

        >
          <Text style={{ color:"#4286f4" ,alignSelf:'center'}}>
          Save
          </Text>
        </Button>:null}
</View>
         :null}
          <Pie
            pieWidth={150}
            pieHeight={150}
            edits={this._onPieItem}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={this.state.data} />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 21,
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:'white',
    color: 'grey',
    fontWeight:'bold',
  }
}
