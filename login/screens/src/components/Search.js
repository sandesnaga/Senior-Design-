import React from 'React';
import {StyleSheet, TextInput, Button,Text, View} from 'react-native';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : ""
        }
    };
    static navigationOptions = {
        title: "Search",
        header: null
    }
    render(){
        return(
            <View>
            <TextInput 
            style = {styles.textInput}
            placeholder = "What do you want to drink today?"
            ></TextInput>
           <Button title={'Search'} onPress={() => {}} /></View>
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