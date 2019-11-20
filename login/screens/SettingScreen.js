import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,

} from "react-native";
import {Button} from 'native-base';
import * as firebase from "firebase";
import Search from "./src/components/Search";
import { Appbar } from "react-native-paper";

//import icons from 'react-native-vector-icons/Ionicons'

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName,
          
        });
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
  }
  componentWillUnmount(){}
  static navigationOptions = {
    title: "Settings",
    header: null
  };

  render() {
    return (
      <View style={styles.topContainer}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          />
          <Appbar.Content title= {this.state.name} subtitle={this.state.email} />
        </Appbar.Header>
        <View style={styles.logoconainer}>
          <Image
            style={{ width: 160, height: 80 }}
            source={require("../assets/logo.png")}
          />
          
        </View>
        

        

        <Button
          style={styles.button}         
          full
          rounded
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Button>

       

      </View>
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
    justifyContent: "center",
    alignItems: "center"
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
    
  }
});
