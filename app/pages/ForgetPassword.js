/**
 * Created by ptootp on 2017/1/9.
 */
'use strict';
import React, {Component} from "react";
import {Dimensions, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
var {height, width} = Dimensions.get('window');

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trueSwitchIsOn: true,
            falseSwitchIsOn: false,
        };
    }

    returnPage() {
        const {navigator} = this.props;
        navigator.pop();
    }

    render() {
        return (
            <View style={{backgroundColor: '#EEE', width: width, height: height,}}>
                {/*标准头*/}
                <View style={{
                    flexDirection: 'row',
                    width: width,
                    padding: 10,
                    justifyContent: 'space-around',
                    backgroundColor: 'white'
                }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name={"chevron-left"} size={23} style={{width: 25, height: 25}} color="black"
                              onPress={() => {
                                  this.returnPage()
                              }}></Icon>
                        <Text style={{fontSize: 18}} onPress={() => {
                            this.returnPage()
                        }}>取消</Text>
                    </View>
                    <Text style={{fontSize: 20}}>忘记密码</Text>
                    <View style={{flex: 1}}></View>
                </View>
                <View style={{marginTop: 25}}></View>

                <View style={{backgroundColor: 'white', paddingHorizontal: 20}}>
                    <TextInput style={{paddingVertical: 8}} placeholder={'请输入手机号'}></TextInput>
                    <View style={{height: 0.3, borderWidth: 0.3, borderColor: '#DDD'}}></View>


                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput style={{width: 0.5 * width, paddingVertical: 8}} placeholder={'请输入验证码'}></TextInput>
                        <TouchableOpacity style={{
                            backgroundColor: '#5C6BC0',
                            justifyContent: 'center',
                            borderRadius: 10,
                            margin: 7,
                            paddingHorizontal: 5
                        }}>
                            <Text style={{fontSize: 17, color: 'white',}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 0.3, borderWidth: 0.3, borderColor: '#DDD'}}></View>
                    <TextInput style={{paddingVertical: 8}} placeholder={'新密码(至少6位)'}></TextInput>
                    <View style={{height: 0.3, borderWidth: 0.3, borderColor: '#DDD'}}></View>

                    <TextInput style={{paddingVertical: 8}} placeholder={'重复密码(两次密码要一致)'}></TextInput>
                </View>

                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#5C6BC0',
                            borderRadius: 5,
                            margin: 20,
                            marginTop: 80,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{color: 'white', fontSize: 23}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
