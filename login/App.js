import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";

import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import AddingItemScreen from "./screens/AddingItemScreen";
import AllocateSpaceScreen from "./screens/AllocateSpaceScreen";
import ItemsListScreen from "./screens/ItemsListScreen";
import ManualEntryScreen from "./screens/ManualEntryScreen";
import ScanInventoryScreen from "./screens/ScanInventoryScreen";
import SettingScreen from "./screens/SettingScreen";
import AddShelfScreen from "./screens/AddShelfScreen";


import {createAppContainer } from "react-navigation";
import {createStackNavigator } from "react-navigation-stack"


var firebaseConfig = {
  apiKey: "AIzaSyDA4EsnzczJGTe9LFD07CJ_ioLiKuYEwP8",
  authDomain: "pocketshelf-80c0b.firebaseapp.com",
  databaseURL: "https://pocketshelf-80c0b.firebaseio.com",
  projectId: "pocketshelf-80c0b",
  storageBucket: "",
  messagingSenderId: "568679507924",
 };
 firebase.initializeApp(firebaseConfig);


const MainNavigator = createStackNavigator(
  {
    Loading: {screen: LoadingScreen},
    SignUp: {screen: SignUpScreen},
    SignIn: {screen: SignInScreen},
    Home: {screen: HomeScreen},
    AddingItem: {screen: AddingItemScreen},
    AllocateSpace: {screen: AllocateSpaceScreen},
    ItemList: {screen: ItemsListScreen},
    ManualEntry: {screen: ManualEntryScreen},
    ScanInventory: {screen: ScanInventoryScreen},
    Settings: {screen: SettingScreen},
    AddShelf : {screen: AddShelfScreen}


  },

  {
    //Launcher Screen
  initialrouteName: "Loading"
  }
)
const App = createAppContainer(MainNavigator);
export default App;