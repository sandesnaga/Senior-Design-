import React from "react"; //!< Import React component for all react native functionalities
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  YellowBox
} from "react-native"; //!< Import various designing tools from react-native mainly for Styling
import * as firebase from "firebase"; //!< Imports necessary component of Firebase
import { Appbar } from "react-native-paper";
import { Icon } from "react-native-elements";

/*!
 * \brief Show the initial screen when user login with valid user email and password
 * \param name Name of the user
 * \param date DOB of the user
 * \param email Email of the user
 */
export default class HomeScreen extends React.Component {
  constructor(props) {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    super(props);

    this.state = {
      name: "",
      email: "",
      dob: "00-00-0000",
      uid: ""
    };
  }

  static navigationOptions = {
    title: "Home",
    header: null
  };

  gotoAddItem = () => {
    this.props.navigation.replace("AddingItem");
  };
  itemsList = () => {
    this.props.navigation.replace("ItemList");
  };
  manualEntry = () => {
    this.props.navigation.replace("ManualEntry");
  };
  scanInventory = () => {
    this.props.navigation.replace("ScanInventory");
  };
  allocateSpace = () => {
    this.props.navigation.replace("AllocateSpace");
  };
  settings = () => {
    this.props.navigation.replace("Settings");
  };

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName
        });
        var user = firebase.auth().currentUser;
        var uid = user.uid;

        var doblist = firebase.database().ref("user_more_info");
        doblist.once("value", dataSnapShot => {
          if (dataSnapShot.val()) {
            let dobobj = Object.values(dataSnapShot.val());
            for (var i = 0; i < dataSnapShot.numChildren(); i++) {
              if (dobobj[i].uid == uid) {
                self.updatedob(dobobj[i].DOB);
                return true;
              }
            }
            return true;
          }
        });
      } else {
        this.props.navigation.replace("SignIn");
        return true;
      }
    });
    return true;
  }
  componentWillUnmount() {}

  updatedob = dob => {
    this.setState({ dob: dob });
  };

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signedout");
        console.log("dob=" + this.state.dob);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  onPress = () => {
    alert("clicked");
  };

  render() {
    return (
      <View style={styles.topContainer}>
        <Appbar.Header>
          <Appbar.Content title={this.state.name} subtitle={this.state.dob} />
          <Appbar.Action icon="logout" onPress={this.signOutUser} />
        </Appbar.Header>

        <View>
          <ImageBackground
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            source={require("../assets/images/background.png")}
          >
            <View
              style={{ flex: 1, backgroundColor: "rgba(133, 126, 237, .4)" }}
            >
              <View style={styles.bottomContainer}>

                <View style={styles.bottomContainerElements}>
                  <TouchableOpacity onPress={this.gotoAddItem}>
                    <Icon
                      raised
                      reverse
                      name="plus"
                      type="font-awesome"
                      color="#C3C3E5"
                      size={40}
                    ></Icon>
                    <Text style={styles.textStyle}>Add Item</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottomContainerElements}>

                  <TouchableOpacity onPress={this.allocateSpace}>
                    <Icon
                      raised
                      reverse
                      name="columns"
                      type="font-awesome"
                      color="#C3C3E5"
                      size={40}
                    />
                    <Text style={styles.textStyle}>Allocate Space</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottomContainerElements}>
                  <TouchableOpacity onPress={this.itemsList}>
                    <Icon
                      raised
                      reverse
                      name="database"
                      type="font-awesome"
                      color="#C3C3E5"
                      size={40}
                    />
                    <Text style={styles.textStyle}>Items List</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomContainerElements}>
                  <TouchableOpacity onPress={this.manualEntry}>
                    <Icon
                      raised
                      reverse
                      name="edit"
                      type="font-awesome"
                      color="#C3C3E5"
                      size={40}
                    />
                    <Text style={styles.textStyle}>Manual entry</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomContainerElements}>
                  <TouchableOpacity onPress={this.scanInventory}>
                    <Icon
                      raised
                      reverse
                      name="qrcode"
                      type="font-awesome"
                      color="#C3C3E5"
                      reverse
                      size={40}
                    />
                    <Text style={styles.textStyle}>Scan Item</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomContainerElements}>
                  <TouchableOpacity onPress={this.settings}>
                    <Icon
                      raised
                      reverse
                      name="cogs"
                      type="font-awesome"
                      color="#C3C3E5"
                      size={40}
                    />
                    <Text style={styles.textStyle}>Settings</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e6e7e8"
  },
  bottomContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 250
  },
  bottomContainerElements: {
    height: "30%",
    width: "30%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    alignItems: "center",
    height: "10%",
    backgroundColor: "blue",
    marginTop: "5%",
    marginBottom: "5%"
  },
  userDetails: {},

  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  textStyle: {
    alignContent: "center",
    alignSelf: "center",
    color: "#F1F0FF",
    fontWeight: "bold"
  }
});//!< Controls various styling for the application
