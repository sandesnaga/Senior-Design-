import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import { Button } from "native-base";
import * as firebase from "firebase";
import Search from "./src/components/Search";
import { Appbar } from "react-native-paper";

//import icons from 'react-native-vector-icons/Ionicons'

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: ""
    };
  }

  reauthenticate = currentPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert("Password was changed");
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
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
    title: "ChangePassword",
    header: null
  };

  render() {
    return (
      <View style={styles.topContainer}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
          />
          <Appbar.Content title={this.state.name} subtitle={this.state.email} />
        </Appbar.Header>
        {/*
        <View style={styles.logoconainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.currentPassword}
            placeholder="Current Password"
            placeholderTextColor= '#758AA2'
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ currentPassword: text });
            }}
          />

          */}

        <View style={styles.locationView}>
          <View>
            <Text style={styles.caption}>Current Password:</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputstyles}
              placeholderTextColor="#758AA2"
              placeholder="Current Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({ currentPassword: text });
              }}
            />
          </View>
        </View>

        {/*
        <TextInput
          style={styles.textInput}
          value={this.state.newPassword}
          placeholder="New Password"
          placeholderTextColor="#758AA2"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({ newPassword: text });
          }}
        />
        */}
        <View style={styles.locationView}>
          <View>
            <Text style={styles.caption}>New Password:</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputstyles}
              placeholderTextColor="#758AA2"
              placeholder="New Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
            />
          </View>
        </View>

        <Button  style={styles.button}
          full
          rounded
          onPress={this.onChangePasswordPress}>
          <Text style={styles.buttonText}>Change Password..</Text>
        </Button>
        
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
    backgroundColor: "#393636",
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
  locationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 10
  },
  inputstyles: {
    borderColor: "grey",
    borderWidth: 1.5,
    borderRadius: 5,
    minWidth: 200,
    height: 40,
    paddingLeft: 10
  },

  topContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#393636"
  },

  caption: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "#F1F0FF"
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
});
