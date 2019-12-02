import React from 'React';//!< Import React component for all react native functionalities
import {StyleSheet, TextInput, Button,Text} from 'react-native';//!< Import various designing tools from react-native mainly for Styling
import {AppBar } from "react-native-"

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : ""
        }
    };

    render(){
        return(
            <TextInput 
            style = {styles.textInput}
            placeholder = "What do you want to drink today?"
            ></TextInput>
            
        );
    };
}

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        margin: 1,
        borderColor: 'grey',
        borderWidth: 2,
        height : 40,
        width: 400
    }
})
