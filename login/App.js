/*!
 * \author Sudip Kandel 
 * \author Sandes Naga 
 * \author Utsab Acharya
 * \author Bhaskar Acharya
 * \author Tara Gurung

 * \version 1.0
 * \date 2019-11-30
 * \mainpage This version is working perfectly fine
 * \section Shelf_in_your_Pocket
 * Here I would describe how to compile and run this code
 * \subsection Step1 install necessary component
 * Installation of node js required
 * \subsection Step2 Starting this program
 * 'npm start' to start the program in local host 
*/

//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase"; //!< Imports necessary component of Firebase

import HomeScreen from "./screens/HomeScreen"; //!< Importing Home Screen from same directory for navingation Stack
import LoadingScreen from "./screens/LoadingScreen"; //!< Importing Loading Screen from same directory for navingation Stack
import SignUpScreen from "./screens/SignUpScreen";//!< Importing Signup Screen from same directory for navingation Stack
import SignInScreen from "./screens/SignInScreen";//!< Importing SignIn Screen from same directory for navingation Stack
import AddingItemScreen from "./screens/AddingItemScreen";//!< Importing Adding Item Screen from same directory for navingation Stack
import AllocateSpaceScreen from "./screens/AllocateSpaceScreen";//!< Importing Allocate Space Screen from same directory for navingation Stack
import ItemsListScreen from "./screens/ItemsListScreen";//!< Importing Item List Screen from same directory for navingation Stack
import ManualEntryScreen from "./screens/ManualEntryScreen"; //!< Importing Manual Entry Screen from same directory for navingation Stack
import ScanInventoryScreen from "./screens/ScanInventoryScreen";//!< Importing Scan Inventory Screen from same directory for navingation Stack
import SettingScreen from "./screens/SettingScreen";//!< Importing Setting Screen from same directory for navingation Stack
import AddShelfScreen from "./screens/AddShelfScreen";//!< Importing Adding Shelf Screen from same directory for navingation Stack
import Search from "./screens/src/components/Search";//!< Importing Scearch component from same directory for navingation Stack
import barcode from "./screens/src/components/barcode"; //!< Importing barcode scanner from same directory for navingation Stack
import QRgen from "./screens/QRgen"; //!< Importing QR generator Screen from same directory for navingation Stack
import ForgotPassword from './screens/ForgotPassword'; //!< Importing Forgot password Screen from same directory for navingation Stack

import {createAppContainer} from "react-navigation"; //!< importing createAppContainer for back and home button in the header of application
import {createStackNavigator} from "react-navigation-stack"; //<! importing Navigator stack for navigation of screen
import Listitemview from "./screens/src/components/Listitemview";//!< Importing Listing Item Screen from same directory for navingation Stack
import ChangePassword from './screens/ChangePassword'; //!< Importing Change password Screen from same directory for navingation Stack
import EditInfo from './screens/EditInfo'; //!< Importing Edit Information Screen from same directory for navingation Stack

var firebaseConfig = {
  apiKey: "AIzaSyDA4EsnzczJGTe9LFD07CJ_ioLiKuYEwP8",
  authDomain: "pocketshelf-80c0b.firebaseapp.com",
  databaseURL: "https://pocketshelf-80c0b.firebaseio.com",
  projectId: "pocketshelf-80c0b",
  storageBucket: "",
  messagingSenderId: "568679507924",
 };
 firebase.initializeApp(firebaseConfig); //!< Gives the default Configuration for firebase

/*!
 * \brief Creates the Stack on the Navigator of the Screen
 */
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
    AddShelf : {screen: AddShelfScreen},
    Search: {screen: Search},
    barcode: {screen: barcode},
    QRgen: {screen: QRgen},
    Listitemview: {screen: Listitemview},
    ForgotPassword: { screen: ForgotPassword },
    ChangePassword: { screen: ChangePassword },
    EditInfo: { screen: EditInfo }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
 
  },

  {
    //Launcher Screen
  initialrouteName: "Loading"
  }
) 
const App = createAppContainer(MainNavigator); //!< Creates the container for Navigator
export default App; //!< Loads this class before any action
