import React from 'react';//!< Import React component for all react native functionalities
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'; //!< Import various designing tools from react-native mainly for Styling
import * as firebase from "firebase"; //!< Imports necessary component of Firebase


/*!
 * \brief Initial screen as soon as the application starts

 */
export default class LoadingScreen extends React.Component{

    static navigationOptions = {
        title: "Loading",
        header: null
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((authenticate)=>{
            if (authenticate){
                this.props.navigation.replace("Home")
            }else{
                this.props.navigation.replace("SignIn")
            }
        })
    }
    componentWillUnmount(){
    }
  render(){
    return (
      <View style={styles.container}>
       <ActivityIndicator 
       size="large"
       color="green"/>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});//!< Controls various styling for the application
