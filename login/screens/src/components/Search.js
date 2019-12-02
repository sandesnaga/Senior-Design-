import React from "React"; //!< Import React component for all react native functionalities
import { StyleSheet, TextInput, View, Alert, Text } from "react-native"; //!< Import various designing tools from react-native mainly for Styling
import { Button } from "native-base"; //!< Import various designing tools from react-native mainly for Styling

import * as firebase from "firebase"; //!< Import React component for all react native functionalities

/*!
 * \brief Search item available on the shelf and show the description
 * \param name Name of the user
 * \param email Email of the user
 * \param temp search key word that user is looking for
 * \param uid UID of current user
 */
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      uid: "",
      temp: ""
    };
  }
  static navigationOptions = {
    title: "Search",
    header: null
  };
  search = searchText => {
    var user = firebase.auth().currentUser;
    var uid,
      j = 0;

    if (user != null) {
      uid = user.uid;
    }
    var itemref = firebase.database().ref("item_added");
    var locationref = firebase.database().ref("allocated_space");

    itemref.once("value", dataSnapShot => {
      if (dataSnapShot.val()) {
        let dobobj = Object.values(dataSnapShot.val());
        for (var i = 0; i < dataSnapShot.numChildren(); i++) {
          if (dobobj[i].itemName == searchText && dobobj[i].uid == uid) {
            j++;
            this.setState({ temp: dobobj[i].location });
          }
        }
        if (j == 0) {
          Alert.alert(searchText + " is not on any of your shelf");
          this.setState({ temp: "" });
          return;
        }
      }
    });
    locationref.once("value", dataSnapShot => {
      if (dataSnapShot.val()) {
        let dobobj = Object.values(dataSnapShot.val());
        let keyobj = Object.keys(dataSnapShot.val());
        for (var i = 0; i < dataSnapShot.numChildren(); i++) {
          if (keyobj[i] == this.state.temp) {
            Alert.alert(
              searchText + " is on ",
              " Row = " +
                dobobj[i].Row +
                " and Column = " +
                dobobj[i].Column +
                " at " +
                dobobj[i].location
            );
          }
        }
      }
    });
  };
  componentWillUnmount() {}
  render() {
    return (
      <View style={{flexDirection: "horizontal"}}>
        <View style={styles.search}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#758AA2"
            placeholder="What do you want to drink today?"
            onChangeText={searchText => {
              this.setState({ searchText });
            }}
          ></TextInput>
          <Button
            style={styles.searchButton}
            onPress={() => this.search(this.state.searchText)}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
            >
              Search
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    margin: 1,
    borderColor: "grey",
    borderWidth: 2,
    height: 40,
    width: "80%",
    borderRadius: 10,
    alignItems: "center"
  },
  searchButton: {
    alignItems: "center",
    width: 90,
    marginTop: 5,
    paddingLeft: 20,
    borderRadius: 10
  },
  search: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  }
});
