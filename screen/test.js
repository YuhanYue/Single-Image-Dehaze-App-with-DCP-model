import React from 'react';
import {View, SafeAreaView, StyleSheet,Image,ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Text,

  TouchableRipple,
} from 'react-native-paper';



export default class test extends React.Component {
 
  state = {
      foodlist: [],
      currentFoodItem: null,
  }

  render(){
      return(
            <ScrollView>
            <Text style={styles.DehazeText}>Before Dehaze</Text>
             <Image 
             source={require('../assets/avatar.jpg')}
            //  source={this.state.hazyImage}
             style={styles.image}
            />  

            <Text style={styles.DehazeText}>After Dehaze</Text>
             <Image 
             source={require('../assets/avatar.jpg')}
            //  source={this.state.hazyImage}
            style={styles.image}
            />  
            </ScrollView>
      );
  }
}

      
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DehazeText: {
    fontSize: 15,
  },
  image:{
    width: 348,
    height: 300,
    marginVertical: 10
},

});