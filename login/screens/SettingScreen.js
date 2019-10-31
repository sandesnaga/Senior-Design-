import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import Search from "./src/components/Search";
import QRgen from "./QRgen";
import { SafeAreaView } from "react-navigation";

//import icons from 'react-native-vector-icons/Ionicons'

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  static navigationOptions = {
    title: "Settings",
    header: null
  };

 

  
  
  
  render() {
    return (
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.logoconainer}>
         
          <Image
            style={{ width: 160, height: 80 }}
            source={require("../assets/logo.png")}
          />
          <View style={styles.userDetails}>
            <Text> Hey {this.state.name},</Text>
            <Text> You are signed in as: {this.state.email}</Text>

            <Search></Search>
          </View>
        </View>

        <Button
          title="This is Settings"
          style={styles.button}
          full
          rounded
          success          
        ></Button>

<Button style={styles.button}
          title="toHome"
          full
          rounded
          onPress={()=> {
            this.props.navigation.navigate("Home");
          }}
          ><Text style={styles.buttonText}>Back</Text></Button>

<QRgen></QRgen>
</SafeAreaView>

          
          
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    //alignItems: "center",
    // margin: 20,
    //marginHorizontal: 20
    flexDirection: "column"
  },
  bottomContainer: {
    flex: 3,
    flexDirection: "row",
    //alignItems: 'center',
    justifyContent: "center",
    flexWrap: "wrap"
  },
  bottomContainerElements: {
    height: "30%",
    width: "45%",
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: "center",
    height: "10%",
    backgroundColor: "blue",
    marginTop: 100,
    marginBottom: 100
  },
  userDetails: {},

  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  }
});
