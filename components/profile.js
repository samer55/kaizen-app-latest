import React, { Component } from 'react';
import {
  Text,
  View,
  Image,Dimensions,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../components/Input';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import DropdownAlert from 'react-native-dropdownalert';

import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import Notification from '../components/Notification';

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
import PhoneInput from 'react-native-phone-input'
const { height, width } = Dimensions.get('window')
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

export default class Signup extends Component {
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

   constructor(props) {
     super(props);
     this.state = {
       formValid: true,
       first:'',
       last:'',
       email:'',
       phone:'',
       validEmail: false,
       emailAddress: '',
       password: '',
       validPassword: false,
       loadingVisible: false,
     };

     this.handleEmailChange = this.handleEmailChange.bind(this);

     this.handleCloseNotification = this.handleCloseNotification.bind(this);
     this.handleNextButton = this.handleNextButton.bind(this);
     this.handlePasswordChange = this.handlePasswordChange.bind(this);
     this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
   }
   componentDidMount() {
     firebaseApp.auth().onAuthStateChanged(user => {
         if (user) {
       console.log("--------- LOGGED AS " + user.displayName + " ---------")
       this.props.appStore.username =user.displayName
  this.props.appStore.user = user
               this.props.appStore.uid =user.uid
               firebaseApp.database().ref('users/' + user.uid).on('value',
               (snapshot) => {
                 val = snapshot.val()
                 if (snapshot.val()) {
                   this.setState({

 first:val.first,
  last:val.last,
   email:val.email,
   phone:val.phone,
                   })
                     console.log("--------- first name  " + this.state.first + " ---------"+user.uid)
                 }

               })

             }
     })

   }
   handleNextButton() {

     const { logIn, navigation } = this.props;
     const { navigate } = navigation;
if(this.state.emailAddress == 0)
this.setState({ loadingVisible: true,formValid: false });
else {
  this.setState({ loadingVisible: true,formValid: true });
}
if(this.state.password == 0)
this.setState({ loadingVisible: true,formValid: false });
else {
  this.setState({ loadingVisible: true,formValid: true });
}
   }

   handleCloseNotification() {
     this.setState({ formValid: true });
   }


   handlePasswordChange(password) {
     const { validPassword } = this.state;

     this.setState({ password });

     if (!validPassword) {
       if (password.length > 4) {
         // Password has to be at least 4 characters long
         this.setState({ validPassword: true });
       }
     } else if (password <= 4) {
       this.setState({ validPassword: false });
     }
   }
   handleEmailChange(email) {
     this.dropDownAlertRef.alertWithType('error', 'Error',"Sorry, you can not change email,phone or username");

   }
   toggleNextButtonState() {
     const { validEmail, validPassword } = this.state;
     if (validEmail && validPassword) {
       return false;
     }
     return true;
   }
   _logOut = () => {
     firebaseApp.auth().signOut()
     .then(() => {
     this.props.navigation.navigate('Loading');
     }, function(error) {
       console.log(error)
     });
   }

  render() {
    const uri = "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

    const { disabled, handleNextButton } = this.props;
  const opacityStyle = disabled ? 0.2 : 0.6;
    const {
    formValid, loadingVisible, validEmail, validPassword,
  } = this.state;
  const showNotification = !formValid;
  const background = formValid ? colors.white : colors.darkOrange;
  const notificationMarginTop = showNotification ? 10 : 0;
    return (
      <KeyboardAvoidingView
       style={[{ backgroundColor: background }, styles.wrapper]}
       behavior="padding"
     >
     <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

       <View style={styles.scrollViewWrapper}>
         <ScrollView style={styles.scrollView}>
<View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
           <Text style={styles.loginHeader}>
Create {this.state.errMsg}
           </Text>
           <Button style={{alignSelf: 'flex-end',padding: 25}} onPress={this._handleSave} bordered dark>
                  <Text style={{fontWeight: '500',fontSize: 15}}>Save</Text>
                </Button>
           </View>
           <Thumbnail style={{alignSelf:'flex-end'}} source={{uri: uri}} />
           <InputField
             labelText="First Name"
             labelTextSize={14}
             labelColor={colors.lightBlack}
             placeholder={this.state.first}
             textColor={colors.lightBlack}
             inputType='text'
             borderBottomColor={colors.lightBlack}
             customStyle={{ marginBottom: 30 }}
             onChangeText={tweet => this.setState({ first: tweet })}
             showCheckmark={validEmail}

           />
           <InputField
             labelText="Last Name"
             labelTextSize={14}
             labelColor={colors.lightBlack}
             textColor={colors.lightBlack}
             inputType='text'

             placeholder={this.state.last}
             borderBottomColor={colors.lightBlack}
             customStyle={{ marginBottom: 30 }}
             onChangeText={tweet => this.setState({ last: tweet })}
             showCheckmark={validEmail}

           />
           <InputField
             labelText="PASSWORD"
             labelTextSize={14}
             labelColor={colors.lightBlack}
             textColor={colors.lightBlack}
             borderBottomColor={colors.lightBlack}
             inputType="password"

             customStyle={{ marginBottom: 30 }}
             onChangeText={this.handlePasswordChange}
             showCheckmark={validPassword}
           />
           <Text style={{fontSize: 17,fontWeight: '500',textDecorationLine: 'underline'}}>
          Username: {this.props.appStore.username}
           </Text>
           <Text style={{fontSize: 17,fontWeight: '500',textDecorationLine: 'underline'}}>
          EMAIL ADDRESS: {this.state.email}
           </Text>
           <Text style={{fontSize: 17,fontWeight: '500',textDecorationLine: 'underline'}}>
          Phone number: {this.state.phone}
           </Text>


           <Button onPress={this._logOut} danger style={{alignSelf:'center',justifyContent:'center',padding:25,width:width,marginTop:20,marginBottom:10}}><Text style={{textAlign:'center',color:'white'}}> Log Out </Text></Button>

         </ScrollView>

       </View>


     </KeyboardAvoidingView>
    );
  }
  _handleSave = () => {
  console.log("USER EDIT SAVING...")
  this.dropDownAlertRef.alertWithType('warning', 'Loading',"Saving...");

if (this.state.first  ) {
    if (this.state.first.length ===0) {
      this.setState({ errMsg: "please change your first name or last." })
    }
    else {
firebaseApp.database().ref('users').child(this.props.appStore.uid).update({first:this.state.first})
      .then(() => {
        this.setState({ errMsg: "first name succesfully saved!" })
      })
      .catch((error) => {
        this.setState({ errMsg: error.message })
      })
    }
  }
  if (this.state.last  ) {
      if (this.state.last.length ===0) {
        this.setState({ errMsg: "please change your last name or last." })
      }
      else {
  firebaseApp.database().ref('users').child(this.props.appStore.uid).update({last:this.state.last})
        .then(() => {
          this.setState({ errMsg: "Last name succesfully saved!" })
        })
        .catch((error) => {
          this.setState({ errMsg: error.message })
        })
      }
    }
  if (this.state.password) {
    if (this.state.password.length < 6) {
      setTimeout(() => {
        this.dropDownAlertRef.alertWithType('error', 'Error', "Your password should be at least 6 characters.");
      }, 3000)
    }
    else {
      setTimeout(() => {
        this.dropDownAlertRef.alertWithType('error', 'Error',"Saving your new password...");

      }, 3000)
      firebaseApp.auth().currentUser.updatePassword(this.state.password)
      .then(() => {
        this.dropDownAlertRef.alertWithType('error', 'Error',"Password succesfully saved!");

        setTimeout(() => {
          this.dropDownAlertRef.alertWithType('error', 'Error',"Password succesfully saved!");
        }, 3000)

      })
      .catch((error) => {
        this.setState({ errMsg: error.message })
        this.dropDownAlertRef.alertWithType('error', 'Error',error.message);

      })
    }
  }
}

}
let termsTextSize = 13;
let headingTextSize = 30;


const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,

  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,paddingBottom:20,
    flex: 1,
  },
  loginHeader: {
    fontSize: headingTextSize,
    color: colors.black,
    fontWeight: '300',
    marginBottom: 40,
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonWrapper: {
   alignItems: 'flex-end',
   right: 20,
   bottom: 20,
   paddingTop: buttonWrapperPadding,
 },
 button: {
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 50,
   width: buttonSize,
   height: buttonSize,
   backgroundColor: colors.lightGray,
 },
 icon: {
   marginRight: -2,
   marginTop: -2,
 },
});
