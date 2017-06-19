'use strict';

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  AlertIOS,
  RefreshControl,
    ToastAndroid,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'

import LocalImg from '../images'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import CommentOrder from "./CommentOrder"
import Global from "../Global";
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateinfo:this.props.state,
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        logo: PropTypes.number,
        state: PropTypes.string,
        time: PropTypes.string,
        info: PropTypes.string,
        price: PropTypes.string
    }

    commentOrder(data,id){
        if(data!="订单已完成"){
            fetch(Global.url+"/orderUpdate",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:`id=${id}&state=订单已完成&comment=0`
            }).then((response)=>{
                this.timer &&clearTimeout(this.timer);
                if(response.ok===true){
                    return response.json();
                }else{
                    Alert.alert('提示','网络错误',[{text:'确定'}])
                }
            }).then((json) =>{
                if(json !=undefined && json.code ==="0"){
                    ToastAndroid.show('您的订单已确认,期待您的评价',ToastAndroid.SHORT);
                    this.props.navigator.push({
                        component:TabView,
                        args: {
                            now:"Order",
                        }
                    })
                }else{
                    alert("失败");
                }
            })
        }else{
            this.props.navigator.push({
                component: CommentOrder,
                args: {
                    orderId:id,
                }
            })
        }
    }
    againBuy(){
        alert("再来一单还未实现");
    }
    render() {
        const {id,title, logo, state, info,assessed,allcount,allprice} = this.props
        let infolist = JSON.parse(info);
        let render = (
            <View style={styles.item}>
                {/*<View><Text>{id}</Text></View>*/}
                <Image source={logo} style={styles.logo}/>
                <View style={styles.info}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: px2dp(14), color: "#333"}}>{title}</Text>
                        <Text style={{fontSize: px2dp(13), color: "#333"}}>{state}</Text>
                    </View>
                    {/*<View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#f9f9f9"}}>*/}
                    {/*<Text style={{fontSize: px2dp(12), color:"#bbb",marginTop: 5}}>{time}</Text>*/}
                    {/*</View>*/}
                    <View style={{paddingVertical: 16}}>
                        {
                            infolist.map((goods,index)=>{
                                return(
                                    <View key={index} style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={{fontSize: px2dp(13), color: "#aaa"}}>{goods.data.name}</Text>
                                        <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
                                            <Icon name="ios-close" size={px2dp(26)} color="gray" />
                                            <Text style={{fontSize: px2dp(20), color: "#000"}}> {goods.length}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                            <Text>共{allcount}件商品，实付{allprice}</Text>
                        </View>

                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderColor: 'gray',
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingVertical: 16
                    }}>
                        {/*<TouchableHighlight onPress={this.againBuy.bind(this)}*/}
                                            {/*style={{borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5}}><Text>再来一单</Text>*/}
                        {/*</TouchableHighlight>*/}
                        { assessed==="0" &&
                        <TouchableHighlight
                            onPress={this.commentOrder.bind(this,state,id)}
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                backgroundColor: "#FFD161",
                                borderRadius: 5,
                                padding: 5,
                                marginLeft: 10
                            }}
                        ><Text style={{color:"white",fontWeight:'800'}}>{state !="订单已完成"?"确认收货":"去评价"}</Text>
                        </TouchableHighlight> }
                    </View>
                </View>
            </View>
        )
        return (
            Platform.OS === 'ios' ? (
                <TouchableHighlight style={{marginTop: 10}} onPress={() => {
                }}>{render}</TouchableHighlight>
            ) : (
                <View style={{marginTop: 10}}><TouchableNativeFeedback
                    onPress={this.props.onPress} {...this.props}>{render}</TouchableNativeFeedback></View>
                // <View style={{marginTop: 10}}><TouchableNativeFeedback onPress={() => {}}>{render}</TouchableNativeFeedback></View>
            )
        )
    }
}
export default class ReadyAppraise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isRefreshing: false,
            userID:Global.userinfo.userid,
        }
    }


    // _onRefresh(){
    //     this.setState({isRefreshing: true});
    //     setTimeout(() => {
    //         this.setState({
    //             data: data.breakFastData,
    //             isRefreshing: false
    //         })
    //     }, 1500)
    // }
    componentDidMount() {
        this._onRefresh();
    }
    _onRefresh() {
        this.setState({isRefreshing: true})
        this.timer = setTimeout(() => {
            fetch(Global.url+"/orderFindOrderByIsAssessed",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:`userID=${this.state.userID}`
            }).then((response)=>{
                this.timer &&clearTimeout(this.timer);
                if(response.ok===true){
                    return response.json();
                }else{
                    Alert.alert('提示','网络错误',[{text:'确定'}])
                }
            }).then((json) =>{
                if(json !=undefined && json.code ==="1"){
                    this.setState({isRefreshing: false})
                    this.setState({data: json.object});
                    // alert(JSON.stringify(json.object))
                }else{
                    alert("失败");
                }
            })
        }, 100);

        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({
                // data: data.orderData,
                isRefreshing: false,
            })
        }, 1500)
    }


    _noData() {
        return (
            <View style={{alignItems: "center", paddingTop: 50}}>
                {/*<TouchableHighlight onPress={this.goProfile.bind(this)}><Text>1231231</Text></TouchableHighlight>*/}
                <Image source={LocalImg.noData} style={styles.noData}/>
                <Text style={{color: "#aaa"}}>{"无记录"}</Text>
            </View>
        )
    }
    render() {
        return (
            <ScrollView
                style={{backgroundColor: "#f3f3f3"}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#bbb"
                        colors={['#ddd', '#0398ff']}
                        progressBackgroundColor="#ffffff"
                    />
                }
            >
                {
                    (() => {
                        return this.state.data.length ?
                            [<Text key={"title"} style={{
                                textAlign: "center",
                                color: "#999",
                                fontSize: px2dp(12),
                                paddingTop: 20
                            }}>{"待评价订单"}</Text>]
                                .concat(this.state.data.map((item, i) => {
                                    return <Item key={i} {...item} {...this.props}/>
                                })) : this._noData()
                    })()
                }
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 16
  },
  noData: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    marginBottom: 16
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 8,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5f5f5"
  },
  info: {
    paddingRight: 16,
    flex: 1
  }
})
