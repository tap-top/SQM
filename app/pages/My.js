'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    AlertIOS,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    RefreshControl,
    Alert,
    AsyncStorage
} from 'react-native';
import LocalImg from '../images'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import Notice from './Notice'
import UserProfile from './UserProfile'
import Address from './Address'
import px2dp from '../util'
import LoginPage from './LoginPage'
import Global from '../Global'
import Icon from 'react-native-vector-icons/Ionicons'
import SellerLogin from './SellerLogin'
let {width, height} = Dimensions.get('window')

export default class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin:Global.hasLogin||false,
            username:Global.userinfo.username||"ptootp",
            phoneNum:Global.userinfo.phoneNum,
            isRefreshing: false
        }
        this.config = [
            {icon: "ios-pin", name: "收货地址", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-star", name: "我的收藏", color: "#fc7b53", onPress: this.alert.bind(this)},
            {icon: "ios-chatbubbles", name: "我的评价", onPress: this.alert.bind(this)},
            {icon: "md-flower", name: "服务中心", onPress: this.alert.bind(this)},
            {icon: "md-contacts", name: "商家入驻", onPress: this.SellerLogin.bind(this)},
            {icon: "ios-more", name: "更多", onPress: this.alert.bind(this)},
        ];
    }

    goPage(key, data = {}) {
        let pages = {
            "address": Address
        }
        if (pages[key]) {
            this.props.navigator.push({
                component: pages[key],
                args: {data}
            })
        }
    }
    SellerLogin() {
        this.props.navigator.push({
            component: SellerLogin,
            args: {}
        })
    }

    alert() {
        alert("还未开放，敬请期待");
    }

    leftPress() {

    }

    rightPress() {
        this.props.navigator.push({
            component: Notice,
            args: {}
        });
    }
    LoginPage() {
        this.props.navigator.push({
            component: LoginPage,
            args: {}
        });
    }

    goProfile() {
        this.props.navigator.push({
            component: UserProfile,
            args: {
                callback:()=>{
                    this.setState({username:Global.userinfo.username})
                    this.setState({phoneNum:Global.userinfo.phoneNum})
                }
            }
        });
    }

    componentDidMount() {
        this._onRefresh()
        // AsyncStorage.getItem('IsLogined', (err, state) => {
        //     if (state != null && state === "1") {
        //     }
        //     else if (state === null) {
        //         AsyncStorage.setItem('loginstate', "1", (err) => {
        //             if (err) {
        //                 //TODO:存储 出错
        //                 Alert.alert('出错信息', err, [{ text: '确定'}])
        //             };
        //         });
        //     }
        // });
        //固化信息需要包括所有的用户信息
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 1500)
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            if (i % 3 == 0) {
                item.first = true
            }
            return (<Item key={i} {...item}/>)
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="我的"
                    // leftIcon="ios-notifications-outline"
                    // leftPress={this.leftPress.bind(this)}
                    rightIcon="ios-notifications-outline"
                    rightPress={this.rightPress.bind(this)}
                />
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#fff"
                            colors={['#ddd', '#0398ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
                        {!this.state.isLogin?
                            (<TouchableWithoutFeedback onPress={this.LoginPage.bind(this)}>
                                <View style={[styles.userHead,{justifyContent:'center'}]}>
                                    <Text style={{fontSize:18,color:'white'}}>登录/注册</Text>
                                </View>
                            </TouchableWithoutFeedback>)
                            :
                            (<TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
                                <View style={styles.userHead}>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Image source={Global.userinfo.headimg===undefined?LocalImg.avatar:JSON.parse(Global.userinfo.headimg)}
                                           style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                                    <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                        <Text style={{color: "#fff", fontSize: px2dp(18)}}>{this.state.username}</Text>
                                        <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                            <Icon name="ios-phone-portrait-outline" size={px2dp(14)} color="#fff"/>
                                            <Text
                                                style={{color: "#fff", fontSize: 13, paddingLeft: 5}}>{this.state.phoneNum}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Icon name="ios-arrow-forward-outline" size={px2dp(22)} color="#fff"/>
                            </View>
                        </TouchableWithoutFeedback>)}
                        {/*<View style={styles.numbers}>*/}
                        {/*<TouchableWithoutFeedback>*/}
                        {/*<View style={styles.numItem}>*/}
                        {/*<Text style={{color: "#f90", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"999999.0元"}</Text>*/}
                        {/*<Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"余额"}</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableWithoutFeedback>*/}
                        {/*<TouchableWithoutFeedback>*/}
                        {/*<View style={[styles.numItem,{borderLeftWidth: 1, borderLeftColor: "#f5f5f5",borderRightWidth: 1, borderRightColor: "#f5f5f5"}]}>*/}
                        {/*<Text style={{color: "#ff5f3e", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"520个"}</Text>*/}
                        {/*<Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"优惠"}</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableWithoutFeedback>*/}
                        {/*<TouchableWithoutFeedback>*/}
                        {/*<View style={styles.numItem}>*/}
                        {/*<Text style={{color: "#6ac20b", fontSize: 18, textAlign: "center", fontWeight: "bold"}}>{"999999分"}</Text>*/}
                        {/*<Text style={{color: "#333", fontSize: 12, textAlign: "center", paddingTop: 5}}>{"积分"}</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableWithoutFeedback>*/}
                        {/*</View>*/}
                        <View>
                            {this._renderListItem()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        marginBottom: px2dp(46),
        backgroundColor: "#0398ff"
    },
    userHead: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#0398ff"
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    }
})
