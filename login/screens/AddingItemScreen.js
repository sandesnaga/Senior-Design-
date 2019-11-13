import React from "react";
import { Button} from "native-base"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert
} from "react-native";
import { Appbar } from "react-native-paper";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-datepicker";
import RadioForm from "react-native-simple-radio-button";
import Icon from 'react-native-vector-icons/FontAwesome';

//import icons from 'react-native-vector-icons/Ionicons'

var expirationChoices = [
  { label: "1 Week ", value: 0 },
  { label: "1 Month  ", value: 1 },
  { label: "1 Year", value: 2 }
];
var tempdata='';
var templocation='', row, column;
export default class ManualEntryScreem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      barcode:'',
      itemDescription: "",
      itemQuantity: "",
      pin: "",
      date: "",
      name: "",
      email: "",
      today:'',
      expchoice:'',
      uid:'',
      locationid:'',
      location:''
    };
  }

  additem=(itemName,barcode,itemDescription,itemQuantity,date,expchoice,pin)=>{
    var user = firebase.auth().currentUser;
    var uid;
    var shelfname, shelflocation;

if (user != null) {
  uid = user.uid;
var j=0;
  var itemref = firebase.database().ref("item_added");
  var locationref = firebase.database().ref("allocated_space");
  locationref.once("value",dataSnapShot =>{
    if (dataSnapShot.val()) {
      let dobobj = Object.values(dataSnapShot.val());
      let keyobj = Object.keys(dataSnapShot.val());
      for (var i = 0; i < dataSnapShot.numChildren(); i++) {
        if (dobobj[i].isAvailable == "Yes" && dobobj[i].uid == uid) {
          j++;
          templocation=keyobj[i],
          shelflocation=dobobj[i].location,
          shelfname=dobobj[i].Name,
          row=dobobj[i].Row,
          column=dobobj[i].Column
         
          var newitemref = itemref.push();
        newitemref.set({
        itemName:itemName,
        barcode:barcode,
        itemDescription:itemDescription,
        itemQuantity:itemQuantity,
        pin:pin,
        expdate:date,
        expchoice:expchoice,
        uid: uid,
        location:templocation,
        time: Date.now(),
        
      })
      locationref.child(keyobj[i]).update({isAvailable:'No'})
      Alert.alert(itemName+ " is added to", "row= "+row + " "+"column "+column + " in your " +shelfname);
      this.props.navigation.replace("Home");
      return true;
        }
       if(j>0){
         break;
       }
      }
      if(j==0){
      Alert.alert("Available Space","None");
      this.props.navigation.replace("AddingItem");
      return (true);
      }
    }
    else{
      Alert.alert("Available Space","None");
      this.props.navigation.replace("AddingItem");
      return (true);
    }
  })
  return (true);
}
return (true);
  }

  componentDidMount() {
    this.setState({
      barcode:tempdata
    })
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName,
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
      today:
        year + '-' + month + '-' + date,
    });
  }
  componentWillUnmount(){
    return true;
  }
   static navigationOptions = {
    title: "AddingItem",
    header: null
  };

  render() {
    const { navigation } = this.props;
    tempdata=navigation.getParam('Passeddata','')
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
              <Appbar.Content title={this.state.name} subtitle={this.state.email} />
            </Appbar.Header>
        
          </View>
          <View>
          <Text>Item Barcode</Text>
            { <TextInput
            leftIcon={
              <Icon
              name='user'
              size={24}
              color='black'
              />
            }
            inlineImageLeft='search_icon'
              style={styles.input}
              value={tempdata}
            ></TextInput> }
            <Button style={styles.button}
          onPress={() =>
            this.props.navigation.replace('barcode')
            //this.itemName=tempdata
          }><Text style={styles.buttonText}>Scan</Text></Button>

            <Text>Item Name</Text>
            { <TextInput
              style={styles.input}
              placeholder={"Name of Item"}
              onChangeText={itemName => {this.setState({itemName})}}
            ></TextInput> }
            
            <Text>Item description</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your item description"
              onChangeText={itemDescription => {this.setState({itemDescription})}}
            ></TextInput>

            <Text>Item Quantity</Text>
            <TextInput
              style={styles.input}
              keyboardType = 'numeric'
              placeholder="Please enter your item Quantity"
              onChangeText={itemQuantity => {this.setState({itemQuantity})}}
            ></TextInput>

            <Text style={{ paddingBottom: 5 }}>
              Please select the pre remainder time.
            </Text>
            <DatePicker
        style={{width:200, justifyContent:'center',flex:1}}
       date={this.state.date}
        mode="date"
        placeholder="Expiration Date"
        format="YYYY-MM-DD"
        minDate="1916-05-01"
        maxDate= {this.state.today}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={date => {this.setState({date})}}
      />
            <RadioForm
              style={styles.radioForm}
              radio_props={expirationChoices}
              onPress={(value) => {this.setState({expchoice:value})}}
              formHorizontal={true}
            ></RadioForm>
            <Text>Secure your location with pin(Optional).</Text>
            <TextInput
              style={styles.input}
              keyboardType = 'numeric'
              placeholder="Please enter pin for your item"
              onChangeText={pin => {this.setState({pin})}}
            ></TextInput>
          </View>
          <Button style={styles.button}
          full
          rounded
          onPress={()=>{
            this.additem(
                this.state.itemName,
                this.state.barcode,
                this.state.itemDescription,
                this.state.itemQuantity,
                this.state.date,
                this.state.expchoice,
                this.state.pin,
            )}}
          ><Text style={styles.buttonText}>Add Item</Text></Button>
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
