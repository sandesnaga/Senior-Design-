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
            if(inputquantity===0){
                Alert.alert("please enter quantity!");
                return;
            }
        if(listquantity<inputquantity){
            Alert.alert("You don't have Enough",name);
            return;
        }
        else if(Number(listquantity)-Number(inputquantity)==0){
            itemref.child(itemid).remove();
            locationref.child(locationid).update({isAvailable:'Yes'})
            Alert.alert("All item taken/ No item Left");
        }
        else{
                   
                    itemref.child(itemid).update({itemQuantity:Number(listquantity)-Number(inputquantity)});

                    Alert.alert("Item taken","Sucess");
                  
                    return(true);
                    
            }
        
            
    }

    }

    iteminfo=itemid=>{
        var itemref = firebase.database().ref("item_added");
        var locationref = firebase.database().ref("allocated_space");
        itemref.once("value", data=>{
            var locationid= data.child(itemid).val().location;
            const name= data.child(itemid).val().itemName;
            var quantity= data.child(itemid).val().itemQuantity;
            var type = data.child(itemid).val().itemtype;
            var brewloc = data.child(itemid).val().bplace;
            
            locationref.once("value", loc=>{
                var lname= loc.child(locationid).val().Name;
                var llocate= loc.child(locationid).val().location;
                var row= loc.child(locationid).val().Row;
                var column= loc.child(locationid).val().Column;
                if(type!=1){
                Alert.alert(quantity+ " "+ name + " brewed on "+brewloc +" is at "+lname + " inside " + llocate +" at "+row+" X "+column+" position." )
                }
                else{
                    Alert.alert(quantity+ " "+ name + " is at "+lname + " inside " + llocate +" at "+row+" X "+column+" position." )
                }
            })
             
        })
        
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
            <View style ={{backgroundColor:'#393636'}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Item(s) you have</Text>
            </View>
            <FlatList
            data={this.state.itemlist}
           
            inverted
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=>(
                <Card style={{backgroundColor:'#393636'}} >
                    <View style={{marginLeft: 10, marginBottom: 7 }}>
                    <Text style={{fontWeight:"bold", backgroundColor:'#393636',color:'#F1F0FF' }}>{"Item Name: " +item.itemName }</Text>
                    <Text style={{fontWeight:"bold", backgroundColor:'#393636',color:'#F1F0FF' }}>{"Quantity: "+item.itemQuantity}</Text>
                    </View>
                
                <View style={{ padding: 10,
                        margin: 1,
                        borderColor: 'grey',
                        borderWidth: 2,
                        height : 40,
                        width: "80%", 
                        borderRadius: 10,
                        alignItems: "center" }}>
                            <TextInput style={styles.inputstyles}
                            keyboardType = 'numeric'
                            placeholderTextColor = '#758AA2'
                            placeholder="How many you want to get?"
                            onChangeText={quantity => this.setState({quantity})}
                          
                            />
                             
                             
              </View>
              <View style={styles.buttonView}>
              <Button 
                 full                 
                 style={styles.listButtons}
                 onPress={()=>{
                    this.itemtaken(item.key,item.location,Number(this.state.quantity),Number(item.itemQuantity),item.itemName)}}
                >
                    <Text style = {{ color: "#fff"}}>Get</Text>
                </Button>
                
                <Button 
                    style={styles.listButtons}
                    full                 
                    onPress={()=>{ this.iteminfo(item.key)
                    }}
                >
                    <Text style = {{ color: "#fff"}}>Show Details</Text>
                </Button>
                    
              </View>
                
            </Card> 
            )}
            ></FlatList>
            </View>
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
        backgroundColor:'#393636'
      },
      headerText: {
        color: "#758AA2", 
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 25
      },
      listButtons:{
        width: 100, 
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5, 
        borderRadius: 10,
        backgroundColor:"#4834DF",
       

      },
      inputstyles:{
        paddingLeft:5
      },
        buttonView:{
            backgroundColor:'#393636',
        flexDirection: "row",
        flexWrap: "wrap"
      }
})