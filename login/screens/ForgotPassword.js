import React from 'react'; //!< Import React component for all react native functionalities
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native'; //!< Import various designing tools from react-native mainly for Styling
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase'; //!< Imports necessary component of Firebase


/*!
 * \brief User can reset their password when exixting user request for that
 * \param email Email of the user
 */
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

});//!< Controls various styling for the application
