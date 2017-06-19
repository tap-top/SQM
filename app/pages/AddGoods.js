'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ScrollView,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    Image
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import Address from './Address'
import SellerHome from './SellerHome'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import Global from "../Global"
export default class EditAddress extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.data.id,
            sellerId:Global.sellerinfo.sellerID||0,
            image:this.props.data.image||1,
            name:this.props.data.name||"",
            info:this.props.data.info||"",
            sale:this.props.data.sale||0,
            price:this.props.data.price||0,
            praise:this.props.data.praise||0,
        };
    // alert(JSON.stringify(this.state))
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
                //Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                    // source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                    //source现在是base64格式，保存到数据库即可
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }
                this.setState({
                    image: JSON.stringify(source)
                });
            }
        });
    }
    componentDidMount(){

        // this.refs.sellerName.focus()
    }
    submit(){
        // alert(JSON.stringify(this.state))
        var fetchOptions={
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`data=${[JSON.stringify(this.state)]}`

        };
        global.url="";
        if(this.props.pageType === 1){
            // 修改
            global.url=Global.url+"/goodsUpdate";
        }else{
            global.url=Global.url+"/goodsAdd";
        }
        fetch(global.url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                this.props.navigator.push({
                    component: SellerHome,
                    args: {
                        pageType: 1,
                        title: "修改地址",
                        data:"",
                    }
                })
                // callback(JSON.parse(responseText));
                ToastAndroid.show(this.props.title+"成功",ToastAndroid.SHORT);
            }).done();
    }
    back(){
        this.props.navigator.pop()
    }
    render(){
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title={this.props.title}
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <ScrollView>
                    <View style={{alignItems:"center",justifyContent:'center',padding:20,backgroundColor:"#EEE"}}>
                        <TouchableOpacity  onPress={this.changeImg.bind(this)}>
                            <Image style={{width:100,height:100,backgroundColor:'white'}} source={JSON.parse(this.state.image)!=undefined?JSON.parse(this.state.image):10}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5,paddingTop:20}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>商品名: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={(text)=>this.setState({name:text})}
                                style={{width:500,padding:5}}
                                value={this.state.name}
                                placeholder={'请输入商品名'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>描    述: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={(text)=>this.setState({info:text})}
                                value={this.state.info}
                                style={{width:500,padding:5}}
                                placeholder={'请输入商品描述'}/>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",flex:1,marginBottom:5}}>
                        <View style={{width:80,alignItems:'center',justifyContent:'center',}}><Text>价    格: </Text></View>
                        <View style={{borderWidth:0.2,borderColor:"#5CBBC0"}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                keyboardType={"numeric"}
                                onChangeText={(text)=>this.setState({price:text})}
                                value={this.state.price.toString()}
                                style={{width:500,padding:5}}
                                placeholder={'请输入商品价格'}/>
                        </View>
                    </View>
                    <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden"}}
                            onPress={this.submit.bind(this)}>
                        <View style={{
                            flex: 1,
                            height: 40,
                            backgroundColor: "#56d176",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{color: "#fff"}}>{"确定"}</Text>
                        </View>
                    </Button>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#f8f8f8",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10
    },
    ManActive: {
        borderColor: "#81c2ff",
        backgroundColor: "#81c2ff",
        color: "white",
    },
    WomanActive: {
        borderColor: "red",
        backgroundColor: "red",
        color: "white",
    },
    label: {
        minWidth: 45,
        fontSize: px2dp(13),
        color: "#222",
        alignItems:'center',
        justifyContent:'center'
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
        height: 30,
        fontSize: 13,
        paddingHorizontal: 10
    },
    radio: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: "#666",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        fontSize: px2dp(13),
        backgroundColor: "#fff"
    }
});
