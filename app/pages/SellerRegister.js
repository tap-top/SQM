/**
 * Created by tww on 2017/5/26.
 */
import React, {Component} from "react";
import {Dimensions, Text, TextInput, TouchableOpacity, View,Alert,Image,ScrollView,Platform} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SellerLogin from "./SellerLogin";
import Global from "../Global"
import NavBar from '../component/NavBar'
import ImagePicker from 'react-native-image-picker';
var {height, width} = Dimensions.get('window');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerId:0,
            brand:"10",
            sellerName:"",
            sellerPassword:"",
            sellerPhone:"",
            sellerAddress:"",
            stars:"5.0",
            monthSelled:"0",
            sellerTime:"",
            distance:"",
            startPrice:"",
            dispatchPrice:"",
            perCaptitaPrice:"",
        };
    }

    returnPage() {
        const {navigator} = this.props;
        navigator.pop();
    }

    LoginPage(){
        const {navigator} = this.props;
        navigator.push({
            component: SellerLogin,
            name: 'SellerLogin',
        });
    }
    Register() {

        fetch(Global.url+"/sellerAdd",
            {
                method:"post",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `data=${JSON.stringify(this.state)}`,
            }).then((response)=>{
            if(response.ok === true){
                return response.json();
            }else{
                Alert.alert("提示","注册失败",[{text:'确定'}])
            }
        }).then((json)=>{
            if(json != undefined && json.code==="0"){
                this.props.navigator.push({
                    component: SellerLogin,
                    args: {
                        pageType: 0,
                    }
                })
            }else{
                Alert.alert('提示', json.msg, [{text: '确定'}])
            }
        }).catch((error) => {
            if (error != null && error != "") {
                Alert.alert('提示', "注册失败", [{text: '确定'}])
            }
        })
    }
    back(){
        this.props.navigator.pop()
    }
    changeImg(){
        const options = {
            title:'请选择',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            cancelButtonTitle:'取消',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                //Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                    // source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                    //source现在是base64格式，保存到数据库即可
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }
                this.setState({
                    brand: JSON.stringify(source)
                });
            }
        });
    }
    render() {
        return (
            <View style={{backgroundColor: '#EEE', width: width, height: height,}}>
                <NavBar
                    title="商家注册"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={{alignItems:"center",justifyContent:'center',padding:20,backgroundColor:"#EEE"}}>
                    <TouchableOpacity  onPress={this.changeImg.bind(this)}>
                        <Image style={{width:100,height:100,backgroundColor:'white'}} source={JSON.parse(this.state.brand)}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>商 家 名: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({sellerName:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入商家名'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>密      码: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({sellerPassword:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入密码'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>电话号码: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({sellerPhone:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入电话号码'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>地      址: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({sellerAddress:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入地址'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>配送时间: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({sellerTime:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入配送时间'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>距      离: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({distance:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入距离'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>起送价格: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({startPrice:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入起送价格'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>配送价格: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({dispatchPrice:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入配送价格'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>人均价格: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                onChangeText={(text)=>this.setState({perCaptitaPrice:text})}
                                style={{width:500,padding:5}}
                                placeholder={'请输入人均价格'}/>
                        </View>
                    </View>
                </ScrollView>
                <View style={{justifyContent: 'center', alignItems: 'center',marginBottom:20}}>
                    <TouchableOpacity
                        onPress={() => this.Register()}
                        style={{
                            width: 0.9 * width,
                            backgroundColor: '#5CBBC0',
                            borderRadius: 10,
                            margin: 20,
                            marginBottom: 5,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{color: 'white', fontSize: 23}}>注册</Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'flex-end', margin: 20}}>
                        <Text style={{color: '#5CBBC0'}} onPress={() => this.LoginPage()}>已有账号,点此登录</Text>
                    </View>
                </View>
            </View>
        )
    }
}