import React from "react";
import { Button } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ImageBackground
} from "react-native";
import { Appbar } from "react-native-paper";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

//import icons from 'react-native-vector-icons/Ionicons'
var dropdownHeading = "Pre-Notification Dates";

var expirationChoices = [
  { label: "1 Week ", value: 0 },
  { label: "1 Month  ", value: 1 },
  { label: "1 Year", value: 2 }
];

var type = [
  { label: "Alcohol ", value: 0 },
  { label: "Other  ", value: 1 }
];
var tempdata = "Scan";
var templocation = "",
  row,
  column;

export default class AddingItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      barcode: "",
      itemDescription: "",
      itemQuantity: "",
      date: "",
      name: "",
      email: "",
      today: "",
      expchoice: "",
      uid: "",
      locationid: "",
      location: "",
      itemtype: "",
      bplace: "",
      bstyle: "",
      format: ""
    };
  }

  additem = (
    itemName,
    barcode,
    itemDescription,
    itemQuantity,
    date,
    expchoice,
    itemtype,
    bplace,
    bstyle,
    format
  ) => {
    var user = firebase.auth().currentUser;
    var uid;
    var shelfname, shelflocation;

    if (user != null) {
      uid = user.uid;
      var j = 0;
      var itemref = firebase.database().ref("item_added");
      var locationref = firebase.database().ref("allocated_space");
      locationref.once("value", dataSnapShot => {
        if (dataSnapShot.val()) {
          let dobobj = Object.values(dataSnapShot.val());
          let keyobj = Object.keys(dataSnapShot.val());
          for (var i = 0; i < dataSnapShot.numChildren(); i++) {
            if (dobobj[i].isAvailable == "Yes" && dobobj[i].uid == uid) {
              j++;
              (templocation = keyobj[i]),
                (shelflocation = dobobj[i].location),
                (shelfname = dobobj[i].Name),
                (row = dobobj[i].Row),
                (column = dobobj[i].Column);

              var newitemref = itemref.push();
              var Key = newitemref.getKey();
              newitemref.set({
                itemName: itemName,
                barcode: barcode,
                itemDescription: itemDescription,
                itemQuantity: itemQuantity,
                expdate: date,
                expchoice: expchoice,
                uid: uid,
                location: templocation,
                time: Date.now(),
                itemtype: itemtype,
                bplace: bplace,
                bstyle: bstyle,
                format: format,
                key: Key
              });
              locationref.child(keyobj[i]).update({ isAvailable: "No" });
              Alert.alert(
                itemName + " is added to",
                "row= " +
                  row +
                  " " +
                  "column " +
                  column +
                  " in your " +
                  shelfname
              );
              this.props.navigation.navigate("QRgen", {
                Passeddata: Key
              });

              return true;
            }
            if (j > 0) {
              break;
            }
          }
          if (j == 0) {
            Alert.alert("Available Space", "None");
            this.props.navigation.replace("AddingItem");
            return true;
          }
        } else {
          Alert.alert("Available Space", "None");
          this.props.navigation.replace("AddingItem");
          return true;
        }
      });
      return true;
    }
    return true;
  };

  componentDidMount() {
    this.setState({
      barcode: tempdata
    });
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

    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      //Setting the value of the date time
      today: year + "-" + month + "-" + date
    });
  }
  componentWillUnmount() {}

  static navigationOptions = {
    title: "AddingItem",
    header: null
  };

  render() {
    const { navigation } = this.props;
    tempdata = navigation.getParam("Passeddata", "Scan");
    return (
      <View style={styles.topContainer}>
        <KeyboardAwareScrollView style={styles.form}>
          <View style={{ flex: 1 }}>
            <Appbar.Header>
              <Appbar.BackAction
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
              <Appbar.Content
                title={this.state.name}
                subtitle={this.state.email}
              />
            </Appbar.Header>
          </View>

          <View style={{ backgroundColor: "#393636" }}>
            <View
              style={{ flex: 1, backgroundColor: "rgba(133, 126, 237, .4)" }}
            >
              <View style={styles.headingView}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "grey",
                    marginLeft: "40%",
                    marginTop: 30,
                    marginBottom: 10
                  }}
                >
                  Add Item
                </Text>
              </View>
              {/* Item barcode input */}
              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Item Barcode:
                  </Text>
                </View>
                <View>
                  {/* <TextInput style={styles.inputstyles} value={tempdata} /> */}
                  <TouchableOpacity
                    style={styles.inputstyles}
                    style={{ backgroundColor: "#6915cf" }}
                    value={tempdata}
                    onPress={
                      () => this.props.navigation.replace("barcode")
                      //this.itemName=tempdata
                    }
                  >
                    <Text
                      style={{
                        color: "white",
                        marginLeft: "35%",
                        marginTop: "3%"
                      }}
                    >
                      {tempdata}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Item Type
                  </Text>
                </View>
                <View>
                  <RadioForm
                    style={[styles.radioForm]}
                    radio_props={type}
                    
                    onPress={value => {
                      this.setState({ itemtype: value });
                    }}
                    formHorizontal={true}
                  ></RadioForm>
                </View>
              </View>

              {this.state.itemtype ? (
                undefined
              ) : (
                <View>
                  {/* Brewery style*/}
                  <View style={styles.locationView}>
                    <View>
                      <Text style={[styles.caption, styles.textColor]}>
                        Brewery Style:
                      </Text>
                    </View>
                    <View>
                      <TextInput
                        style={styles.inputstyles}
                        placeholder="Brewing style"
                        placeholderTextColor="#758AA2"
                        onChangeText={bstyle => {
                          this.setState({ bstyle });
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Item Name*/}

              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Item Name:
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.inputstyles}
                    placeholder="Items Name."
                    placeholderTextColor="#758AA2"
                    onChangeText={itemName => {
                      this.setState({ itemName });
                    }}
                  />
                </View>
              </View>

              {this.state.itemtype ? (
                undefined
              ) : (
                <View>
                  {/* Packing format */}

                  <View style={styles.locationView}>
                    <View>
                      <Text style={[styles.caption, styles.textColor]}>
                        Packing:
                      </Text>
                    </View>
                    <View>
                      <TextInput
                        style={styles.inputstyles}
                        placeholder="How is it packed ?"
                        placeholderTextColor="#758AA2"
                        onChangeText={format => {
                          this.setState({ format });
                        }}
                      />
                    </View>
                  </View>

                  {/* Brwerey location*/}
                  <View style={styles.locationView}>
                    <View>
                      <Text style={[styles.caption, styles.textColor]}>
                        Brewery Place:{" "}
                      </Text>
                    </View>
                    <View>
                      <TextInput
                        style={styles.inputstyles}
                        placeholder="Where was it brewed?"
                        placeholderTextColor="#758AA2"
                        onChangeText={bplace => {
                          this.setState({ bplace });
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Item Description:
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.inputstyles}
                    placeholder="Describe your item."
                    placeholderTextColor="#758AA2"
                    onChangeText={itemDescription => {
                      this.setState({ itemDescription });
                    }}
                  />
                </View>
              </View>
              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Item Quantity:
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={[styles.inputstyles, styles.textColor]}
                    keyboardType="numeric"
                    placeholder="Select your item's quantity"
                    placeholderTextColor="#758AA2"
                    onChangeText={itemQuantity => {
                      this.setState({ itemQuantity });
                    }}
                  />
                </View>
              </View>
              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Expiry Date:
                  </Text>
                </View>
                <View>
                  <DatePicker
                    style={{
                      width: 200,
                      justifyContent: "center",
                      flex: 1,
                      borderRadius: 5
                    }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Expiration Date"
                    format="YYYY-MM-DD"
                    minDate={this.state.today}
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
                    }}
                    onDateChange={date => {
                      this.setState({ date });
                    }}
                  />
                </View>
              </View>
              <View style={styles.locationView}>
                <View>
                  <Text style={[styles.caption, styles.textColor]}>
                    Notification time:
                  </Text>
                </View>
                <View>
                  <MenuProvider
                    style={{ flexDirection: "column", padding: 30 }}
                  >
                    <Menu
                      style={{ color: "#F1F0FF" }}
                      onSelect={value => {
                        dropdownHeading = value + " Weeks";
                        this.setState({ expchoice: value });
                      }}
                    >
                      <MenuTrigger>
                        <Text style={styles.headerText}>{dropdownHeading}</Text>
                      </MenuTrigger>

                      <MenuOptions>
                        <MenuOption value={"1"}>
                          <Text style={styles.menuContent}>1 Week</Text>
                        </MenuOption>
                        <MenuOption value={"2"}>
                          <Text style={styles.menuContent}>2 Week</Text>
                        </MenuOption>
                        <MenuOption value={"3"}>
                          <Text style={styles.menuContent}>3 Week</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </MenuProvider>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "#393636", marginBottom: 30 }}>
            <Button 
                style={styles.button}
                full
                rounded
                onPress={() => {
                  this.additem(
                    this.state.itemName,
                    this.state.barcode,
                    this.state.itemDescription,
                    this.state.itemQuantity,
                    this.state.date,
                    this.state.expchoice,
                    this.state.itemtype,
                    this.state.bplace,
                    this.state.bstyle,
                    this.state.format
                  );
                }}
              >
                <Text style={styles.buttonText}>Add Item</Text>
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#393636"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  locationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 5
  },
  textColor: {
    color: "#F1F0FF"
  },
  caption: {
    fontSize: 15,
    color: "red",
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
    color: "#F1F0FF",
    marginTop: 20,
    //padding: 7,
    justifyContent: "center"
  }
});
