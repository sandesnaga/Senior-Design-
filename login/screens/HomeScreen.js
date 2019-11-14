import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  YellowBox,
} from "react-native";
import * as firebase from "firebase";
import Search from "./src/components/Search";
import { SafeAreaView } from "react-navigation";
import { Appbar } from "react-native-paper";
//import { storeUrl } from "expo/build/StoreReview/StoreReview";
//import { wrap } from "bytebuffer";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default class HomeScreen extends React.Component {
  constructor(props) {
    YellowBox.ignoreWarnings(['Setting a timer']);
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
                return (true);
              }
            }
            return (true);
          }
        });
       
      } else {
        this.props.navigation.replace("SignIn");
        return (true);
      }
    });
    return (true);
  }
  componentWillUnmount(){
  }
  
 updatedob =(dob)=>{
  this.setState({dob:dob});
 }

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
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity onPress={this.gotoAddItem}>
              <Icon
                raised
                name="plus"
                type="font-awesome"
                color="#6200ee"
                size= {60}
              />
              {/* <Image source={require("../assets/icons/addItem.png")} /> */}
              <Text style={styles.textStyle}>Add Item</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainerElements}>
            <TouchableOpacity onPress={this.allocateSpace}>
              <Icon
                raised
                name="columns"
                type="font-awesome"
                color="#6200ee"
                size= {60}
              />
              <Text style={styles.textStyle}>Allocate Space</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity onPress={this.itemsList}>
              <Icon
                raised
                name="database"
                type="font-awesome"
                color="#6200ee"
                size= {60}
              />
              <Text style={styles.textStyle}>Items List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity onPress={this.manualEntry}>
              <Icon
                raised
                name="edit"
                type="font-awesome"
                color="#6200ee"
                size= {60}
              />
              <Text style={styles.textStyle}>Manual entry</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity onPress={this.scanInventory}>
              <Icon
                raised
                name="qrcode"
                type="font-awesome"
                color="#6200ee"
                size= {60}
              />
              <Text style={styles.textStyle}>Scan Item</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity onPress={this.settings}>
              <Icon
                raised
                name="cogs"
                type="font-awesome"
                color="#6200ee"
                size= {60}
              />
              <Text style={styles.textStyle}>Settings</Text>
            </TouchableOpacity>
          </View>
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
    color: "#fff"
  },
  textStyle: {
    alignSelf: "center",
    color: "#6200ee",
    fontWeight: "bold"
  }
});
