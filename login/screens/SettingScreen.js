import React from "react"; //!< Import React component for all react native functionalities
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native"; //!< Import various designing tools from react-native mainly for Styling
import { Button } from "native-base"; //!< Import various designing tools from native-base mainly for Styling Buton
import * as firebase from "firebase"; //!< Imports necessary component of Firebase
import Search from "./src/components/Search"; //!< Imports search component to setting screen
import { Appbar } from "react-native-paper";

//import icons from 'react-native-vector-icons/Ionicons'


/*!
 * \brief User can change Their password Email or User Name
 * \param name Name of the user
 * \param date DOB of the user
 * \param email Email of the user
 * \param password Password of the user
 */
export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.props.navigation.replace("ChangePassword");
  };

  // Changes user's Info...
  onEditInfoPress = () => {
    this.props.navigation.replace("EditInfo");
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName
        });
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
  }
  componentWillUnmount() {}
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
          <Appbar.Content title={this.state.name} subtitle={this.state.email} />
        </Appbar.Header>
        <View style={styles.logoContainer}>
          <Button onPress={this.onChangePasswordPress} style={styles.button}>
            <Text style={{alignContent:"center"}}>Change Password..</Text>
          </Button>
          <Button onPress={this.onEditInfoPress} style={styles.button}>
            <Text>Change Info..</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: "#393636",
    flexDirection: "column"
  },
  button: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5
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
    marginTop: 100,
    marginBottom: 100
  },
  userDetails: {},

  button: {
    marginTop: 20,
    width: "90%",
    marginLeft: "6%",
    paddingLeft:"30%"
  },
  buttonText: {},
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 20,
    padding: 10,
    height: 40,
    alignSelf: "stretch",
    fontSize: 18
  }
});//!< Controls various styling for the application
