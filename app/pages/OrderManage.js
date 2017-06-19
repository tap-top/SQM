/**
 * Created by tww on 2017/5/26.
 */
import React, { Component,PropTypes } from 'react'
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
    ToastAndroid
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import EditAddress from './EditAddress'
import LocalImg from '../images'
import Icon from 'react-native-vector-icons/Ionicons'
import Global from "../Global"
import SellerHome from "./SellerHome"
var {height,width} = Dimensions.get('window');
export default class OrderManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isRefreshing: false,
            sellerID:Global.sellerinfo.sellerID,
        }
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({loading: false})
            this._onRefresh();
        }, 100);

    }

    _noData() {
        return (
            <View style={{alignItems: "center", paddingTop: 50}}>
                {/*<TouchableHighlight onPress={this.goProfile.bind(this)}><Text>1231231</Text></TouchableHighlight>*/}
                <Image source={LocalImg.noData} style={styles.noData}/>
                <Text style={{color: "#aaa"}}>{"无订单记录"}</Text>
            </View>
        )
    }
    _onRefresh() {
        fetch(Global.url+"/orderFindOrderBySellerID",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // body:`sellerID=${this.state.sellerID}`
            body:`sellerID=${Global.sellerinfo.sellerID}`
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
                // alert(JSON.stringify(json.object))
            }else{
                alert("失败");
            }
        })
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({
                // data: data.orderData,
                isRefreshing: false,
            })
        }, 1500)
    }

    render(){
        return (
            <ScrollView
                style={{backgroundColor: "#f3f3f3",height:height-20}}
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
                {/*{ alert(JSON.stringify(this.state.data)) }*/}
                {/*<Text style={{textAlign: "center", color: "#999", fontSize: px2dp(12), paddingTop: 20}}>{"近期订单"}</Text>*/}
                {

                    this.state.data.length ?
                        this.state.data.map((item, i) => {
                            return <Item key={i} {...item} {...this.props} refresh={this._onRefresh} />
                        }) : this._noData()

                }
            </ScrollView>
        )
    }
}
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            stateinfo:this.props.state,
            userid:Global.userinfo.userid,
        }
    }
    addOrder(data,id){
        if(data==="订单已提交"){
            data="商家已接单";
        }else if(data==="商家已接单"){
            data="商品配送中";
        }else{
            data="订单已完成"
        }
        fetch(Global.url+"/orderUpdate",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`id=${id}&state=${data}&comment=0`
        }).then((response)=>{
            this.timer &&clearTimeout(this.timer);
            if(response.ok===true){
                return response.json();
            }else{
                Alert.alert('提示','网络错误',[{text:'确定'}])
            }
        }).then((json) =>{
            if(json !=undefined && json.code ==="0"){
                ToastAndroid.show('操作成功',ToastAndroid.SHORT);
                this.props.navigator.push({
                    component: SellerHome,
                    args: {
                        now:1,
                    }
                })
                // this.props.refresh();
            }else{
                alert("失败");
            }
        })
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        logo: PropTypes.number,
        state: PropTypes.string,
        time: PropTypes.string,
        info: PropTypes.string,
        price: PropTypes.string
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
                        justifyContent: "space-between",
                        paddingVertical: 16
                    }}>
                        { assessed==="1" ?
                            <TouchableHighlight
                                onPress={this.deleteOrder.bind(this,id)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    backgroundColor: "red",
                                    borderRadius: 5,
                                    padding: 5,
                                    marginLeft: 10
                                }}
                            ><Text style={{color:"white",fontWeight:'800'}}>删除</Text>
                            </TouchableHighlight>
                            :<View/>
                        }
                        <View style={{flexDirection:"row"}}>
                            {/*<TouchableHighlight onPress={this.againBuy.bind(this)}*/}
                            {/*style={{borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5}}><Text>再来一单</Text>*/}
                            {/*</TouchableHighlight>*/}
                            { state!="订单已完成" &&
                            <TouchableHighlight
                                onPress={this.addOrder.bind(this,state,id)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    backgroundColor: "#FFD161",
                                    borderRadius: 5,
                                    padding: 5,
                                    marginLeft: 10
                                }}
                            ><Text style={{color:"white",fontWeight:'800'}}>{state ==="订单已提交"?"接单":state==="商品配送中"?"确认收货":"配送"}</Text>
                            </TouchableHighlight> }
                        </View>
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
const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 16
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