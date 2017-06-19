/**
 * Created by ptootp on 2017/1/3.
 */
'use strict';
import React, {Component} from "react";
import {Dimensions, Image,Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,BackAndroid,Picker} from "react-native";
// import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import Checkbox from "./CheckBox";
//导入测试例
import ForgetPassword from "./ForgetPassword";
import Register from "./Register";
import Global from "../Global";
import Wrapper from "../component/Wrapper"
import NavBar from '../component/NavBar'
import {timeout} from "../component/Tools"
var {height, width} = Dimensions.get('window');
let loginInfo = { "username": "", "password": "" };
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            optionSelected: 0,
            username: Global.userinfo.username,
            password: Global.userinfo.password,
            selectedValue:"用户",
        }
        BackAndroid.addEventListener('hardwareBackPress',  ()=> {
            this.props.navigator.pop();
            return false;
        });
    }0
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }
    back(){
        this.props.navigator.pop()
    }
    login() {
        //var reg = "^1[345789][0-9]{9}$";//正则表达式判定手机号
        //var re = new RegExp(reg);
        //re.test(this.state.username)
        if(this.state.username !="" && this.state.password !="" ){
            this.timer=timeout(3000,fetch(Global.url + "/userLogin",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `username=${this.state.username}&userpassword=${this.state.password}`,
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
                    Global.hasLogin="true";
                    Global.userinfo.userid=json.object.userid;
                    Global.userinfo.username=json.object.username;
                    Global.userinfo.password=json.object.userpassword;
                    Global.userinfo.phoneNum=json.object.phonenum;
                    Global.userinfo.headimg=json.object.headimg;
                    this.props.navigator.push({
                        component: Wrapper,
                        args: {
                            pageType: 0,
                        }
                    })
                }
            }).catch((error)=>{
                    Alert.alert('提示','账户或密码错误，请您检查后输入',[{text:'确定'}])
                })

            ).catch((error)=>{
                Alert.alert('提示','网络错误',[{text:'确定'}])
                })

        }else{
            Alert.alert("提示","账户或密码不能为空",[{text:'确定'}])
        }

    }

    Register() {
        const {navigator} = this.props;
        navigator.push({
            component: Register,
            name: 'Register',
        });
    }

    ForgetPassword() {
        const {navigator} = this.props;
        navigator.push({
            component: ForgetPassword,
            name: 'ForgetPassword',
        });
    }

    render() {
        return (
            <View style={{height: height}}>
                <NavBar
                    title="登录"
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
                            onChangeText={(text) => this.setState({username: text})}
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
                    {/*<View style={{marginTop:20,flexDirection:'row',width:width,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<Text>请选择：</Text>*/}
                        {/*<Picker*/}
                            {/*style={{width:0.3*width,height:30,}}*/}
                            {/*//Picker样式 dialog弹窗样式默认  dropdown显示在下边*/}
                           {/*// mode = {'dropdown'}*/}

                            {/*//显示选择内容*/}
                            {/*selectedValue={this.state.selectedValue}*/}
                            {/*//选择内容时调用此方法*/}
                            {/*onValueChange={(value)=>this.setState({selectedValue: value})}*/}
                            {/*//设置Title 当设置为dialog时有用*/}
                            {/*prompt={'请选择'}*/}
                        {/*>*/}
                            {/*<Picker.Item label='用户' value='用户'/>*/}
                            {/*<Picker.Item label='商家' value='商家'/>*/}
                        {/*</Picker>*/}
                    {/*</View>*/}

                    <View style={{marginTop:20,paddingHorizontal: 0.05 * width}}>
                        <View style={{alignItems: 'center',}}>
                            <TouchableOpacity onPress={() => {
                                this.login()
                            }} style={{
                                borderRadius: 10,
                                height: 40,
                                backgroundColor: '#5C6BC0',
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
                            <Text style={{color: "#3F51B5", fontSize: 17}} onPress={() => {
                                this.Register()
                            }}>注册</Text>
                            <Text style={{color: "#3F51B5", fontSize: 17}} onPress={() => {
                                this.ForgetPassword()
                            }}>忘记密码？</Text>
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