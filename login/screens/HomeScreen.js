import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import Search from './src/components/Search';
import { SafeAreaView } from 'react-navigation';
//import { storeUrl } from "expo/build/StoreReview/StoreReview";
//import { wrap } from "bytebuffer";
//import icons from 'react-native-vector-icons/Ionicons'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      dob:"00-00-0000",
      uid:''
    };
  }

  static navigationOptions = {
    title: "Home",
    header: null
  };

  gotoAddItem = () => {
    this.props.navigation.replace("AddingItem");
}
itemsList = ()=> {
  this.props.navigation.replace("ItemList");
}
manualEntry = () => {
  this.props.navigation.replace("ManualEntry");
}
scanInventory = ()=>{
  this.props.navigation.replace("ScanInventory");
}
allocateSpace = ()=>{
  this.props.navigation.replace("AllocateSpace");
}
settings = ()=>{
  this.props.navigation.replace("Settings");
}

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName,
        });
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        const rootRef= firebase.database().ref();
        const oneref= rootRef.child('user_more_info').orderByChild('uid').equalTo(uid);
        console.log(oneref.DOB);
        
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
    
  }
  componentWillUnmount(){}
  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signedout");
        console.log("dob="+ this.state.dob);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  onPress = () => {
    alert('clicked');
  }

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
            <Text> Date of birth: {this.state.dob}</Text>
            <Search></Search>
          </View>
        </View>

        <Button
          title="Logout"
          style={styles.button}
          full
          rounded
          success
          onPress={() => {
            this.signOutUser();
          }}
        ></Button>

        <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerElements}>
            <TouchableOpacity
              onPress = {this.gotoAddItem}
            >
          <Image
              source={require("../assets/icons/addItem.png")}             
            />
            <Text>Add Item</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity
            onPress = {this.allocateSpace}>
            <Image
              source={require("../assets/icons/allocateSpace.png")}
            />
            <Text>Allocate Space</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity
            onPress = {this.itemsList}>
            <Image
              source={require("../assets/icons/itemsList.png")}
            />
            <Text>Items List</Text>
            </TouchableOpacity >
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity
            onPress = {this.manualEntry}>            
              <Image source={require("../assets/icons/manualEntry.png")}
            />
            <Text>Manual entry</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity
            onPress = {this.scanInventory}>
            <Image source={require("../assets/icons/scanItem.png")}
            />
            <Text>Scan Item</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerElements}>
            <TouchableOpacity
            onPress = {this.settings}>           
              <Image source={require("../assets/icons/settings.png")}
            />
            <Text>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
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
