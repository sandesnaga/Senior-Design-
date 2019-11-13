import React from 'React';
import {StyleSheet, TextInput, Button, View, Alert} from 'react-native';
import * as firebase from "firebase";

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : "",
            uid: ""
        }
    };
    static navigationOptions = {
        title: "Search",
        header: null
    }
    search=(searchText)=>{
        var user = firebase.auth().currentUser;
        var uid, j=0;
        
        if (user != null) {
            uid = user.uid;
        }
        var itemref = firebase.database().ref("item_added");
        var locationref = firebase.database().ref("allocated_space");

        itemref.once("value",dataSnapShot=>{
            if(dataSnapShot.val()){
                let dobobj = Object.values(dataSnapShot.val());
                for (var i = 0; i < dataSnapShot.numChildren(); i++) {
                    if(dobobj[i].itemName==searchText && dobobj[i].uid==uid)
                    {
                        locationref.once("value",dataSnapShot=>{
                            if(dataSnapShot.val()){
                            let locobj = Object.values(dataSnapShot.val());
                            Alert.alert(searchText+ " is on ", "Row = "+locobj.child(dobobj[i].location).Row  +" and Column = "+ locobj.child(dobobj[i].location).Column + " at "+dobobj[i].location);
                            }
                        })
                    
                       
                        j++
                    }
                    
                }
                if(j==0){
                    Alert.alert(searchText+ " is not on any of your shelf");
                }
            }
            if(j==0){
                Alert.alert(searchText+ " is not on any of your shelf");
            }
        })
    }
    componentWillUnmount(){
      }
    render(){
        return(
            <View>
            <TextInput 
            style = {styles.textInput}
            placeholder = "What do you want to drink today?"
            onChangeText={searchText => {this.setState({searchText})}}
            ></TextInput>
           <Button title={'Search'} onPress={() => this.search(this.state.searchText)} /></View>
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