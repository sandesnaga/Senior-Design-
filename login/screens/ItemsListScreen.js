import React from "react";//!< Import React component for all react native functionalities
import { StyleSheet, Text, View, TextInput } from "react-native"; //!< Import various designing tools from react-native mainly for Styling
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";//!< Imports necessary component of Firebase
import Search from "./src/components/Search";//!< Imports search component in this screen
import Listitemview from "./src/components/Listitemview";//!< Imports listitem component of this screen
import { Appbar } from "react-native-paper";



/*!
 * \brief Show the item available on the shelf
 * \param name Name of the user
 * \param email Email of the user
 * \param temp search key word that user is looking for
 * \param uid UID of current user
 * \paam quantity Quantity of the item remaining in the shelf
 */
export default class ItemsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      dob: "",
      itemname: "",
      quantity: "1"
    };
  }

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
            <Appbar.Content
              title={this.state.name}
              subtitle={this.state.email}
            />
          </Appbar.Header>
          <Search></Search>
          <View>
            <Listitemview></Listitemview>
          </View>
        </KeyboardAwareScrollView>
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
});//!< Controls various styling for the application
