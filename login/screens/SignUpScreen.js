import React, { Component } from 'react'; //!< Import React component for all react native functionalities
import DatePicker from 'react-native-datepicker'; //!< Import Date picker api for picking DOB
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native'; //!< Import various designing tools from react-native mainly for Styling
import * as firebase from "firebase"; //!< Import React component for all react native functionalities
import {Form, Label, Input, Item, Button, Icon} from "native-base";  //!< Import various designing tools from react-native mainly for Styling


/*!
 * \brief Creates the new User With unique email and qualified password
 * \param name Name of the user
 * \param date DOB of the user
 * \param email Email of the user
 * \param password Password of the user
 */
export default class SignUpScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name: "", 
      date: "",
      email: "",
      password: "",
      showpass:true,
      press:false,
      today:'',
      DOB:'',
      uid:''
     
    }
  }
/*!
 * \brief User can hide or see their typed password
 * \param password Password of the user
 */
  showpass=()=>{
    if(this.state.press==false){
      this.setState({showpass:false, press:true})
    }
    else
    {
      this.setState({showpass:true, press:false}) 
    }
  }
  componentDidMount() {
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

  static navigationOptions = {
    title: "SignUp",
    header: null
};
/*!
 * \brief Creates the new User With unique email and qualified password
 * \param name Name of the user
 * \param date DOB of the user
 * \param email Email of the user
 * \param password Password of the user
 */
signupUser= (name, date,email, password) => {
  var userref = firebase.database().ref("user_more_info");
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(authenticate => {
    return authenticate.user
    .updateProfile({
      displayName: name,
      
    })
    .then(()=>{
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      var newuserref = userref.push();
      newuserref.set({
        uid: uid,
        DOB:date,
      })
      this.props.navigation.replace("Home");
    })
  })
  .catch(error =>{
    alert(error.message);
  })
}


  render(){
    return (
      <KeyboardAvoidingView style={styles.container}
      behavior="padding" enabled
      >
       
        <Form style= {styles.form}>
        <View style = {styles.logoContainer}>
        <Image
          style={{width:  160, height:80}}
          source={require("../assets/logo.png")}
          />
        </View>
        <Item floatingLabel>
            <Label style={styles.labelstyle}>Name</Label>
            <Icon name={"md-person"} size={28} color={'rgba(255,255,255,0,7)'}
              style={styles.inputicon}></Icon>
            <Input 
            left={20}           
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            onChangeText={name => this.setState({name})}
            />
          </Item>
          <Item style={styles.form}>
          <DatePicker
        style={{width:200, justifyContent:'center',flex:1}}
       date={this.state.date}
        mode="date"
        placeholder="Date of birth"
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => {this.setState({date})}}
      />
          </Item>
          <Item floatingLabel>
            <Label  style={styles.labelstyle}>Email</Label>
            <Icon name={"md-person"} size={28} color={'rgba(255,255,255,0,7)'}
              style={styles.inputicon}></Icon>
            <Input 
            left={20}           
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            />
          </Item>
          <View>
          <Item floatingLabel>
            <Label style={styles.labelstyle}>password</Label>
            <Icon name ={"md-lock"} size={28} color={'rgba(255,255,255,0.7)'}
              style={styles.inputicon}></Icon>
            <Input
            left={20}
            secureTextEntry={this.state.showpass}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={password => this.setState({password})}
            />
          </Item>
          <TouchableOpacity  style={styles.btnEye}
                  onPress={this.showpass.bind(this)}>
                  <Icon name={this.state.press==false ? "md-eye":"md-eye-off"} size={28} ></Icon>
              </TouchableOpacity>  
              </View>
          <Button style={styles.button}
          full
          rounded
          onPress={()=>{
            this.signupUser(
              this.state.name,
              this.state.date,
              this.state.email,
              this.state.password,
            
            )
            console.log("dob="+ this.date);
           }}
          ><Text style={styles.buttonText}>Sign In</Text></Button>
         
        </Form>
        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity
          onPress={()=> {
            
            this.props.navigation.navigate("SignIn");
          }}>
              <Text style={styles.accounttext}>Already Have an Account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex:1,
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  form: {
    padding: 5,
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    marginRight:20,
  },
  button: {
    marginTop: 10,
        padding: 20,
        width: '100%',
        backgroundColor: '#00aeef',
        borderRadius: 4,
        alignItems: 'center',
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  },
  btnEye:{
    position:'absolute',
    top:17,
    right:1,
    color:'#2C3335' 

  },
  labelstyle:{
    left: 20
  },
  inputicon: {
    position:'absolute',
      top: 17,
      left:1,
      color: '#2C3335'
    },
    accounttext:{
      color:'#00aeef',
      fontWeight: 'bold'
    },
});//!< Controls various styling for the application
