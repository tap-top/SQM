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
export default class Login extends Component {
    constructor(props) {
        super(props)
    }
    back() {
        this.props.navigator.pop()
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="登录"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={ {flexDirection: "row",}}>
                    <View style={{justifyContent:"flex-start",alignItems:'center'}}><Text >账号</Text></View>

                    <TextInput></TextInput>
                </View>
            </View>
        )
    }
}