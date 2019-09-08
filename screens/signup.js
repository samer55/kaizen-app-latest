import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../components/Input';

import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import Notification from '../components/Notification';
import PhoneInput from 'react-native-phone-input'

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
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

export default class ProfileE extends Component {
  static navigationOptions = ({ navigation }) => ({
     headerRight: <NavBarButton
       handleButtonPress={() => navigation.navigate('ForgotPassword')}
       location="right"
       color={colors.lightBlack}
       text="Forgot Password"
     />,
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
       username:'',
       email:''     , valid: "",
      type: "",
      value: "",

       phone:'',
       validEmail: false,
       emailAddress: '',
       password: '',
       validPassword: false,
       loadingVisible: false,
     };
     this.updateInfo = this.updateInfo.bind(this);
     this.renderInfo = this.renderInfo.bind(this);
     this.handleCloseNotification = this.handleCloseNotification.bind(this);
     this.handleEmailChange = this.handleEmailChange.bind(this);
     this.handleNextButton = this.handleNextButton.bind(this);
     this.handlePasswordChange = this.handlePasswordChange.bind(this);
     this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
   }

   handleNextButton() {

     const { logIn, navigation } = this.props;
     const { navigate } = navigation;
this.props.navigation.navigate('Home')
   }
   PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
               this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
            }
   handleCloseNotification() {
     this.setState({ formValid: true });
   }

   handleEmailChange(email) {
     // eslint-disable-next-line
     const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     const { validEmail } = this.state;
     this.setState({ emailAddress: email });

     if (!validEmail) {
       if (emailCheckRegex.test(email)) {
         this.setState({ validEmail: true });
       }
     } else if (!emailCheckRegex.test(email)) {
       this.setState({ validEmail: false });
     }
   }
   _handleSignUp = () => {
     this.updateInfo()
     this.setState({errMsg: 'Signing Up...'})
     if (this.state.first.length < 2) {
       this.setState({errMsg: "Your First name should be at least 2 characters.",formValid: false})
       setTimeout(function(){
            this.setState({formValid:true});
       }.bind(this),3000);
     }
  else   if (this.state.last.length == 0) {
       this.setState({errMsg: "Add last name",formValid: false})
       setTimeout(function(){
            this.setState({formValid:true});
       }.bind(this),3000);
     }
    else  if (this.state.username.length == 0) {
        this.setState({errMsg: "Please Add username",formValid: false})
        setTimeout(function(){
             this.setState({formValid:true});
        }.bind(this),3000);
      }
     else if (this.state.email.length == 0) {
       this.setState({errMsg: "Please enter your email.",formValid: false})
       setTimeout(function(){
            this.setState({formValid:true});
       }.bind(this),3000);
     }
     else if (this.state.password.length == 0) {
       this.setState({errMsg: "Please enter your passowrd.",formValid: false})
       setTimeout(function(){
            this.setState({formValid:true});
       }.bind(this),3000);
     }
     else {
        firebaseApp.database().ref('usernameList').child(this.state.username.toLowerCase()).once('value', (snapshot) => {
          if (snapshot.val()) {
            this.setState({ errMsg: "Username not available.",formValid: false })
            setTimeout(function(){
                 this.setState({formValid:true});
            }.bind(this),3000);
          }
          else {
            firebaseApp.database().ref('phoneList').child(this.state.value).once('value', (snapshot) => {
              if (snapshot.val()) {
                this.setState({ errMsg: "Phone number not available." ,formValid: false})
                setTimeout(function(){
                     this.setState({formValid:true});
                }.bind(this),3000);
              }
              else {
           firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)

           .then((user) => {
             const userId = firebaseApp.auth().currentUser.uid;
             const userem = firebaseApp.auth().currentUser.email;

             firebaseApp.database().ref('usernameList').child(this.state.username.toLowerCase()).set(userId)
firebaseApp.database().ref('phoneList').child(this.state.value).set(userId)
             firebaseApp.auth().currentUser.updateProfile({displayName: `${this.state.first} ${this.state.last}`})
             .then(() => {
               const userId = firebaseApp.auth().currentUser.uid;
 const first = this.state.first
 const last =this.state.last
               const imagep = 'https://www.uccs.edu/recwellness/sites/recwellness/files/2018-09/download.jpeg'
               const post_count = 0
               const username= this.state.username
               const chat_count = 0
               const phone =this.state.value
               const date =firebase.database.ServerValue.TIMESTAMP
               const order_count = 0
               const email = firebaseApp.auth().currentUser.email;
               firebaseApp.database().ref('users/' + userId)
               .set({
               userId,
               date,
               phone,
               username,
               imagep,
               first,
               last,
                 email,
               })

               this.props.navigation.navigate('Home')
             }, function(error) {
                 this.setState({ errMsg: error.message,formValid: false });
                 setTimeout(function(){
                      this.setState({formValid:true});
                 }.bind(this),3000);
             });
           })
           .catch((error) => {
             this.setState({ errMsg: error.message,formValid: false });
             setTimeout(function(){
                  this.setState({formValid:true});
             }.bind(this),3000);
           })
         }
           })
         }
       })
     }
   }

     updateInfo() {
       this.setState({
         valid: this.phone.isValidNumber(),
         type: this.phone.getNumberType(),
         value: this.phone.getValue()
       });
     }
  renderInfo() {
   if (this.state.value) {
     return (
       <View style={styles.info}>
         <Text>
           Is Valid:{" "}
           <Text style={{ fontWeight: "bold" }}>
             {this.state.valid.toString()}
           </Text>
         </Text>
         <Text>
           Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
         </Text>
         <Text>
           Value:{" "}
           <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
         </Text>
       </View>
     );
   }
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

   toggleNextButtonState() {
     const { validEmail, validPassword } = this.state;
     if (validEmail && validPassword) {
       return false;
     }
     return true;
   }
  render() {
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
       <View style={styles.scrollViewWrapper}>
         <ScrollView style={styles.scrollView}>
           <Text style={styles.loginHeader}>
Create
           </Text>
           {formValid ?
             <Text style={{color:'red',fontSize: 17}}>{this.state.errMsg}</Text>
:
<Text style={{color:'white',fontSize: 17}}>{this.state.errMsg}</Text>

           }

           <InputField
             labelText="First Name"
             labelTextSize={14}
             labelColor={colors.lightBlack}
             textColor={colors.lightBlack}
             borderBottomColor={colors.lightBlack}
                inputType="email"
             customStyle={{ marginBottom: 30 }}
             onChangeText={(text) => this.setState({ first: text })}
             showCheckmark={validEmail}
             autoFocus
           />
           <InputField
             labelText="Last Name"
             labelTextSize={14}
             labelColor={colors.lightBlack}
                inputType="email"
             textColor={colors.lightBlack}
             borderBottomColor={colors.lightBlack}
             customStyle={{ marginBottom: 30 }}
               onChangeText={(text) => this.setState({ last: text })}
             showCheckmark={validEmail}

           />
           <InputField
             labelText="Username"
                inputType="email"
             labelTextSize={14}
             labelColor={colors.lightBlack}
             textColor={colors.lightBlack}
             borderBottomColor={colors.lightBlack}
             customStyle={{ marginBottom: 30 }}
             onChangeText={(text) => this.setState({ username: text })}
             showCheckmark={validEmail}

           />
           <PhoneInput
                 ref={ref => {
                   this.phone = ref;
                 }}
               />

           <InputField
             labelText="EMAIL ADDRESS"
             labelTextSize={14}
             labelColor={colors.lightBlack}
             textColor={colors.lightBlack}
             borderBottomColor={colors.lightBlack}
             inputType="email"
             customStyle={{ marginBottom: 30 }}
           onChangeText={(text) => this.setState({ email: text })}
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
         </ScrollView>
         <View style={styles.buttonWrapper}>
      <TouchableHighlight
        style={[{ opacity: opacityStyle }, styles.button]}
        onPress={this._handleSignUp}
        disabled={disabled}
      >
        <Icon
          name="angle-right"
          color={colors.blue}
          size={32}
          style={styles.icon}
        />
      </TouchableHighlight>
    </View>
       </View>

       <View style={[styles.notificationWrapper, { marginTop: notificationMarginTop }]}>
         <Notification
           showNotification={showNotification}
           handleCloseNotification={this.handleCloseNotification}
           type="Error"
           firstLine={this.state.errMsg}

         />
       </View>
     </KeyboardAvoidingView>
    );
  }
}
let termsTextSize = 13;
let headingTextSize = 30;


const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  }, buttons: {
    marginTop: 20,
    padding: 10
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,

  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
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
