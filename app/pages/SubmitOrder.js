/**
 * Created by tww on 2017/5/24.
 */
'use strict';

import React, { Component } from 'react'
import {
    View,
    Text,
    Easing,
    Animated,
    Platform,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { BlurView } from 'react-native-blur'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Global from '../Global'
import LoginPage from "./LoginPage"
let {width, height} = Dimensions.get('window')
import OrderSingle from "./OrderSingle"
export default class ShopBar extends Component{
    constructor(props){
        super(props)
        let allprice = parseInt(this.props.order.maxPrice)+parseInt(this.props.seller.dispatchPrice);
        this.state = {
            seller:this.props.seller,
            goods:this.props.goods,
            order:this.props.order,
            userID:Global.userinfo.userid,
            allprice:allprice,
            address:[{
            }],
        }
// alert(JSON.stringify(this.state.order))
    }
    back(){
        this.props.navigator.pop()
    }
    SubmitOrder(){
        for(let i = 0;i<this.state.goods.length;i++){
            fetch(Global.url+"/goodsSelledUpdate",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:`goodsID=${this.state.goods[i].goodsId}&sale=${this.state.goods[i].length}`
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

        var data={
            id:0,
            userId:Global.userinfo.userid,
            sellerId:this.state.seller.sellerId,
            sellerPhone:this.state.seller.sellerPhone,
            title:this.state.seller.sellerName,
            logo:this.state.seller.brand,
            state:"订单已提交",
            info:JSON.stringify(this.state.goods),
            allcount:this.state.order.length,
            allprice:this.state.allprice,
            dispatchPrice:this.state.seller.dispatchPrice,
            assessed:0,
            address:this.state.address[0].address,
            time:new Date(),
        };
        // alert(JSON.stringify(this.state.address[0].address))
        fetch(Global.url+"/orderAdd",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`data=${[JSON.stringify(data)]}`
        }).then((response)=>{
            this.timer &&clearTimeout(this.timer);
            if(response.ok===true){
                return response.json();
            }else{
                Alert.alert('提示','网络错误',[{text:'确定'}])
            }
        }).then((json) =>{
            if(json !=undefined && json.code ==="1"){
                ToastAndroid.show('订单提交成功',ToastAndroid.SHORT);
            }else{
                alert("失败");
            }
        })
         this.props.navigator.push({
             component: OrderSingle,
             args:{
                 data
             }

         })
    }
    componentDidMount() {
        if(this.state.userID===undefined){
            this.props.navigator.push({
                component: LoginPage,
                args: {
                    pageType: 0,
                }
            })
        }else{
            //setState()方法重新刷新界面改变loading值
            fetch(Global.url+"/addressFindAddress",{
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
                    this.setState({address: json.object});
                }else{
                    alert("失败");
                }
            })
        }
    }
    render(){
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="提交订单"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={{margin:10,padding:15,backgroundColor:'white'}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{alignItems:'center',justifyContent:'center',padding:10,}}>
                            <Icon name="ios-pin" size={22}
                                  color="#333"/>
                        </View>
                        <View>
                            <Text>{this.state.address[0].address}</Text>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text>{this.state.address[0].name}先生</Text>
                                <View style={{width:20}}/>
                                <Text>{this.state.address[0].phone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",backgroundColor:'white',marginTop:20}}>
                        <View style={{alignItems:'center',justifyContent:'center',padding:10,}}>
                            <Icon name="ios-information-circle" size={18}
                                  color="#333"/>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20}}>立即送出</Text>
                            <Text style={{color:"#3D90ED"}}>(大约{this.state.seller.sellerTime}分钟送达)</Text>
                        </View>
                    </View>
                </View>
                <View style={{margin:10,backgroundColor:"white"}}>
                    {/*商品介绍*/}
                    <View style={{flexDirection:"row",justifyContent:"space-between",padding:15}}>
                        <View style={{flexDirection:"row"}}>
                            <Image source={this.state.seller.brand} style={{
                                backgroundColor: "#f9f9f9",
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                                marginRight: 8
                            }}/>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:18}}>{this.state.seller.sellerName}</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Text style={{borderWidth:1}}>商家自配</Text>
                        </View>
                    </View>
                    {this.state.goods.map((good,index) => {
                        return(
                            <View style={{flexDirection:"row",backgroundColor:"#EEE",padding:5}}>
                                <Image source={good.data.image} style={{
                                    backgroundColor: "#f9f9f9",
                                    width: 60,
                                    height: 60,
                                    resizeMode: "contain",
                                    marginRight: 8
                                }}/>
                                <View key={index} style={{flex: 1}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text>{good.data.name}</Text>
                                        <Text>{good.data.price}</Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text>x{good.length}</Text>
                                    </View>
                                </View>
                            </View>
                            )
                        })
                    }
                    <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:'center'}}>
                        <View style={{flexDirection:"row",paddingHorizontal:15,paddingVertical:5}}>
                            <Text style={{marginRight:20,fontSize:15}}>
                                配送费
                            </Text>
                            <Text style={{fontSize:15}}>{this.state.seller.dispatchPrice}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"flex-end",alignItems:'center'}}>
                        <View style={{flexDirection:"row",padding:15}}>
                            <Text style={{marginRight:20,fontSize:20}}>
                                总计
                            </Text>
                            <Text style={{fontSize:20,color:"red"}}>{this.state.allprice}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <View style={{flexDirection:"row",width:width,height:50,backgroundColor:"white",alignItems:'center',justifyContent:'flex-end'}}>
                        <Text style={{fontSize:18}}>待支付 </Text>
                        <Text style={{fontSize:18,color:"red",marginHorizontal:20}}>{this.state.allprice}</Text>
                        <TouchableOpacity
                            onPress={this.SubmitOrder.bind(this)}
                            style={{backgroundColor:"#FED060",padding:10}}>
                            <Text style={{fontSize:18}}>提交订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}