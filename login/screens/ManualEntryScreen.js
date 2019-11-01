import React from "react";
import QRCode from "react-native-qrcode";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  StatusBar
} from "react-native";
import { Appbar } from "react-native-paper";

import * as firebase from "firebase";
import Search from "./src/components/Search";
import { SafeAreaView } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-datepicker";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

//import icons from 'react-native-vector-icons/Ionicons'

var expirationChoices = [
  { label: "1 day ", value: 0 },
  { label: "1 week  ", value: 0 },
  { label: "1 month ", value: 0 }
];

export default class ManualEntryScreem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemDescription: "",
      itemQuantity: "",
      pin: "",
      Date: "",
      name: "",
      email: "",
      dob: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName,
          dob: authenticate.born
        });
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
  }
  static navigationOptions = {
    title: "ManualEntry",
    header: null
  };

  render() {
    return (
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.logoconainer}>
          {/*
          <Image
            style={{ width: 160, height: 80 }}
            source={require("../assets/logo.png")}
          />
          <View style={styles.userDetails}>
            <Text> Hey {this.state.name},</Text>
            <Text> You are signed in as: {this.state.email}</Text>
            <Search></Search>
          </View>
          */}
        </View>
        <KeyboardAwareScrollView style={styles.form}>
          <View style={{ flex: 1 }}>
            
            <Appbar.Header>
              <Appbar.BackAction
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
              <Appbar.Content title={this.state.name} subtitle="Subtitle" />
            </Appbar.Header>
        
          </View>
          <View>
            <Text>Item Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your item Name"
              onchangeText={() => "#"}
            ></TextInput>

            <Text>Item description</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your item description"
              onchangeText={() => "#"}
            ></TextInput>

            <Text>Item Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your item Quantity"
              onchangeText={() => "#"}
            ></TextInput>

            <Text style={{ paddingBottom: 5 }}>
              Please select the pre remainder time.
            </Text>

            <DatePicker
              style={{ width: 200, justifyContent: "center" }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1916-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
            <RadioForm
              style={styles.radioForm}
              radio_props={expirationChoices}
              onPress={value => {}}
              formHorizontal={true}
            ></RadioForm>
            <Text>Secure your location with pin(Optional).</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter pin for your item"
              onchangeText={() => "#"}
            ></TextInput>
          </View>
        </KeyboardAwareScrollView>
        <Button
          style={styles.button}
          title="toHome"
          full
          rounded
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
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
    color: "#fff"
  },
  description: {
    fontSize: 14,
    color: "white"
  },
  input: {
    marginBottom: 10,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16
  },
  text: {
    margin: 10
  },
  legal: {
    margin: 10,
    color: "#333",
    fontSize: 12,
    textAlign: "center"
  },
  form: {
    flex: 1
  },
  radioForm: {
    marginTop: 20,
    //padding: 7,
    justifyContent: "center"
  }
});
