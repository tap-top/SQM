/**
 * Created by tww on 2017/5/26.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import EditAddress from './EditAddress'
import Icon from 'react-native-vector-icons/Ionicons'
import Global from "../Global"
import LoginPage from "./LoginPage"
import TabViewBar from '../component/TabViewBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import GoodsManage from './GoodsManage'
import OrderManage from './OrderManage'
import SellerInfo from './SellerInfo'
export default class SellerHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            sellerData:this.props.sellerData,
            now:this.props.now||0,
        }
        // alert(JSON.stringify(this.state.sellerData))
    }
    back(){
        this.props.navigator.pop()
    }
    render(){
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="欢迎使用食芊觅商家端"
                    // leftIcon="ios-arrow-back"
                    // leftPress={this.back.bind(this)}
                />
                <ScrollableTabView initialPage={this.state.now} locked={true} renderTabBar={() => <TabViewBar/>}>
                    <GoodsManage tabLabel="菜单管理" {...this.props} sellerData={this.state.sellerData}/>
                    <OrderManage tabLabel="订单管理" {...this.props} sellerData={this.state.sellerData}/>
                    <SellerInfo tabLabel="商家信息" {...this.props} sellerData={this.state.sellerData}/>
                </ScrollableTabView>
            </View>
        );
    }
}