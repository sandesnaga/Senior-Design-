import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native';
import * as firebase from "firebase";
import {Form, Item, Input, Label, Button, Icon} from "native-base"
import { userInfo } from 'os';



export default class SignInScreen extends React.Component{
  
  constructor(props){
    super(props);
    super();
    this.state = {
      email: "",
      password:"",
      showpass:true,
      press:false

    }
  }
  
  showpass=()=>{
    if(this.state.press==false){
      this.setState({showpass:false, press:true})
    }
    else
    {
      this.setState({showpass:true, press:false}) 
    }
  }
  static navigationOptions = {
    title: "SignIn",
    header: null
}

sighInUser = (email, password)=>{
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then( () => {
    this.props.navigation.replace("Home");
  } )
  .catch(error =>{
    alert(error.message)
  })
}
componentDidMount() {
  firebase.auth().onAuthStateChanged(authenticate => {
    if (authenticate) {
      this.setState({
        email: authenticate.email,
        name: authenticate.displayName,
        uid: userInfo.uid,
        
      });
    } else {
      this.props.navigation.replace("SignIn");
    }
  });
}
  render(){
    return (
      <KeyboardAvoidingView style={styles.container}
      behavior="padding" enabled
      >
        <View style = {styles.logoContainer}>
          <Image
          style={{width:  160, height:80}}
          source={require("../assets/logo.png")}
          />
          
        </View>
        <Form style= {styles.form}>
        <Item floatingLabel>
            <Label  style={styles.labelstyle}>Email</Label>
            <Icon name={"md-person"} size={28} color={'rgba(255,255,255,0,7)'}
              style={styles.inputicon}>
            </Icon>
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
            <Label style={styles.labelstyle}>Password</Label>
            <Icon name ={"md-lock"} size={28} color={'rgba(255,255,255,0.7)'}
              style={styles.inputicon}></Icon>
            <Input
            left={20}
            secureTextEntry={this.state.showpass}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
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
            this.sighInUser(this.state.email, this.state.password);


          }}>
            <Text style={styles.buttonText}>Sign In</Text></Button>

        </Form>
        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity
          onPress={()=> {
            this.props.navigation.navigate("SignUp");
          }}>
              <Text style={styles.accounttext}>Create a new Account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  form: {
    padding: 5,
    width: "100%"
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
  inputicon: {
  position:'absolute',
    top: 17,
    left:1,
    color: '#2C3335'
  },
  labelstyle:{
    left: 20
  },
  btnEye:{
    position:'absolute',
    top:17,
    right:37,
    color:'#2C3335' 

  },
  accounttext:{
    color:'#00aeef',
    fontWeight:'bold',
  },
});
