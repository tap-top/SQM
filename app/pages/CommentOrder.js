/**
 * Created by tww on 2017/5/23.
 */
'use strict';

import React, {Component, PropTypes} from "react";
import {
    Alert,
    Image,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Dimensions,
    TextInput,
    Button,
    ToastAndroid
} from "react-native";
import NavBar from '../component/NavBar'
import px2dp from "../util";
import OrderSingle from "./OrderSingle";
import Global from "../Global";
import Icon from 'react-native-vector-icons/Ionicons'
import TabView from "../component/TabView"
import LoginPage from "./LoginPage"
var {height,width} = Dimensions.get('window');
export default class CommentOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sellerStar:0,
            goodsStar:0,
            comment:"",
            data:{logo:0,info:[]},
            goodslist:[],
            isRefreshing: false,
            userID:Global.userinfo.userid,
            orderId:this.props.orderId,
            zanOrCai:[],
        }
    }
    back(){
        this.props.navigator.pop()
    }

    setZan(goodsId,zan){
        let flag = 0;
        for(let i = 0 ; i<this.state.zanOrCai.length;i++){
            if(this.state.zanOrCai[i].goodsId===goodsId){
                this.state.zanOrCai[i].zanOrCai=zan;
                flag = 1;
            }
        }
        if(flag === 0){
            this.state.zanOrCai.push({goodsId:goodsId,zan:zan})
        }
        // alert(JSON.stringify(this.state.zanOrCai))
    }

    sellerStarTouch(data){
        this.setState({sellerStar:data});
    }
    goodsStarTouch(data){
        this.setState({goodsStar:data});
    }
    commentOrder(){
        if(this.state.sellerStar===0||this.state.goodsStar===0){
            alert("请先评价！")
        }else{
            let commentInfo={
                id:0,
                userId:this.state.userID,
                sellerId:this.state.data.sellerId,
                sellerStar:this.state.sellerStar,
                goodsStar:this.state.goodsStar,
                comment:this.state.comment,
                time:new Date(),
            }
            // alert(JSON.stringify(this.state.data.sellerId))
            fetch(Global.url+"/commentAdd",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:`data=${JSON.stringify(commentInfo)}`
            }).then((response)=>{
                this.timer &&clearTimeout(this.timer);
                if(response.ok===true){
                    return response.json();
                }else{
                    Alert.alert('提示','网络错误',[{text:'确定'}])
                }
            }).then((json) =>{
                if(json !=undefined && json.code ==="0"){
                    // ToastAndroid.show('操作成功',ToastAndroid.SHORT);
                    // this.props.navigator.push({
                    //     component: TabView,
                    //     args: {
                    //         now:"Order",
                    //     }
                    // })
                }else{
                    alert("失败");
                }
            })
            for(let i = 0 ; i<this.state.zanOrCai.length;i++){
                fetch(Global.url+"/goodsZanUpdate",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:`goodsID=${this.state.zanOrCai[i].goodsId}&zan=${this.state.zanOrCai[i].zan}`
                }).then((response)=>{
                    this.timer &&clearTimeout(this.timer);
                    if(response.ok===true){
                        return response.json();
                    }else{
                        Alert.alert('提示','网络错误',[{text:'确定'}])
                    }
                }).then((json) =>{
                    if(json !=undefined && json.code ==="0"){

                    }else{
                        alert("失败");
                    }
                })
            }

            // alert(JSON.stringify(this.state))
            fetch(Global.url+"/orderUpdate",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:`id=${this.state.orderId}&state=订单已完成&comment=1`
            }).then((response)=>{
                this.timer &&clearTimeout(this.timer);
                if(response.ok===true){
                    return response.json();
                }else{
                    Alert.alert('提示','网络错误',[{text:'确定'}])
                }
            }).then((json) =>{
                if(json !=undefined && json.code ==="0"){
                    ToastAndroid.show('您的评价已提交,感谢您的参与',ToastAndroid.SHORT);
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
        }
    }
    componentDidMount() {
        fetch(Global.url+"/orderFindOrderByID",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`OrderID=${this.state.orderId}`
        }).then((response)=>{
            this.timer &&clearTimeout(this.timer);
            if(response.ok===true){
                return response.json();
            }else{
                Alert.alert('提示','网络错误',[{text:'确定'}])
            }
        }).then((json) =>{
            if(json !=undefined && json.code ==="1"){
                this.setState({data: json.object});
                this.setState({goodslist:JSON.parse(json.object.info)})

                // alert(JSON.stringify(json.object))
            }else{
                alert("失败");
            }
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="评价"
                    leftIcon="ios-close"
                    leftPress={this.back.bind(this)}
                />
                <ScrollView>
                    <View style={{margin:10,padding:20,backgroundColor:"white"}}>
                        <View style={{flexDirection:"row"}}>
                            <Image source={3}
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginRight: 8,
                                    resizeMode: "cover",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#f5f5f5"
                                }}
                            />
                            <View><Text style={{fontSize:18}}>商家配送</Text>
                                <Text>5月7日 12:24 左右送达</Text></View>
                        </View>
                        <View style={{marginTop:20,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.sellerStar>0 ? "#FFE956":"#ccc"} onPress={this.sellerStarTouch.bind(this,1)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.sellerStar>1 ? "#FFE956":"#ccc"} onPress={this.sellerStarTouch.bind(this,2)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.sellerStar>2 ? "#FFE956":"#ccc"} onPress={this.sellerStarTouch.bind(this,3)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.sellerStar>3 ? "#FFE956":"#ccc"} onPress={this.sellerStarTouch.bind(this,4)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.sellerStar>4 ? "#FFE956":"#ccc"} onPress={this.sellerStarTouch.bind(this,5)}/>
                        </View>
                    </View>
                    <View style={{margin:10,padding:20,backgroundColor:"white"}}>
                        <View style={{flexDirection:"row"}}>
                            <Image source={JSON.parse(this.state.data.logo)||1}
                                   style={{
                                       width: 50,
                                       height: 50,
                                       marginRight: 8,
                                       resizeMode: "cover",
                                       justifyContent: "space-between",
                                       alignItems: "center",
                                       borderWidth: 1,
                                       borderColor: "#f5f5f5"
                                   }}
                            />
                            <View style={{justifyContent:"center"}}>
                                <Text style={{fontSize:18}}>{this.state.data.title}</Text>
                            </View>
                        </View>
                        <View style={{marginTop:20,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.goodsStar>0 ? "#FFE956":"#ccc"} onPress={this.goodsStarTouch.bind(this,1)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.goodsStar>1 ? "#FFE956":"#ccc"} onPress={this.goodsStarTouch.bind(this,2)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.goodsStar>2 ? "#FFE956":"#ccc"} onPress={this.goodsStarTouch.bind(this,3)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.goodsStar>3 ? "#FFE956":"#ccc"} onPress={this.goodsStarTouch.bind(this,4)}/>
                            <Icon  name="ios-star" size={30} style={{padding:3}}
                                   color={this.state.goodsStar>4 ? "#FFE956":"#ccc"} onPress={this.goodsStarTouch.bind(this,5)}/>
                        </View>
                        <TextInput
                            style={{borderWidth:StyleSheet.hairlineWidth,borderColor:"gray",backgroundColor:'#EEE'}}
                            value={this.state.comment}
                            onChangeText={(text)=>this.setState({comment:text})}
                            placeholder="亲，菜品口味如何，对保证是否满意？"
                            underlineColorAndroid="transparent"
                        />
                        {/*{alert(JSON.parse(this.state.data.info))}*/}
                        {
                            this.state.goodslist.map((goods,i)=>{
                                // alert(JSON.stringify(goods))
                                return <Item key={i} setZan={this.setZan.bind(this)} {...goods} {...this.props}/>
                            })
                        }
                    </View>
                </ScrollView>
                <TouchableHighlight style={{position: "absolute", bottom: 0, left: 0, right: 0, flex: 1}}
                     onPress={this.commentOrder.bind(this)}
                >
                    <View style={{
                        height: px2dp(45),
                        flexDirection: "row",
                        backgroundColor: "#0096ff",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{color: "#555", fontSize: px2dp(18), marginLeft: 8}}>提交</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zan:0,
            stateinfo:this.props.state,
            userid:Global.userinfo.userid,
            data:[],
        }
        // alert(JSON.stringify(this.state.goodsId))
    }

    changeZan(flag,goodsId){
        if(flag===this.state.zan){
            // alert("不能重复赞")
        }else{
            this.setState({zan:flag});
            this.props.setZan(goodsId,flag)
        }
    }
    render() {
        const {data} = this.props
        return (
            <View
                style={{
                    flexDirection:"row",
                    marginTop:10,paddingVertical:10,
                    borderTopWidth:StyleSheet.hairlineWidth,
                    justifyContent:"space-between",
                    alignItems:'center'
                }}>
                <Text>{data.name}</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableHighlight
                        onPress={this.changeZan.bind(this,1,this.props.goodsId)}
                        style={[this.state.zan===1?
                            {borderWidth:StyleSheet.hairlineWidth,padding:3,borderRadius:10,backgroundColor:"#FFE956"}:
                            {borderWidth:StyleSheet.hairlineWidth,padding:3,borderRadius:10}
                        ]}>
                        <Text>赞</Text>
                    </TouchableHighlight>
                    <View style={{width:20}}/>
                    <TouchableHighlight
                        onPress={this.changeZan.bind(this,-1,this.props.goodsId)}
                        style={[this.state.zan===-1?
                            {borderWidth:StyleSheet.hairlineWidth,padding:3,borderRadius:10,backgroundColor:"#FFE956"}:
                            {borderWidth:StyleSheet.hairlineWidth,padding:3,borderRadius:10}
                        ]}>
                        <Text>踩</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}