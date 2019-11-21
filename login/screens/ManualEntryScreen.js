import React from "react";
import { Button } from "native-base";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Appbar } from "react-native-paper";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";
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
var tempdata = "";
var templocation = "",
  row,
  column;

export default class ManualEntryScreem extends React.Component {
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
    format,
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
    var month = new Date().getMonth()+1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      //Setting the value of the date time
      today: year + "-" + month + "-" + date
    });
  }
  componentWillUnmount() {
  }
  static navigationOptions = {
    title: "AddingItem",
    header: null
  };

  render() {
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
          <View>
            <View style={styles.locationView}>
              <View>
                <Text style={styles.caption}>Item Barcode</Text>
              </View>
              <View>
                <TextInput
                  style={styles.inputstyles}
                  placeholder="Item Barcode"
                  onchangeText={barcode => {
                    this.setState({ barcode });
                  }}
                ></TextInput>
              </View>
            </View>
            <View style={styles.locationView}>
              <View>
                <Text style={styles.caption}>Item Type</Text>
              </View>
              <View>
                <RadioForm
                  style={styles.radioForm}
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
                <View style={styles.locationView}>
                  <View>
                    <Text style={styles.caption}>Brewery Style:</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.inputstyles}
                      placeholder="Brewing style"
                      onChangeText={bstyle => {
                        this.setState({ bstyle });
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            <View style={styles.locationView}>
              <View>
                <Text style={styles.caption}>Item Name:</Text>
              </View>
              <View>
                <TextInput
                  style={styles.inputstyles}
                  placeholder="Items Name."
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
                <View style={styles.locationView}>
                  <View>
                    <Text style={styles.caption}>Packing:</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.inputstyles}
                      placeholder="How is it packed ?"
                      onChangeText={format => {
                        this.setState({ format });
                      }}
                    />
                  </View>
                </View>
                <View style={styles.locationView}>
                  <View>
                    <Text style={styles.caption}>Brewery Place: </Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.inputstyles}
                      placeholder="Where was it brewed?"
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
                <Text style={styles.caption}>Item Description:</Text>
              </View>
              <View>
                <TextInput
                  style={styles.inputstyles}
                  placeholder="Describe your item."
                  onChangeText={itemDescription => {
                    this.setState({ itemDescription });
                  }}
                />
              </View>
            </View>
            <View style={styles.locationView}>
              <View>
                <Text style={styles.caption}>Item Quantity:</Text>
              </View>
              <View>
                <TextInput
                  style={styles.inputstyles}
                  keyboardType="numeric"
                  placeholder="Select your item's quantity"
                  onChangeText={itemQuantity => {
                    this.setState({ itemQuantity });
                  }}
                />
              </View>
            </View>
            <View style={styles.locationView}>
              <View>
                <Text style={styles.caption}>Expiry Date:</Text>
              </View>
              <View>
                <DatePicker
                  style={{ width: 200, justifyContent: "center", flex: 1 }}
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
                <Text style={styles.caption}>Notification time:</Text>
              </View>
              <View>
                <MenuProvider style={{ flexDirection: "column", padding: 30 }}>
                  <Menu
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
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "column"
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
