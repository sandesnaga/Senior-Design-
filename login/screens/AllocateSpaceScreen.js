import React from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,TextInput}
   from 'react-native';
   import {Button} from "native-base"
   import * as firebase from "firebase";
   
   
export default class AllocateSpaceScreen extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      location:'',
      Name:'',
      numColumn:'',
      numRow: ''
    };
  }

componentDidMount() {
  firebase.auth().onAuthStateChanged(authenticate => {
    if (authenticate) {
      this.setState({
        email: authenticate.email,
        name: authenticate.displayName,
        dob: authenticate.born,
        
      });
    } else {
      this.props.navigation.replace("SignIn");
    }
  });
}
 
allocatespace = (location, Name, numColumn, numRow)=>{
  for(var i=1;i<=numColumn,i++){
    
  }
  var locationref = firebase.database().ref("allocated_space");
  //push allocate space to database
  var newlocationref = locationref.push();
  newlocationref.set({
    location: location,
    Name: Name,
    Column:numColumn,
    Row:numRow,
    time: Date.now() 
  })
  this.setState({
    location:'---',
    Name:'---',
    numColumn:'---',
    numRow:'---'
  })
}
  static navigationOptions = {
    title: "AllocateSpace",
    header: null
  };

  
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.headingView}
        ><Text style={{fontSize: 20,
          fontWeight: "bold",
          color: "grey" }}>Add Shelf</Text>
        </View> 
            <View style={{paddingVertical:15, flex: 1}}>

            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>Location:</Text>
              </View>
              <View><TextInput style={styles.inputstyles}
                            placeholder="where in house"
                            onChangeText={location => this.setState({location})}/>
                             
              </View>

            </View> 


            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>Name:</Text>
              </View>
              <View><TextInput style={styles.inputstyles}
                            placeholder="Name of 
                            Shelf"
                            onChangeText={Name => this.setState({Name})}/>
                             
              </View>

            </View> 


            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>No of Column:</Text>
              </View>
              <View>
                <TextInput style={styles.inputstyles}
                            placeholder="# of column"
                            onChangeText={numColumn => this.setState({numColumn})}/>
                             
              </View>

            </View> 


            <View style={styles.locationView}>     
              <View >
                <Text style={styles.caption}>No of Rows:</Text>
              </View>
              <View><TextInput style={styles.inputstyles}
                            placeholder="
                            # of row"
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
                this.state.numRow
                )}
                
                }><Text style={styles.buttonText}>create</Text></Button>
              <Button danger  onPress={()=>
                this.props.navigation.navigate("Home")

              }
              style={styles.buttonitem}>
                <Text style={styles.buttonText}>cancel</Text></Button>
            </View>

          
              
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
  
  locationView:{
    
    flexDirection: "row",
    justifyContent: "space-between",  
    alignItems:"center",  
    paddingLeft: 25,
    paddingRight: 25,
     paddingVertical: 5

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
