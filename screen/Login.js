import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native'

import Inputs from '../components/Inputs'
import Submit from '../components/Submit'

const Login = props =>{
    return(
       <ScrollView style = {{backgroundColor:'whilte'}}>
           <View style={styles.container}>
               <Image source={require('../assets/login.png')}
                style={styles.image} />
                <Text style={styles.textTitle}>Welcome Back</Text>
                <Text style={styles.textBody}>Log in to your existant account</Text>
                <View style ={{marginTop: 20}} />
                <Inputs name="Email" icon="user"/> 
                <Inputs name="Password" icon="lock" pas  s={true}/>
                <View style = {{width: '90%'}}>
                    <Text style={[styles.textBody], {alignSelf: 'flex-end'}}>Forgot Password?</Text>
                </View>
                <TouchableOpacity style={[styles.submitContainer, {backgroundColor: '#0251ce'}]}
                   onPress = {() => props.navigation.navigate('Tab')}>
                    <Text style = {styles.submitText}>LOG IN</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <Text style={styles.textBody}>Don't have an account</Text>
                    <Text style={[styles.textBody, {color:'blue'}]} 
                    onPress = {() => props.navigation.navigate('SignUp')}> Sign Up</Text>
                    </View>
                
           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width: 400,
        height: 300,
        marginVertical: 50
    },
    textTitle:{
        fontWeight:'bold',
        fontSize:40,
    },
    textBody:{
        fontSize: 16,
    
    },
    submitContainer: {
        width: '90%',
        height: 50,
        borderColor: 'blue',
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 0,
    },
    submitText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        alignSelf:'center',
        marginVertical: 10,
    }
    
})

export default Login;