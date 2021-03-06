import React from "react"; //!< Import React component for all react native functionalities
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "native-base"; //!< Import various designing tools from react-native mainly for Styling
import * as firebase from "firebase"; //!< Imports necessary component of Firebase
import { Appbar } from "react-native-paper";


/*!
 * \brief Creates the shelf with the description given by user
 * \param location Location of the Shelf
 * \param Name Name of the Shelf
 * \param numColumr Number of Columns in shelf
 * \param numRow Number of Rows in shelf
 * \param name Name of the user
 * \param email Email of the user
 */
export default class AddShelfScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      Name: "",
      numColumr: "",
      numRow: "",
      name: "",
      email: "",
      dob: ""
    };
  }

  static navigationOptions = {
    title: "AddShelfScreen",
    header: null
  };
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingView}>
          <Appbar.Header>
            <Appbar.BackAction onPress={this._goBack} />
            <Appbar.Content title={this.state.name} subtitle="Subtitle" />
          </Appbar.Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>
            Add Shelf
          </Text>
        </View>
        <View style={{ paddingVertical: 15, flex: 1 }}>
          <View style={styles.locationView}>
            <View> 
              <Text style={styles.caption}>Location:</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputstyles}
                placeholder="where in house(add shelf)"
              />
            </View>
          </View>

          <View style={styles.locationView}>
            <View>
              <Text style={styles.caption}>Name:</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputstyles}
                placeholder="Name of 
                            Shelf"
              />
            </View>
          </View>

          <View style={styles.locationView}>
            <View>
              <Text style={styles.caption}>No of Column:</Text>
            </View>
            <View>
              <TextInput style={styles.inputstyles} placeholder="# of column" />
            </View>
          </View>

          <View style={styles.locationView}>
            <View>
              <Text style={styles.caption}>No of Rows:</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputstyles}
                placeholder="
                            # of row"
              />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button style={styles.buttonitem}>
            <Text style={styles.buttonText}>create</Text>
          </Button>
          <Button style={styles.buttonitem}>
            <Text style={styles.buttonText}>cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  headingView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },

  locationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 5
  },
  caption: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10
  },
  inputstyles: {
    borderColor: "grey",
    borderWidth: 1.5,
    borderRadius: 5,
    minWidth: 200,
    height: 40,
    paddingLeft: 10
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  buttonitem: {
    width: 200,
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 25,
    color: "#fff"
  }
});//!< Controls various styling for the application
