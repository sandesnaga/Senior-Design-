import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, Text, View, Image,TextInput, KeyboardAvoidingView, TouchableOpacity, FlatList, Alert} from 'react-native';
import * as firebase from "firebase";
import {Form, Label, Input, Item, Button, Icon, Card} from "native-base"
import { TouchableNativeFeedback } from 'react-native-gesture-handler';



export default class Listitemview extends React.Component{

   
    constructor(props){
        super(props);
        this.state = {
            itemlist: [],
            uid:'',
            quantity:0,
        }
    }

    static navigationOptions = {
        title: "Listitemview",
        header: null
      };
    
    updatelist=itemlist=>{
         this.setState({itemlist:[...this.state.itemlist, itemlist]});
    }

    itemtaken=(itemid,locationid, inputquantity, listquantity,name )=>{
        var { navigation } = this.props;
        navigation={navigation};
        var itemref = firebase.database().ref("item_added");
        var locationref = firebase.database().ref("allocated_space");
        var user = firebase.auth().currentUser;
        if(user!=null)
        {
        if(listquantity<inputquantity){
            Alert.alert("You don't have Enough",name);
            //return;
        }
        else if(Number(listquantity)-Number(inputquantity)==0){
            itemref.child(itemid).remove();
            locationref.child(locationid).update({isAvailable:'Yes'})
            Alert.alert("No item Left");
        }
        else{
                   
                    itemref.child(itemid).update({itemQuantity:Number(listquantity)-Number(inputquantity)});

                    Alert.alert("Item taken","Sucess");
                  
                    return(true);
                    
            }
        
            
    }

    }
   
componentDidMount(){
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
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=>(
                <Card >
                <Text>{"Item Name: " +item.itemName }</Text>
                <Text>{"Quantity: "+item.itemQuantity}</Text>
                <View><TextInput style={styles.inputstyles}
                            keyboardType = 'numeric'
                            placeholder="How many you want to get?"
                            onChangeText={quantity => this.setState({quantity})}
                          
                            />
                             
                             
              </View>
                <Button  onPress={()=>{
                    this.itemtaken(item.key,item.location,Number(this.state.quantity),Number(item.itemQuantity),item.itemName)}}
                     >
                <Text>Get</Text>
                    </Button>
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