import React, { Component } from 'react';
import {
  Text,
  View,
  Image,Linking,LinkingIOS,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';

import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';

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
import { Thumbnail } from 'native-base';
import { firebaseApp } from '../firebase'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react/native'
import firebase from 'firebase'

@inject("appStore") @observer

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton handleButtonPress={() => navigation.navigate('LogIn')} location="right" color={colors.white} text="Log In" />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  static onFacebookPress() {
    alert('Facebook button pressed');
  }

  static onCreateAccountPress() {
    alert('Create Account button pressed');
  }

  static onMoreOptionsPress() {
    alert('More options button pressed');
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>

          <Image  style={{alignSelf: 'center',margin: 10,width: 150,height:150 }} borderRadius={15} source={require("../assets/checked.png")} />
          <Text style={{fontSize: 27,fontWeight: 'bold',alignSelf: 'center',margin: 10,color:'#4286f4'}}>
            Kaizen Karta
          </Text>

          <RoundedButton
            text="Sign in"
            textColor={colors.blue}
            background={colors.white}

            handleOnPress={()=>{this.props.navigation.navigate('login')}}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.black}
            handleOnPress={()=>{this.props.navigation.navigate('signup')}}
          />


          <View style={styles.termsAndConditions}>
            <Text style={styles.termsText}>
              By tapping Continue, Create Account
            </Text>

            <Text style={styles.termsText}>
              {"I agree to Kaizen Karta App's "}
            </Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text onPress={() => Linking.openURL('https://app.termly.io/document/privacy-policy/563d76bd-5825-41df-8312-f4526fdefafc')} style={styles.termsText}>
                Terms of Service
              </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>
              ,
            </Text>


            <TouchableHighlight style={styles.linkButton}>
              <Text onPress={() => Linking.openURL('https://app.termly.io/document/privacy-policy/563d76bd-5825-41df-8312-f4526fdefafc')} style={styles.termsText}>
                 Privacy Policy
              </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>
              and Three Days Trial FREE
            </Text>
            <Text style={styles.termsText}>
              .
            </Text>
            <Text style={styles.termsText}>
            copyrights 2019

            </Text>
            <Text style={styles.termsText}>
              .
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
let termsTextSize = 13;
let headingTextSize = 30;


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: colors.lightBlack,
    fontWeight: '300',
    marginBottom: 40,
  },
  facebookButtonIcon: {
    color: colors.green01,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  moreOptionsButton: {
    marginTop: 10,
  },
  moreOptionsButtonText: {
    color: colors.black,
    fontSize: 16,
  },
  termsAndConditions: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 30,
  },
  termsText: {
    color: colors.black,
    fontSize: termsTextSize,
    fontWeight: '600',
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
});
