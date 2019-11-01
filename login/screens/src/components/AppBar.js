import React from 'React';
import {StyleSheet, TextInput, Button,Text} from 'react-native';
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