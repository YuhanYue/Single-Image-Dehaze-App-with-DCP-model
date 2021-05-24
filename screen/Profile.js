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
import { Component } from 'react';
import Card from '../components/Card'
import RNFetchBlob from 'react-native-fetch-blob'





class FlatListItem extends Component{
  render(){
    <View style={styles.infoBoxWrapper}>
      
    </View>
  }
}


function getJsonLength(jsonObj) {
  var Length = 0;
for (var item in jsonObj) {
     Length++;
  }
 return Length;
}

export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pairedImageData: null,
      dehazeCount: 0,
    }
  }

  componentDidMount() {
    this.fetchData();
    }

  componentDidUpdate(){
    //this.fetchData();
  }

  fetchData(){
    var url = 'http://192.168.1.110:3000/history';
    fetch(url)
        .then((res)=> res.json())//转化为json
        .then((json)=>{
            this.setState({pairedImageData:json});//将json数据传递出去，setState会重新调用render()
            this,this.setState({dehazeCount: getJsonLength(json)})
            console.log(this.state.pairedImageData);
            console.log('fetch image data suceess')
            console.log('dehazedCOunt', this.state.dehazeCount)
            //console.log(this.state.routeName);
            //console.log(this.state.routeData[0]);
        })
        .catch((e)=>{
            alert('fetch data error',e);
        });
  }


  render(){
    //this.fetchData();
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
              <Title>{this.state.dehazeCount}</Title>
              <Caption>Dehazed Times Count</Caption>
            </View>
        </View>


        {/* scrollView Starts here! */}
        <ScrollView style={{marginBottom:80, paddingBottom: 30}}>
        <FlatList data ={this.state.pairedImageData} keyExtractor={(item, index) => index.toString()} renderItem={
          ({item}) =>
                 <TouchableOpacity style={styles.infoBoxWrapper}
                 onPress = {()=> this.props.navigation.navigate('DehazeResult',{
                   hazyImageURL: item.hazyImageURL,//这里要传进去的是存在手机上的位置
                   dehazedImageURL: item.dehazedImageURL,
                 })}>
                  {/* <Text>Dehaze History 1</Text> */}
                  <Card 
                image={{uri: "http://192.168.1.110:8521/hazyImage/" + item.imageName}}
                caption={'your dehazed pic' + item.countID}
              />
                </TouchableOpacity>
        }
        ></FlatList>
  
        </ScrollView>
      {/* 放去雾历史记录，考虑做时间轴 */}
      </SafeAreaView>
    );
  }
  
};


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

    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});