import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
        };
    }
    static navigationOptions = {
        title: "ForgotPassword",
        header: null
      };
    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
            this.props.navigation.replace("SignIn");
    }
    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Forgot Password</Text>

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button title="Reset Password" onPress={this.onResetPasswordPress} />
               
            </View>
        );
    }
}

const styles = StyleSheet.create({

});