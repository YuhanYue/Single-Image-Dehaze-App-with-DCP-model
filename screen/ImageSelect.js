import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native'
import {Avatar} from 'react-native-paper'
import Inputs from '../components/Inputs'
import Submit from '../components/Submit'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'


export default class ImageSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          imageURL:'https://i.ibb.co/Zg4JHkY/Hazy-Image.jpg',
        }
      }
    choosePhotoFromLibary = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            this.setState({imageURL: image['sourceURL']})//Couldn't find image
          });
    }

    startDehaze = async() =>{
        //this.props.navigation.navigate('DehazeResult')
        const uploadURL = this.state.imageURL;
        let fileName = uploadURL.substring(uploadURL.lastIndexOf('/') + 1);
        fileName = fileName.substring(0, fileName.lastIndexOf('.'))+"_hazy.jpg";
        console.log(fileName)
        try{
            await storage().ref(fileName).putFile(uploadURL);
        }catch(e){
            console.log(e);
        }
    };

    render(){
        return(
            <View>
            <Image
                 source={{
                    uri:this.state.imageURL,
                  }}
                  style={{width: '100%', height: '75%'}}
            />  
            <View style = {{flex: 1, alignItems: 'center', marginTop: 25}}>
               <TouchableOpacity style={[styles.SubmitContainer, {backgroundColor: '#0251ce'}]}
                onPress = {this.choosePhotoFromLibary} >
                 <Text style = {styles.submitText}>Choose Photo From Library</Text>
                </TouchableOpacity>
            </View>
            <View style = {{flex: 1, alignItems: 'center', marginTop: 25}}>
               <TouchableOpacity style={[styles.SubmitContainer, {backgroundColor: '#0251ce'}]}
                onPress = {this.startDehaze} >
                 <Text style = {styles.submitText}>Start Dehaze Process</Text>
                </TouchableOpacity>
            </View>
            </View>

        );
    }
        
};
// }
// const ImageSelect = () =>{
//     const [image, setImage] = useState('https://i.ibb.co/Zg4JHkY/Hazy-Image.jpg')
//     const choosePhotoFromLibary = () =>{
//         ImagePicker.openPicker({
//             width: 300,
//             height: 400,
//             cropping: true
//           }).then(image => {
//             console.log(image);
//             setImage(image.sourceURL)
//           });
//     }

//     const startDehaze = () =>{
//         this.props.navigation.navigate('SignUp')
//     };

//         return(
//             <View>
//             <Image
//                  source={{
//                     uri:image,
//                   }}
//                   style={{width: '100%', height: '75%'}}
//             />  
//             <View style = {{flex: 1, alignItems: 'center', marginTop: 25}}>
//                <TouchableOpacity style={[styles.SubmitContainer, {backgroundColor: '#0251ce'}]}
//                 onPress = {choosePhotoFromLibary} >
//                  <Text style = {styles.submitText}>Choose Photo From Library</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style = {{flex: 1, alignItems: 'center', marginTop: 25}}>
//                <TouchableOpacity style={[styles.SubmitContainer, {backgroundColor: '#0251ce'}]}
//                 onPress = {startDehaze} >
//                  <Text style = {styles.submitText}>Start Dehaze Process</Text>
//                 </TouchableOpacity>
//             </View>
//             </View>

//         );
// };

// export default ImageSelect;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width: 348,
        height: 300,
        marginVertical: 50
    },
    textTitle:{
        fontWeight:'bold',
        fontSize:40,
    },
    textBody:{
        fontSize: 16,
    
    },SubmitContainer: {
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
    },
    
});
