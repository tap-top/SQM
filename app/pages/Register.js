/**
 * Created by ptootp on 2017/1/10.
 */
'use strict';
import React, {Component} from "react";
import {Dimensions, Text, TextInput, TouchableOpacity, View,Alert} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import LoginPage from "./LoginPage";
import Global from "../Global"
import NavBar from '../component/NavBar'
var {height, width} = Dimensions.get('window');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trueSwitchIsOn: true,
            falseSwitchIsOn: false,
            optionSelected: 0,
            phoneNum:'18756037729',
            username:'',
            password:''
        };
    }

    returnPage() {
        const {navigator} = this.props;
        navigator.pop();
    }

    LoginPage(){
        const {navigator} = this.props;
        navigator.push({
            component: LoginPage,
            name: 'LoginPage',
        });
    }
    Register() {
        fetch(Global.url+"/userAdd",
            {
                method:"post",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${this.state.username}&userpassword=${this.state.password}&phoneNum=${this.state.phoneNum}`,
            }).then((response)=>{
            if(response.ok === true){
                return response.json();
            }else{
                Alert.alert("提示","注册失败",[{text:'确定'}])
            }
        }).then((json)=>{
            if(json != undefined && json.code==="0"){
                const {navigator} = this.props;
                Global.userinfo.userinfo=json.object.username;
                Global.userinfo.password=json.object.userpassword;
                navigator.push({
                    component: LoginPage,
                    name: 'LoginPage',
                });
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
    render() {
        return (
            <View style={{backgroundColor: '#EEE', width: width, height: height,}}>
                <NavBar
                    title="注册"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={{marginTop: 25}}></View>

                <View style={{backgroundColor: 'white', paddingHorizontal: 20}}>
                    <TextInput
                        onChangeText={(text)=>this.setState({phoneNum:text})}
                        style={{paddingVertical: 8}}
                        placeholder={'请输入手机号'}/>
                    <View style={{height: 0.3, borderWidth: 0.3, borderColor: '#DDD'}}></View>
                    {/*<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>*/}
                        {/*<TextInput style={{width: 0.5 * width, paddingVertical: 8}} placeholder={'请输入验证码'}></TextInput>*/}
                        {/*<TouchableOpacity style={{*/}
                            {/*backgroundColor: '#5C6BC0',*/}
                            {/*justifyContent: 'center',*/}
                            {/*borderRadius: 10,*/}
                            {/*margin: 7,*/}
                            {/*paddingHorizontal: 5*/}
                        {/*}}>*/}
                            {/*<Text style={{fontSize: 17, color: 'white',}}>获取验证码</Text>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                    <View style={{height: 0.3, borderWidth: 0.3, borderColor: '#DDD'}}></View>
                    <TextInput
                        onChangeText={(text)=>this.setState({username:text})}
                        style={{paddingVertical: 8}}
                        placeholder={'请输入昵称'}/>
                    <View style={{height: 0.3, borderWidth: 0.3, borderColor: '#DDD'}}></View>
                    <TextInput
                        onChangeText={(text)=>this.setState({password:text})}
                        style={{paddingVertical: 8}}
                        placeholder={'请输入密码(至少6位)'}/>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => this.Register()}
                        style={{
                            width: 0.9 * width,
                            backgroundColor: '#5C6BC0',
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
                </View>
                <View style={{alignItems: 'flex-end', marginTop: 10}}>
                    <Text style={{color: '#3F51B5'}} onPress={() => this.LoginPage()}>已有账号，直接登录>></Text>
                </View>
            </View>
        )
    }
}