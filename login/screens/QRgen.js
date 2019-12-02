
import QRCode from 'react-native-qrcode-svg'; //!< Import QR generating api from react-native-qrcode-svg
import React, { Component } from 'react'; //!< Import React component for all react native functionalities
import {View, Text, StyleSheet} from 'react-native';//!< Import various designing tools from react-native mainly for Styling
import { Appbar } from "react-native-paper";

/*!
 * \brief Generates the QR code base on item id
 * \param tempdata holds the item ID
 */
export default class QRgen extends Component {
  
  static navigationOptions = {
    title: 'QRgen',
  };
  
render() {
  const { navigation } = this.props;
  var tempdata=navigation.getParam('Passeddata','')
  return (
  <View>
    <View style={{ flex: 1 }}>
            
            <Appbar.Header>
              <Appbar.BackAction
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
            </Appbar.Header>
        
          </View>
   
    <View style={{alignItems: "center"}}>
    <Text style={styles.topContainer}>Save this QR for future</Text>
   <QRCode
      value={tempdata}
    />
    </View>
    </View>
  )
};
}


const styles = StyleSheet.create({
  topContainer: {
      alignItems: "center",
      height: "10%",
      marginTop: 100,
      marginBottom: 10
    },
  });//!< Controls various styling for the application

























// 'use strict';
 
// import React from 'react'
// import QRCode from 'react-native-qrcode-generator';
 
// import {
//     AppRegistry,
//     StyleSheet,
//     View,
//     TextInput
// } from 'react-native';
 
// class QRgen extends Component {
//   state = {
//     text: 'http://facebook.github.io/react-native/',
//   };
 
//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => this.setState({text: text})}
//           value={this.state.text}
//         />
//         <QRCode
//           value={this.state.text}
//           size={200}
//           bgColor='black'
//           fgColor='white'/>
//       </View>
//     );
//   };
// }
 
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
 
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         margin: 10,
//         borderRadius: 5,
//         padding: 5,
//     }
// });
 
// AppRegistry.registerComponent('QRgen', () => QRgen);
 
// module.exports = QRgen;
 
// import React, { Component } from 'react'
// import QRCode from 'react-native-qrcode-generator';
 
// import {
//     AppRegistry,
//     StyleSheet,
//     View,
//     TextInput
// } from 'react-native';
 
// export default class QRgen extends Component {
//   state = {
//     text: 'http://facebook.github.io/react-native/',
//   };
 
//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => this.setState({text: text})}
//           value={this.state.text}
//         />
//         <QRCode
//           value={this.state.text}
//           size={200}
//           bgColor='black'
//           fgColor='white'/>
//       </View>
//     );
//   };
// }
 
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
 
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         margin: 10,
//         borderRadius: 5,
//         padding: 5,
//     }
// });
 
// AppRegistry.registerComponent('QRgen', () => QRgen);
 
// module.exports = QRgen;
