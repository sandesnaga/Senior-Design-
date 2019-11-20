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
                <Text style={styles.headerText}>Items you have</Text>
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
    container:{
        flex:1,
    },
    header: {
        flex:1,
        alignItems: "center",
        marginTop: 100,
        marginBottom: 100
      },
      headerText: {
        color: "black"
      },
})