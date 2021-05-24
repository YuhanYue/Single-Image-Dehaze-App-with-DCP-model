import React from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';
import { ScrollView, TouchableOpacity} from 'react-native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { TouchableOpacityBase } from 'react-native';
//flatlist存图片

export default class Profile extends React.Component {
  render(){
    return (
      // user info part
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={require('../assets/avatar.jpg')}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>Full Name</Title>
              <Caption style={styles.caption}>@username</Caption>
            </View>
          </View>
        </View>
  
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009 phone</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>user@email.com</Text>
          </View>
        </View>
        <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title>112</Title>
              <Caption>Dehazed Times Count</Caption>
            </View>
        </View>


        {/* scrollView Starts here! */}
        <ScrollView style={{marginBottom:80}}>
        <FlatList data={imageList}> 
        </FlatList>
        <View style={styles.infoBoxWrapper}>
            <TouchableOpacity style={styles.infoBox}
             onPress = {()=> this.props.navigation.navigate('DehazeResult')}>
              <Text>Dehaze History 1</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.infoBoxWrapper}>
            <TouchableOpacity style={styles.infoBox}
              onPress = {()=> this.props.navigation.navigate('DehazeResult')}>
              <Text >Dehaze History 2</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.infoBoxWrapper}>
            <TouchableOpacity style={styles.infoBox}
              onPress = {()=> this.props.navigation.navigate('DehazeResult')}>
              <Text >Dehaze History 2</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.infoBoxWrapper}>
            <TouchableOpacity style={styles.infoBox}
              onPress = {()=> this.props.navigation.navigate('DehazeResult')}>
              <Text >Dehaze History 2</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.infoBoxWrapper}>
            <TouchableOpacity style={styles.infoBox}
              onPress = {()=> this.props.navigation.navigate('DehazeResult')}>
              <Text >Dehaze History 2</Text>
            </TouchableOpacity>
         </View>
  
        </ScrollView>
      {/* 放去雾历史记录，考虑做时间轴 */}
      </SafeAreaView>
    );
  }
  
};

var imageList = [
  {
    "hazyImageURL": 'file:///Users/overainy/Desktop/ImageData/hazyImage/Q_FRHqac-W_jVRPnj6kfTNb1.jpg/Q_FRHqac-W_jVRPnj6kfTNb1.jpg',
    "dehazedImageURL": 'file:///Users/overainy/Desktop/ImageData/dehazedImage/Q_FRHqac-W_jVRPnj6kfTNb1_dehaze.jpg'
     
  }
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});