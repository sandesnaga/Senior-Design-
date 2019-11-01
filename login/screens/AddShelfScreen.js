import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import { Button } from "native-base";
import * as firebase from "firebase";
import { Appbar } from 'react-native-paper';


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
        <View style = {{flex:1, flexDirection: 'column'}}>
        <Appbar.Header>
        <Appbar.BackAction
          onPress={this._goBack}
        />
        <Appbar.Content
          title= {this.state.name}
          subtitle="Subtitle"
        />
      </Appbar.Header>
        </View>
        
        <View style={styles.headingView}>
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
                placeholder="where in house"
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
          <Button success style={styles.buttonitem}>
            <Text style={styles.buttonText}>create</Text>
          </Button>
          <Button danger style={styles.buttonitem}>
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
    borderRadius: 10
  },

  buttonText: {
    fontSize: 25,
    color: "#fff"
  }
});
