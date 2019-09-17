import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Item,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import Search from "./src/components/Search";
import { SafeAreaView } from "react-navigation";
import { storeUrl } from "expo/build/StoreReview/StoreReview";
import { wrap } from "bytebuffer";
import DatePicker from 'react-native-datepicker'
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
      pin: ""
    };
  }

  static navigationOptions = {
    title: "ManualEntry",
    header: null
  };

  
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

            <Search></Search>
          </View>
        </View>

        <Button
          title="This is Manual Entry"
          style={styles.button}
          full
          rounded
          success
        ></Button>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View></View>
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

            <Text
              style = {{paddingBottom:5}}>Please select the pre remainder time.</Text>
            
              <DatePicker
                top={20}
                style={{ width: "90%" }}
                DOB={this.state.DOB}
                mode="date"
                placeholder="Remainder"
                format="YYYY-MM-DD"
                minDate="1900-05-01"
                maxDate="2019"
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
                    marginLeft: 60
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={DOB => {
                  this.showDateTimePicker;
                  this.setState({ DOB });
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
        </KeyboardAvoidingView>

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
    flex: 1,
    justifyContent: 'space-between'
  },
  radioForm: {
    marginTop: 20,
    //padding: 7,
    justifyContent:'center'
  }
});
