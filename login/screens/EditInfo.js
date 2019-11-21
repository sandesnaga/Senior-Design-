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
      newName: "",
      newEmail: "",
      currentPassword: ""
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
  onEditInfoPress = () => {
    var user = firebase.auth().currentUser;
    if (
      this.state.newName != "" &&
      this.state.newEmail != "" &&
      this.state.currentPassword != ""
    ) {
      this.reauthenticate(this.state.currentPassword)
        .then(() => {
          user.updateProfile({
            displayName: this.state.newName
          });
          user.updateEmail(this.state.newEmail);
          this.setState({
            email: this.state.newEmail
          });
          this.setState({
            name: this.state.newName,
            email: this.state.newEmail
          });
        })
        .then(() => {
          (this.state.newEmail = ""),
            (this.state.newName = ""),
            (this.state.currentPassword = "");
          Alert.alert("Update Sucessfull", "Check your email for detail");
        })
        .catch(error => {
          Alert.alert("Wrong Password!!");
        });
    } else {
      Alert.alert("Some of the field are empty");
      this.props.navigation.replace("EditInfo");
    }
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
    title: "EditInfo",
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
        <View style={styles.logoconainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "grey",
              marginLeft: "10%",
              marginTop: 30,
              marginBottom: 10
            }}
          >
            Change Profile Information
          </Text>

          {/*
          <Text>User Name:</Text>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.name}
            autoCapitalize="none"
            onChangeText={newName => {
              this.setState({ newName });
            }}
          />
          */}

          <View style={styles.locationView}>
            <View>
              <Text style={styles.caption}>Name:</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputstyles}
                placeholder={this.state.name}
                placeholderTextColor="#758AA2"
                autoCapitalize="none"
                onChangeText={newName => {
                  this.setState({ newName });
                }}
              />
            </View>
          </View>

          {/*  <Text>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.email}
            autoCapitalize="none"
            onChangeText={newEmail => {
              this.setState({ newEmail });
            }}
          /> */}

          <View style={styles.locationView}>
            <View>
              <Text style={styles.caption}>Email:</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputstyles}
                placeholder={this.state.email}
                placeholderTextColor="#758AA2"
                autoCapitalize="none"
                onChangeText={newEmail => {
                  this.setState({ newEmail });
                }}
              />
            </View>
          </View>

          {/*
          <Text>Current Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="*********"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={currentPassword => {
              this.setState({ currentPassword });
            }}
          />
          */}
          <View style={styles.locationView}>
            <View>
              <Text style={styles.caption}>Password:</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputstyles}
                placeholder="*********"
                placeholderTextColor="#758AA2"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={currentPassword => {
                  this.setState({ currentPassword });
                }}
              />
            </View>
          </View>
          <View style={{}}>
            <Button
             style={styles.button}
             full
             rounded
            onPress={this.onEditInfoPress} style={styles.button}>
              <Text style= {styles.buttonText} >Change Info</Text>
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
        </View>
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
    flexDirection: "column",
    backgroundColor: "#393636"
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
  caption: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "#F1F0FF"
  },
  inputstyles: {
    borderColor: "grey",
    borderWidth: 1.5,
    borderRadius: 5,
    minWidth: 200,
    height: 40,
    paddingLeft: 10
  },
  locationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 5
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  buttonitem: {
    width: 200,
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10
  },

  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 20,
    padding: 10,
    height: 40,
    alignSelf: "stretch",
    fontSize: 18,
    marginTop: 10
  }
});
