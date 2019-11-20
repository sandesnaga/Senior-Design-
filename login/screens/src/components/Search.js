import React from 'React';
import {StyleSheet, TextInput, View, Alert, Text} from 'react-native';
import {Button} from 'native-base';
import * as firebase from "firebase";

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : "",
            uid: "",
            temp:''
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
                        j++;
                        this.setState({temp:dobobj[i].location})
                    }
                    
                }
                if(j==0){
                    Alert.alert(searchText+ " is not on any of your shelf");
                    this.setState({temp:""})
                    return;
                }
            }
        })
        locationref.once("value",dataSnapShot=>{
            if(dataSnapShot.val()){
                let dobobj = Object.values(dataSnapShot.val());
                let keyobj = Object.keys(dataSnapShot.val());
                for (var i = 0; i < dataSnapShot.numChildren(); i++){
                    if(keyobj[i]==this.state.temp)
                    {
                       Alert.alert(searchText+" is on " , " Row = "+dobobj[i].Row +
                        " and Column = "+ dobobj[i].Column + " at "+dobobj[i].location) 
                        
                    }
                }
            }
        })
    }
    componentWillUnmount(){
      }
    render(){
        return(
            <View style ={styles.search}>
            <TextInput 
            style = {styles.textInput}
            placeholder = "What do you want to drink today?"
            onChangeText={searchText => {this.setState({searchText})}}
            ></TextInput>
           <Button  
           style= {styles.searchButton}        
            onPress={() => this.search(this.state.searchText)}
             ><Text style={{textAlign: "center",fontWeight: "bold"}}>Search</Text></Button>
             </View>
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
        width: "80%", 
        borderRadius: 10,
        alignItems: "center"
    },
    searchButton:{
        alignItems: "center",      
         width: 90, 
         marginTop:5,
         paddingLeft:20, 
         borderRadius: 10
    }, search:{
        alignItems: "center",
        marginTop: 5,
        marginBottom : 5, 
        
    }
})