/**
 * Created by tww on 2017/4/22.
 */
/**
 * Created by tww on 2017/4/22.
 */
'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native'
import NavBar from '../component/NavBar'
import UserProfile from './UserProfile'

export default class EditPasswords extends Component{
    constructor(props){
        super(props)
    }
    back() {
        this.props.navigator.pop()
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="修改密码"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                    <View style={{margin:10}}>
                        <TextInput
                            placeholder="当前密码"
                            underlineColorAndroid="#FED161"
                        />
                        <TextInput
                            placeholder="新密码"
                            underlineColorAndroid="#FED161"
                        />
                        <TextInput
                            placeholder="确认新密码"
                            underlineColorAndroid="#FED161"
                        />

                        {/*怎么把文字从上一个页面转移到这个页面*/}
                        <Text>密码长度至少6个字符，最多32个字符</Text>
                    </View>
                    <TouchableHighlight
                        style={{borderRadius:5,margin:10,backgroundColor: "#FED161", justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={{fontSize: 20}}>确定</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666"
    }
})

