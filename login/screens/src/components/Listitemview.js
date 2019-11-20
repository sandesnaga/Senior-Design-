import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, FlatList} from 'react-native';
import * as firebase from "firebase";
import {Form, Label, Input, Item, Button, Icon, Card} from "native-base"
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export default class Listitemview extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            itemlist: [],
            uid:'',
        }
    }
    updatelist=itemlist=>{
         this.setState({itemlist:[...this.state.itemlist, itemlist]});
    }
componentWillMount(){
    var self = this;
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    var itemref = firebase.database().ref("item_added");
    itemref.once("value",dataSnapShot=>{
        if(dataSnapShot.val()){
            let dobobj = Object.values(dataSnapShot.val());
            for (var i = 0; i < dataSnapShot.numChildren(); i++) {
                if(dobobj[i].uid == uid){
                self.updatelist(dobobj[i]);
                }
            }
            
        }
    })
}
render(){
    return(
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Item(s) you have</Text>
            </View>
            <FlatList
            data={this.state.itemlist}
           
            inverted
            keyExtractor={(item, index)=> item.time.toString()}
            renderItem={({item})=>(
                <Card >
                <Text>{"Item Name: " +item.itemName }</Text>
                <Text>{"Quantity: "+item.itemQuantity}</Text>
            </Card> 
            )}
            ></FlatList>
        </KeyboardAvoidingView>
    )
}


}

const styles = StyleSheet.create({
    
    header: {
        flex:1,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        backgroundColor:"#3C40C6"
      },
      headerText: {
        color: "#fff", 
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 25
      },
})