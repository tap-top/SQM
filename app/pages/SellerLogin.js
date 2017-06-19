/**
 * Created by ptootp on 2017/1/3.
 */
'use strict';
import React, {Component} from "react";
import {Dimensions, Image,Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,BackAndroid,Picker} from "react-native";
// import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import Checkbox from "./CheckBox";
//导入测试例
import SellerRegister from "./SellerRegister";
import Global from "../Global";
import Wrapper from "../component/Wrapper"
import {timeout} from "../component/Tools"
import NavBar from '../component/NavBar'
import SellerHome from './SellerHome'
var {height, width} = Dimensions.get('window');
let loginInfo = { "username": "", "password": "" };
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            optionSelected: 0,
            sellerName:"",
            password:"",
            selectedValue:"用户",
        }
        BackAndroid.addEventListener('hardwareBackPress',  ()=> {
            this.props.navigator.pop();
            return false;
        });
    }
    back(){
        this.props.navigator.pop()
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }
    login() {
        //var reg = "^1[345789][0-9]{9}$";//正则表达式判定手机号
        //var re = new RegExp(reg);
        //re.test(this.state.username)
        // alert(JSON.stringify(this.state))
        if(this.state.username !="" && this.state.password !="" ){
            fetch(Global.url + "/sellerLogin",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `sellerName=${this.state.sellerName}&sellerPassword=${this.state.password}`,
                }).then((response) => {
                    this.timer && clearTimeout(this.timer);
                    if (response.ok === true) {
                        return response.json();
                    } else {
                        Alert.alert('出错信息', "登录失败", [{text: '确定'}])
                    }
                }).then((json) => {
                    if (json != undefined && json.code === "0002") {
                        alert("账号或密码错误");
                    } else {
                        Global.sellerinfo.sellerID=json.object.sellerId;
                        Global.sellerinfo.brand = json.object.brand;
                        Global.sellerinfo.sellerName = json.object.sellername;
                        Global.sellerinfo.sellerAddress = json.object.sellerAddress;
                        Global.sellerinfo.sellerPhone = json.object.sellerPhone;
                        this.props.navigator.push({
                            component: SellerHome,
                            args: {
                                sellerData:json.object
                            }
                        })
                    }
                }).catch((error)=>{
                    Alert.alert('提示','账户或密码错误，请您检查后输入',[{text:'确定'}])
                }
            )
        }

    }

    Register() {
        const {navigator} = this.props;
        navigator.push({
            component: SellerRegister,
            name: 'SellerRegister',
        });
    }

    // ForgetPassword() {
    //     const {navigator} = this.props;
    //     navigator.push({
    //         component: ForgetPassword,
    //         name: 'ForgetPassword',
    //     });
    // }

    render() {
        return (
            <View style={{height: height}}>
                <NavBar
                    title="商家登录"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />

                <View style={styles.headborder}/>
                <View style={{backgroundColor: '#EEE',width:width, height: height - 20}}>
                    <View style={styles.loginImgRange}>
                        <Image style={styles.loginimg} source={Global.userinfo.headimg}/>
                    </View>
                    <View style={styles.inputRange}>
                        <TextInput
                            style={{width: 0.9 * width, height: 50, textAlignVertical: 'center',}}
                            placeholderTextColor="#aaaaaa"
                            placeholder="账号"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({sellerName: text})}
                        />
                        <View style={[styles.headborder, {width: 0.9 * width}]}/>
                        <TextInput
                            style={{width: 0.9 * width, height: 50, textAlignVertical: 'center',}}
                            secureTextEntry={true}
                            placeholderTextColor="#aaaaaa"
                            placeholder="密码"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                    <View style={{marginTop:20,paddingHorizontal: 0.05 * width}}>
                        <View style={{alignItems: 'center',}}>
                            <TouchableOpacity onPress={() => {
                                this.login()
                            }} style={{
                                borderRadius: 10,
                                height: 40,
                                backgroundColor: '#5CBBC0',
                                width: 0.9 * width,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{color: 'white', fontSize: 20}}>登录</Text>
                            </TouchableOpacity>
                        </View>
                        {/*忘记密码*/}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            marginTop: 10
                        }}>
                            <Text style={{color: "#5CBBC0", fontSize: 17}} onPress={() => {
                                this.Register()
                            }}>注册</Text>
                            {/*<Text style={{color: "#5CBBC0", fontSize: 17}} onPress={() => {*/}
                                {/*this.ForgetPassword()*/}
                            {/*}}>忘记密码？</Text>*/}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
//样式类型
const styles = StyleSheet.create({
    loginText: {// 登录头
        padding: 10,
        fontSize: 20,
        height: 50,
        width: width,
        textAlign: 'center',
    },
    headborder: {
        borderWidth: 0.3,
        height: 0.3,
        width: width,
        borderColor: '#aaa',
    },
    loginImgRange: {
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        width: width,
    },
    loginimg: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 70,
    },
    inputRange: {
        height: 100,
        width: width,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderRadius: 3,
        borderWidth: 1,
        marginTop: 1,
        alignItems: 'center',
    },
    container: {
        marginTop: 10,
        padding: 10
    },
    text: {
        padding: 10,
        fontSize: 20,
    },
});