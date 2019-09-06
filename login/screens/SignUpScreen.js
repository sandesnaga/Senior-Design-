import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import * as firebase from "firebase";
import {Form, Label, Input, Item, Button} from "native-base"



export default class SignUpScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      name: ""

    }
  }

  static navigationOptions = {
    title: "SignUp",
    header: null
};
signupUser= (name, email, password) =>{
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(authenticate => {
    return authenticate.user
    .updateProfile({
      displayName: name
    })
    .then(()=>{
      this.props.navigation.replace("Home");
    })
  })
  .catch(error =>{
    alert(error.message)
  })
}


  render(){
    return (
      <KeyboardAvoidingView style={styles.container}
      behavior="position" enabled
      >
        <View style = {styles.logoContainer}>
        <Image
          style={{width:  160, height:80}}
          source={require("../assets/logo.png")}
          />
          
        </View>
        <Form style= {styles.form}>
        <Item floatingLabel>
            <Label>Name</Label>
            <input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            onChangeText={name => this.setState({name})}
            />

          </Item>

          <Item floatingLabel>
            <Label>Email</Label>
            <input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            />

          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={password => this.setState({password})}
            />
          </Item>
          <Button style={styles.button}
          full
          rounded
          onPress={()=>{
            this.signupUser(
              this.state.name,
              this.state.email,
              this.state.password
            )
           }}
          ><Text style={styles.buttonText}>Sign In</Text></Button>

        </Form>
        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity
          onPress={()=> {
            this.props.navigation.navigate("SignIn");
          }}>
              <Text>Already Have an Account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  form: {
    padding: 20,
    width: "100%"
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  }
});
