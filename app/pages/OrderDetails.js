'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { NaviGoBack } from './CommonUtils';
var {height, width} = Dimensions.get('window');

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        orderinfo:this.props.dataInfo,
    }
    // alert(JSON.stringify(this.state.orderinfo))
  } 
  componentDidMount() {

  }
  
  render() {
    const {navigator,route} = this.props;
    return (
       <View style={{backgroundColor:'#f5f5f5',flex:1}}>
           <View style={{flex:1}}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                     <View style={{height:35,justifyContent:'center'}}>
                           <Text style={{color:'#777',marginLeft:8}}>订单详情</Text>
                     </View>
                     <View style={{flexDirection:'row',height:70,backgroundColor:'white',alignItems:'center'}}>
                           <Image source={JSON.parse(this.state.orderinfo.logo)} style={{width:40,height:40,marginLeft:10}}/>
                           <Text style={{fontSize:15,marginLeft:10,color:'black'}}>{this.state.orderinfo.title}</Text>
                           <View style={{alignItems:'flex-end',flex:1,marginRight:8}}>
                                {/*<Image source={require('../imgs/order/ic_order_arrow_right.png')} style={styles.item_view_icon}/>*/}
                           </View>
                     </View>
                    {
                        JSON.parse(this.state.orderinfo.info).map((goods,index)=>{
                            return(
                                <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                                    <Text style={{marginLeft:10,flex:5}}>{goods.data.name}</Text>
                                    <Text style={{color:'gray',fontSize:14,flex:1}}>x{goods.length}</Text>
                                    <View style={{flex:2,alignItems:'flex-end',marginRight:10}}>
                                        <Text style={{color:'#000',fontSize:14}}>￥{goods.data.price}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                     <View style={{backgroundColor:'white',height:45,alignItems:'flex-end'}}>
                           <Text style={{marginLeft:10,marginRight:10}}>配送费{this.state.orderinfo.dispatchPrice}</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'red'}}>总计{this.state.orderinfo.allprice}</Text>
                           </View>
                     </View>
                     <View style={{height:35,justifyContent:'center'}}>
                           <Text style={{color:'#777',marginLeft:8}}>配送信息</Text>
                     </View>
                     {/*<View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>*/}
                           {/*<Text style={{marginLeft:10}}>期望时间</Text>*/}
                           {/*<View style={{flex:1,alignItems:'flex-end',marginRight:10}}>*/}
                                {/*<Text style={{fontSize:14,color:'#000'}}>立即配送</Text>*/}
                           {/*</View>*/}
                     {/*</View>*/}
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>配送地址</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'#000'}}>{this.state.orderinfo.address}</Text>
                           </View>
                     </View>
                     {/*<View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>*/}
                           {/*<Text style={{marginLeft:10}}>配送服务</Text>*/}
                           {/*<View style={{flex:1,alignItems:'flex-end',marginRight:10}}>*/}
                                {/*<Text style={{fontSize:14,color:'#000'}}>由商家配送</Text>*/}
                           {/*</View>*/}
                     {/*</View>*/}
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>订单编号</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'#000'}}>{this.state.orderinfo.id}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>订单时间</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'#000'}}>{(this.state.orderinfo.time).toString()}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>支付方式</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14,color:'#000'}}>线下支付</Text>
                           </View>
                     </View>
                </ScrollView>
           </View>
           {/*<View style={{justifyContent:'flex-end'}}>*/}
                {/*<TouchableOpacity style={styles.item_layout}>*/}
                       {/*<Text style={{color:'#444',fontSize:14}}>再来一单</Text>*/}
                {/*</TouchableOpacity>*/}
           {/*</View>*/}
      </View>
    );
  }
}
let styles = StyleSheet.create({
   item_layout:{
        backgroundColor:'#00A2FF',
        height:45,
        alignItems:'center',
        justifyContent:'center'
    },
    item_view_icon:{
        width:10,
        height:15,
    },
});
export default OrderDetails