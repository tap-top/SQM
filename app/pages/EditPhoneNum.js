/**
 * Created by tww on 2017/5/7.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    ToastAndroid
} from 'react-native'
import NavBar from '../component/NavBar'
import Global from '../Global'

export default class EditUsername extends Component{
    constructor(props){
        super(props)
        this.state={
            phoneNum:Global.userinfo.phoneNum,
        }
    }
    back() {
        this.props.navigator.pop()
    }
    editUserInfo(){
        Global.userinfo.phoneNum = this.state.phoneNum;
        ToastAndroid.show('修改成功',ToastAndroid.SHORT);
        this.props.callback();
        this.props.navigator.pop();
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="修改手机号"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                    <View style={{margin:10}}>
                        <TextInput
                            autoFocus={true}
                            value={this.state.phoneNum}
                            underlineColorAndroid="#FED161"
                            onChangeText={(text)=> this.setState({phoneNum:text})}
                        />
                        {/*怎么把文字从上一个页面转移到这个页面*/}
                        <Text>以中文或英文字母开头，限4-16个字符</Text>
                    </View>
                    <TouchableHighlight
                        onPress={this.editUserInfo.bind(this)}
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
