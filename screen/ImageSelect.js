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
import Axios from "axios";
import { response } from 'express';
import CameraRoll from "@react-native-community/cameraroll";




const common_url = 'http://192.168.1.110:3000/';  //服务器地址
token = '';   //用户登陆后返回的token
 


export default class ImageSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          imageURL:'https://i.ibb.co/Zg4JHkY/Hazy-Image.jpg',
          imageInfo:'',
        }
      }

    choosePhotoFromLibary = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            this.setState({imageURL: image['sourceURL']});
            this.setState({imageInfo: image})
          });
          //存图片到数据库
    }

    
    uploadImage(url, params){
        var dehazedImageName = ' ';
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            for (var key in params){
                formData.append(key, params[key]);
            }
            let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'};
            formData.append("file", file);
            fetch(common_url + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData)=> {
                    dehazedImageName = responseData['filename']
                    let path = dehazedImageName;
                    console.log('保存图片路径为',path)
                    CameraRoll.save(path,'photo').then(result => {
                        alert('保存成功！地址如下：\n' + result);
                    }).catch(error => {
                        alert('保存失败！\n' + error);
                    })

                    
                    resolve(responseData);
                })
                .catch((err)=> {
                    console.log('err', err);
                    reject(err);
                });
        });
    }

    startDehaze = async() =>{
        //this.props.navigation.navigate('DehazeResult')
       
        const uploadURL = this.state.imageURL;
        let fileName = uploadURL.substring(uploadURL.lastIndexOf('/') + 1);
        fileName = fileName.substring(0, fileName.lastIndexOf('.'))+"_hazy.jpg";
        console.log(fileName)
        console.log(this.state.imageInfo)
        let params = {
            userId:'1',   //用户id
            path:uploadURL    //本地文件地址
        }
        this.uploadImage('upload', params )
            .then( res=>{
                //请求成功
                // if(res.status === 'success'){
                //     //这里设定服务器返回的header中statusCode为success时数据返回成功
                //     upLoadImgUrl = res.body.imgurl;  //服务器返回的地址
                // }else{
                //      //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
                //     console.log('error!!!');
                // }

            }).catch( err => { 
                console.log('uploadImage', err.message);
                 //请求失败
            })
    
    //     var url = "http://192.168.1.110:3000/upload"
    //     Axios.post(url ,{
    //         imageURL :this.state.imageURL,
    // }).then((response)=>{
    //     let params = {
    //     userId:'1',   //用户id
    //     path: imageURL //手机图片地址
    // }
    // try{
    //     uploadImage('/Users/overainy/Desktop/ImageData/', params )
    //     .then( res=>{
    //     //请求成功
    //     if(res.header.statusCode === 'success'){
    //         //这里设定服务器返回的header中statusCode为success时数据返回成功
    //         upLoadImgUrl = res.body.imgurl;  //服务器返回的地址
    //     }else{
    //         //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
    //         console.log(res.header.msgArray[0].desc);
    //     }
    // }).catch( err => { 
    //     console.log('uploadImage', err.message);
    //     //请求失败
    // })
    //         // await storage().ref(fileName).putFile(uploadURL);
    //     }catch(e){
    //         console.log(e);
    //     }

    // });
        
        //存去雾后图片到数据库
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
