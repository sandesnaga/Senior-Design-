import React from 'react';
import { Appbar } from "react-native-paper";
import {
  StyleSheet, 
  Text, 
  View,
  TextInput, Alert}
   from 'react-native';
   import {Button} from "native-base"
   import * as firebase from "firebase";
   import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isNumber } from 'util';
   
   
export default class AllocateSpaceScreen extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      location:'',
      Name:'',
      numColumn:'',
      numRow: '',
      uid:'',
      isAvailable:''
    };
  }

  
 
allocatespace = (location, Name, numColumn, numRow)=>{
  var user = firebase.auth().currentUser;
  var uid;
if(isNumber(numColumn) || isNumber(numRow)||location==""||Name==""){
  Alert.alert("Empty Field/s");
  return true;
}
if (user != null) {
  uid = user.uid;
}
  var locationref = firebase.database().ref("allocated_space");
  //push allocate space to database
  for(var i=1;i<=numColumn;i++){
    for(var j =1;j<=numRow;j++)
    {
      var newlocationref = locationref.push();
      newlocationref.set({
        location: location,
        Name: Name,
        Column:i,
        Row:j,
        time: Date.now(),
        uid: uid,
        isAvailable:'Yes' 
      })
    }
  }
  Alert.alert("Shelf Status","Success");
}
  static navigationOptions = {
    title: "AllocateSpace",
    header: null
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName,
          
        });
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
  }
  componentWillUnmount(){
  }
  render(){
    return (
      <View style={styles.topContainer}>
        <KeyboardAwareScrollView style={styles.form}>
        <Appbar.Header>
          <Appbar.Content title={this.state.name} subtitle={this.state.email} />
          <Appbar.BackAction onPress={() => {
                this.props.navigation.navigate("Home")
            }} />
          <Appbar.Action icon="logout" onPress={this.signOutUser} />
        </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.headingView}
        ><Text style={{fontSize: 20,
          fontWeight: "bold",
          color: "grey" }}>Allocate Space</Text>
        </View> 
            <View style={{paddingVertical:15, flex: 1}}>

            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>Location:</Text>
              </View>
              <View><TextInput style={styles.inputstyles}
                            placeholder="where in house (allocate space)"
                            onChangeText={location => this.setState({location})}/>
                             
              </View>

            </View> 


            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>Name:</Text>
              </View>
              <View><TextInput style={styles.inputstyles}
                            placeholder="Name of Shelf"
                            onChangeText={Name => this.setState({Name})}/>
                             
              </View>

            </View> 


            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>No of Column:</Text>
              </View>
              <View>
                <TextInput style={styles.inputstyles}
                              keyboardType = 'numeric'
                            placeholder="# of column"
                            onChangeText={numColumn => this.setState({numColumn})}/>
                             
              </View>

            </View> 


            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>No of Rows:</Text>
              </View>
              <View><TextInput style={styles.inputstyles}
                              keyboardType = 'numeric'
                            placeholder="# of row"
                            onChangeText={numRow => this.setState({numRow})}/>
                            
              </View>

            </View> 

                  
            </View>
            <View style={styles.button}>
              <Button success style={styles.buttonitem} 
              onPress={()=>{this.allocatespace(
                this.state.location,
                this.state.Name,
                this.state.numColumn,
                this.state.numRow,
                this.props.navigation.navigate("Home")
                )
              
              }
                
                }><Text style={styles.buttonText}>create</Text></Button>
              <Button danger  onPress={()=>
                this.props.navigation.navigate("Home")

              }
              style={styles.buttonitem}>
                <Text style={styles.buttonText}>cancel</Text></Button>
            </View>

          
              
      </View>
      </KeyboardAwareScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 30,
      
  },
  headingView:{
    height: 40,    
    justifyContent: "center",
    alignItems: "center",
        
  },
  form: {
    flex: 1
  },

  locationView:{
    flexDirection: "row",
    justifyContent: "space-between",  
    alignItems:"center",  
    paddingLeft: 25,
    paddingRight: 25,
     paddingVertical: 5
  },
  
  topContainer: {
    flex: 1,
    flexDirection: "column"
  },
  caption:{
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10
  },
  inputstyles:{
    borderColor: "grey",
    borderWidth: 1.5,
    borderRadius: 5,
    minWidth: 200,
    height: 40,
    paddingLeft: 10
  },
  button:{
    
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 20  
   

  },
  buttonitem:{
    width: 200,
    justifyContent: "center",  
    marginBottom: 20,
    borderRadius: 10

  },

  
  buttonText:{
    fontSize:25, 
    color:"#fff"

  }

  
  
});
