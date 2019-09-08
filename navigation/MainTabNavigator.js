import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createSwitchNavigator } from 'react-navigation';
import Searchscreen from '../screens/Searchscreen';
import Representatives from '../components/repre'
import RepProfile from '../components/Repprofile'
import Doctors from '../components/doctors'
import Docpro from '../components/doctorPro'
import Subject from '../components/subject'
import Subpage from '../components/subpage'
import Miss from '../components/miss'
import Event from '../screens/event';
import Help from '../screens/help';
import Hijjawi from '../screens/building/hijjawi';
import Library from '../screens/building/library';
import Science from '../screens/building/science';
import Reply from '../components/reply'
import Pland from '../components/pland'
import NewQuote from '../components/newquote'
import Check from '../components/payment0'

import Login from '../screens/Login';
import Signup from '../screens/signup';
import Profile from '../screens/profile';
import Settings from '../components/settings'
import ProfileE from '../components/profile'
import Payment from '../components/payment'
import Invite from '../components/invite'
import Notes from '../components/notes'
import Albums from '../components/albums'
import Begratful from '../components/begratful'
import Deadline from '../components/deadline'
import Deadnotes from '../components/deadnotes'
import Charts from '../components/chart'
import Daily from '../components/daily'
import Plan from '../components/plan'
import Date from '../components/date'
import Feedback from '../components/feedback'
import Forgot from '../screens/forgot'
import Loading from '../screens/loading';
import Feeduser from '../components/feeduser';
import Users from '../components/users';

import Search from '../components/search'
import Goals from '../components/Goals'
import Goalsnote from '../components/Goalsnote'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Sgoals from '../components/sgoals'
import SDaily from '../components/sdaily'
import SNotes from '../components/snotes'
import SBegratful from '../components/sbegratful'
import SDeadnotes from '../components/sdeadnotes'
import Up from '../components/Pimg'

import News from '../screens/News';
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  SNotes:SNotes,
  SDeadnotes:SDeadnotes,
  SBegratful:SBegratful,
  Sgoals:Sgoals,
  Up:Up,
  SDaily:SDaily,
  Daily:Daily,
  Deadline:Deadline,
  Deadnotes:Deadnotes,
  Date:Date,
  Feeduser:Feeduser,
  Plan:Plan,
  Search:Searchscreen,
  Charts:Charts,
  repre:Representatives,
  Albums:Albums,
  Begratful:Begratful,
  Pland:Pland,
  Feedback:Feedback,
  Notes:Notes,
  Search:Search,
  Goals:Goals,
  Reppro:RepProfile,
  Invite:Invite,
  NewQuote:NewQuote,
  Goalsnote:Goalsnote,
  doctor:Doctors,
  Settings:Settings,
  subject:Subject,
  subpage:Subpage,
  Payment:Payment,
  doctorpro:Docpro,
  profile:ProfileE,
  miss:Miss,
  event:Event,
  help:Help,
  hij:Hijjawi,
  Users:Users,
  sci:Science,
  reply:Reply,
  map:LinksScreen,
  lib:Library,
});

HomeStack.navigationOptions = {
  backBehavior: 'none',
tabBarOptions: {
    showLabel: false
},
tabBarIcon: ({ tintColor }) => (
  <Feather name="home" size={30} color={tintColor} />
)
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  Search:Searchscreen,
  repre:Representatives,
  Reppro:RepProfile,
  doctor:Doctors,
  subject:Subject,
  subpage:Subpage,
  doctorpro:Docpro,
  miss:Miss,
  event:Event,
  help:Help,
  hij:Hijjawi,
  sci:Science,

  lib:Library,
});

LinksStack.navigationOptions = {
  backBehavior: 'none',
tabBarOptions: {
    showLabel: false
},
tabBarIcon: ({ tintColor }) => (
  <MaterialIcons name="location-on" size={30} color={tintColor} />
)
};

const Newsstack = createStackNavigator({
  news: News,
});

Newsstack.navigationOptions = {
  backBehavior: 'none',
tabBarOptions: {
    showLabel: false
},
  tabBarLabel: null,
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons name="newspaper" size={30} color={tintColor} />
  )
};


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  login:Login,
  Forgot:Forgot,
  signup:Signup,

});

SettingsStack.navigationOptions = {
  backBehavior: 'none',
tabBarOptions: {
    showLabel: false
},
  tabBarLabel: null,
  tabBarIcon: ({ tintColor }) => (
    <Feather name="user" size={30} color={tintColor} />
  )
};
export default  createSwitchNavigator(
  {
    loading:Loading,
    login:SettingsStack,
    Home:HomeStack,
check:Check,

    profile: Profile,


  }

);
