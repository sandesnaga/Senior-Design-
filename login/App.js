import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";

import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";

import {createAppContainer } from "react-navigation";
import {createStackNavigator } from "react-navigation-stack"

var firebaseConfig = {
  apiKey: "AIzaSyDTAjbwIVZmH4IQzDsWEMxozQfOcKfRYbU",
  authDomain: "react-native-001-a1f49.firebaseapp.com",
  databaseURL: "https://react-native-001-a1f49.firebaseio.com",
  projectId: "react-native-001-a1f49",
  storageBucket: "",
  messagingSenderId: "569782961777",
  appId: "1:569782961777:web:c24fe204a35712de25bdd0"
};

firebase.initializeApp(firebaseConfig);


const MainNavigator = createStackNavigator(
  {
    Loading: {screen: LoadingScreen},
    SignUp: {screen: SignUpScreen},
    SignIn: {screen: SignInScreen},
    Home: {screen: HomeScreen}

  },

  {
    //Launcher Screen
  initialrouteName: "Loading"
  }
)
const App = createAppContainer(MainNavigator);
export default App;