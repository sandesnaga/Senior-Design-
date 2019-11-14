import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";
import Search from "./src/components/Search";
import { Appbar } from "react-native-paper";

export default class ItemsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      dob: "",
      itemname:'',
      quantity:'1',
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
  static navigationOptions = {
    title: "ItemList",
    header: null
  };

  render() {
    return (
      <View style={styles.topContainer}>
         <KeyboardAwareScrollView style={styles.form}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          />
          <Appbar.Content title={this.state.name} subtitle={this.state.email} />
        </Appbar.Header>
        <Search></Search>
        <View>
        <Text>Item Name</Text>
            { <TextInput
              style={styles.input}
              placeholder={"Item you Grab"}
              onChangeText={itemname => {this.setState({itemname})}}
            ></TextInput> 
            }

          <Text>Quantity </Text>
            { <TextInput
              style={styles.input}
              keyboardType = 'numeric'
              placeholder={"How many you took ?"}
              onChangeText={quantity => {this.setState({quantity})}}
            ></TextInput> 
            }
          
         
        </View>
        </KeyboardAwareScrollView>
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

  input: {
    marginBottom: 10,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  }
});
