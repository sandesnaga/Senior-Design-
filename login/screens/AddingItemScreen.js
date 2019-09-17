import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Label,
  Input,
  Icon,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import * as firebase from "firebase";
import Search from "./src/components/Search";
import { SafeAreaView } from "react-navigation";
import { storeUrl } from "expo/build/StoreReview/StoreReview";
import { wrap } from "bytebuffer";
import { TextInput } from "react-native-gesture-handler";
import Reinput from "reinput";
import DatePicker from "react-native-datepicker";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { Item } from "native-base";

//import icons from 'react-native-vector-icons/Ionicons'

var expirationChoices = [
  { label: "1 day", value: 0 },
  { label: "1 week", value: 0 },
  { label: "1 month", value: 0 }
];

export default class AddingItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  static navigationOptions = {
    title: "AddingItem",
    header: null
  };

  render() {
    return (
      <View style= {styles.topContainer}>
        <View style={styles.logoconainer}>
          <Image
            style={{ width: 160, height: 80 }}
            source={require("../assets/logo.png")}
          />
          <View style={styles.userDetails}>
            <Text> Hey {this.state.name},</Text>
            <Text> You are signed in as: {this.state.email}</Text>
          </View>
        </View>

        <Button
          title="Welcome to add Item."
          style={styles.button}
          full
          rounded
          success
        ></Button>
          
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
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
  textInput: {
    paddingLeft: 5
  },
  radioForm: {
    marginTop: 20
    //padding: 7,
  }
});
