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
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import EditAddress from './EditAddress'
import Icon from 'react-native-vector-icons/Ionicons'
import Global from "../Global"
import AddGoods from "./AddGoods"
import LoginPage from "./LoginPage"
export default class SellerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerId:Global.sellerinfo.sellerID,
            sellerData:this.props.sellerData,
            goods:[{}],
        }
        // alert(JSON.stringify(this.state.sellerData))
    }


    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }

    componentDidMount() {
        // alert(this.state.sellerId)
        fetch(Global.url+"/goodsFindAll",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`sellerID=${this.state.sellerId}`
        }).then((response)=>{
            if(response.ok===true){
                return response.json();
            }else{
                Alert.alert('提示','网络错误',[{text:'确定'}])
            }
        }).then((json) =>{
            if(json !=undefined && json.code ==="0"){
                this.setState({goods:json.object});
                // alert(JSON.stringify(this.state.goods))
            }else{
                alert("失败");
            }
        });
    }

    addGoods(){
        this.props.navigator.push({
            component: AddGoods,
            args: {
                title: "添加商品",
                pageType:0,
                data:{
                    // id:this.state.sellerData.sellerId
                },
            }
        })
    }
    editGoods(data){
        this.props.navigator.push({
            component: AddGoods,
            args: {
                pageType:1,
                title: "编辑商品",
                data:data,
            }
        })
    }
    deleteGoods(goodsId){
        Alert.alert('温馨提醒','确定删除该订单吗?',[
            {text:'取消',onPress:()=>ToastAndroid.show('已取消',ToastAndroid.SHORT)},
            {text:'确定',onPress:()=>{
                fetch(Global.url+"/goodsDelete",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:`goodsId=${goodsId}&sellerId=${Global.sellerinfo.sellerID}`
                }).then((response)=>{
                    if(response.ok===true){
                        return response.json();
                    }else{
                        Alert.alert('提示','网络错误',[{text:'确定'}])
                    }
                }).then((json) =>{
                    if(json !=undefined && json.code ==="0"){
                        this.setState({goods:json.object});
                    }else{
                        alert("失败");
                    }
                });
                ToastAndroid.show('已删除',ToastAndroid.SHORT)
            }}
        ])

    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <ScrollView>
                    {
                        this.state.goods.map((goodsinfo,index)=>{
                            return(
                                <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:5,backgroundColor:"white",paddingVertical:10}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Image style={{width:50,height:50}} source={goodsinfo.image || 1}/>
                                        <View style={{width:120,overflow:'hidden'}}>
                                            <Text numberOfLines={1} style={{fontSize:16,color:"#000"}}>{goodsinfo.name}</Text>
                                            <Text numberOfLines={1}>{goodsinfo.info}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>价格 ￥{goodsinfo.price}</Text>
                                        <Text style={{marginTop:5}}>赞      {goodsinfo.praise}</Text>

                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:'space-around',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.editGoods.bind(this,goodsinfo)}>
                                            <Text style={{color:"white",borderRadius:5,borderWidth:1,fontSize:15,backgroundColor:"#25CB73",padding:5}}>编辑</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.deleteGoods.bind(this,goodsinfo.id)}>
                                            <Text style={{color:"white",borderRadius:5,marginLeft:5,borderWidth:1,backgroundColor:"#AD4738",fontSize:15,padding:5}}>删除</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity
                    onPress={this.addGoods.bind(this)}
                    style={{backgroundColor:"#25CB73",padding:10,alignItems:"center"}}>
                    <Text style={{fontSize:18,color:"white"}}>添加菜品</Text>
                </TouchableOpacity>
            </View>
        )
    }
}