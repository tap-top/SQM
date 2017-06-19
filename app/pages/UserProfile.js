'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Platform,
    Alert
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import EditUsername from './EditUsername'
import EditPasswords from './EditPasswords'
import Login from './LoginPage'
import ImagePicker from 'react-native-image-picker';
import Global from "../Global"
import EditPhoneNum from "./EditPhoneNum"
import {timeout} from "../component/Tools"

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state={
            avatarSource: Global.userinfo.headimg,
            userid:Global.userinfo.userid,
            username:Global.userinfo.username,
            password:Global.userinfo.password,
            phoneNum:Global.userinfo.phoneNum,
        }
    }
    back() {
        this.props.callback();
        this.props.navigator.pop()
    }
    componentDidMount() {
        // alert(JSON.stringify(this.state))
        this.timer=timeout(3000,fetch(Global.url + "/userUpdateInfo",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userID=${this.state.userid}&username=${this.state.username}&password=${this.state.password}&phoneNum=${this.state.phoneNum}&headImg=${this.state.avatarSource}`,
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
                    Global.userinfo.password=json.object.password;
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
                // Alert.alert('提示','账户或密码错误，请您检查后输入1',[{text:'确定'}])
            })

        ).catch((error)=>{
            Alert.alert('提示','网络错误',[{text:'确定'}])
        })
    }
    Fresh(){
        this.timer=timeout(100,fetch(Global.url + "/userUpdateInfo",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userID=${this.state.userid}&username=${this.state.username}&password=${this.state.password}&phoneNum=${this.state.phoneNum}&headImg=${this.state.avatarSource}`,
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
                    Global.userinfo.password=json.object.password;
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
    }
    selectPhotoTapped() {
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
                    avatarSource: JSON.stringify(source)
                });
                Global.userinfo.headimg=JSON.stringify(source)
                // alert(this.state.avatarSource)
            }
        });
    }

    editName() {
        this.props.navigator.push({
            component: EditUsername,
            args: {
                callback:()=>{
                    this.Fresh;
                },
            },

        });
    }
    editPhoneNum(){
        this.props.navigator.push({
            component: EditPhoneNum,
            args: {
                callback:()=>{
                    this.Fresh;
                },
            },

        });
    }
    editPasswords() {
        this.props.navigator.push({
            component: EditPasswords,
            args: {}
        });
    }
    toLogin() {
        this.props.navigator.push({
            component: Login,
            args: {}
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="我的账户"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={{flex: 1, backgroundColor: "#f3f3f3", justifyContent: "space-between"}}>
                    <View>
                        <Item name="头像"
                              avatar={this.state.avatarSource===null?2:JSON.parse(this.state.avatarSource)}
                              first={true}
                              onPress={this.selectPhotoTapped.bind(this)}
                        />
                        <Item name="用户名" subName={Global.userinfo.username} onPress={this.editName.bind(this)}/>
                        {/*<Text style={styles.title}>{"账号绑定"}</Text>*/}
                        {/*<Item name="手机" font="FontAwesome" icon="mobile" subName="135****0418"/>*/}
                        <Item name="手机号码" subName={Global.userinfo.phoneNum} onPress={this.editPhoneNum.bind(this)}/>
                        {/*<Item name="微信" color="#1bce4a" iconSize={15} font="FontAwesome" icon="wechat" subName="已绑定"/>*/}
                        {/*<Item name="QQ" color="#ce3c1b" iconSize={15} font="FontAwesome" icon="qq" subName="未绑定"/>*/}
                        {/*<Item name="微博" color="#fa7d3c" iconSize={16} font="FontAwesome" icon="weibo" subName="未绑定"/>*/}
                        {/*<Text style={styles.title}>{"安全设置"}</Text>*/}
                        <Item name="登录密码" subName="修改" onPress={this.editPasswords.bind(this)}/>
                        {/*<Item name="支付密码" subName="未绑定"/>*/}
                        {/*<Item name="小额免密支付"/>*/}
                    </View>
                    <TouchableHighlight
                        onPress={this.toLogin.bind(this)}
                        style={{backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center', padding: 12}}>
                        <Text style={{color: 'red', fontSize: 20}}>退出当前账号</Text>
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
