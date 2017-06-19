'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
} from 'react-native';
import CommentOrder from "./CommentOrder"

var {height, width} = Dimensions.get('window');

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.onPressItem=this.onPressItem.bind(this);
    // this.renderItem = this.renderItem.bind(this);
    this.state={
         dataSource:this.props.dataInfo,
        orderId:this.props.dataInfo.id,
      }
      // alert(JSON.stringify(this.state.orderId))
  } 
  //点击列表每一项响应按钮
  onPressItem(data){
      
  }
    commentOrder(assessed){
      if(assessed==="1"){
          alert("再来一单还未实现");
      }else{
          this.props.navigator.push({
              component: CommentOrder,
              args: {
                  orderId:this.state.orderId,
              }
          })
      }
    }
  renderHeaderItem(){
    return (
      <View style={{height:75,padding:10}}>
          <View style={{flexDirection:'row',justifyContent:"space-between"}}>
              <Text style={{fontSize:18,color:"#000"}}>订单已提交</Text>
              {/*<Text style={{fontSize:16}}>5月7日 10:24</Text>*/}
          </View>
          <View><Text>请耐心等待商家确认</Text></View>
          <View style={{marginTop:15,borderBottomWidth:StyleSheet.hairlineWidth}}/>
      </View>
    );
  }
  renderCenterItem(){
    return (
        <View style={{height:75,padding:10}}>
            <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                <Text style={{fontSize:18,color:"#000"}}>商家已接单</Text>
                {/*<Text style={{fontSize:16}}>5月7日 11:00</Text>*/}
            </View>
            <View style={{marginTop:15,borderBottomWidth:StyleSheet.hairlineWidth}}/>
        </View>
    );
  }
  renderFooterItem(){
    return (
        <View style={{height:75,padding:10}}>
            <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                <Text style={{fontSize:18,color:"#000"}}>订单已完成</Text>
                {/*<Text style={{fontSize:16}}>5月7日 12:24</Text>*/}
            </View>
            <View style={{marginTop:15,borderBottomWidth:StyleSheet.hairlineWidth}}/>
        </View>
    );
  }
  renderCenterContent(){
    return (
        <View style={{height:75,padding:10}}>
            <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                <Text style={{fontSize:18,color:"#000"}}>商家配送中</Text>
                {/*<Text style={{fontSize:16}}>5月7日 12:24</Text>*/}
            </View>
            <View><Text>商品正在火速送到您的手上</Text></View>
            <View style={{marginTop:15,borderBottomWidth:StyleSheet.hairlineWidth}}/>
        </View>
    );
  }
  // renderCenterContent(data){
  //   return (
  //      <View style={{marginLeft:15,marginTop:10}}>
  //             <View style={{flexDirection:'row'}}>
  //                     <Text style={{color:'black',fontSize:14,backgroundColor:'#00000000'}}>{data.status}</Text>
  //                     <View style={{flex:1,alignItems:'flex-end',marginRight:10}}><Text style={{color:'#777',fontSize:12,backgroundColor:'#00000000'}}>{data.time}</Text></View>
  //                     </View>
  //                     <Text style={{color:'#777',fontSize:12,marginTop:10,backgroundColor:'#00000000'}}>{data.remark}</Text>
  //     </View>
  //   );
  // }
  render() {
    const {navigator,route} = this.props;
    const flag=this.state.dataSource.state;
    return (
        <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
              {/*{this.renderContent(this.state.dataSource.cloneWithRows(*/}
                         {/*this.state.dataSource === undefined ? [] : this.state.orderStatuts))}*/}
            {/*{this.renderItem(this.state.dataSource.state)}*/}
            {/*<Text>{this.state.dataSource.state}</Text>*/}
            {(flag==="订单已完成"||flag==="商家配送中"||flag==="商家已接单"||flag==="订单已提交") &&this.renderHeaderItem()}
            {(flag==="订单已完成"||flag==="商家配送中"||flag==="商家已接单") &&this.renderCenterItem()}
            {(flag==="订单已完成"||flag==="商家配送中") &&this.renderCenterContent()}
            {(flag==="订单已完成") &&this.renderFooterItem()}
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity style={{backgroundColor:'#00A2FF',padding:10,justifyContent:'flex-end',alignItems:'center'}}
                                  onPress={this.commentOrder.bind(this,this.state.dataSource.assessed)}
                >
                    <Text style={{fontSize:20,color:'#444'}}>{this.state.dataSource.assessed==="1"?"再来一单":"去评价"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
  }
}
let styles = StyleSheet.create({

});
export default OrderStatus