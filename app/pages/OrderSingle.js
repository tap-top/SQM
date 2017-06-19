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
    Modal,
    TouchableHighlight,
} from 'react-native';

import { NaviGoBack } from './CommonUtils';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view'; 
import OrderDetails from './OrderDetails';
import OrderStauts from './OrderStatus';
import NavBar from '../component/NavBar'
import ModalDemo from './Modal'
import Global from '../Global'
import TabViewBar from '../component/TabViewBar'
import TabView from '../component/TabView'
var {height, width} = Dimensions.get('window');

class OrderSingle extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.state={
        modalVisible: false,
        phoneNum:this.props.data.sellerPhone,
        object:this.props.data,
    }
    // alert(JSON.stringify(this.state.object))
  }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    back(){
        this.props.navigator.push({
            component: TabView,
            args: {
                now:"Order"
            }
        });
    }
    componentDidMountnot() {
        this.timer = setInterval(() => {
            this.setState({loading: false})
            fetch(Global.url+"/orderFindOrderByID",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:`OrderID=${this.state.object.id}`
            }).then((response)=>{
                if(response.ok===true){
                    return response.json();
                }else{
                    Alert.alert('提示','网络错误',[{text:'确定'}])
                }
            }).then((json) =>{
                if(json !=undefined && json.code ==="1"){
                    // this.timer &&clearInterval(this.timer);
                    clearInterval(this.timer);
                    if(json.object.state=="订单已完成"){
                        this.timer &&clearInterval(this.timer);
                    }
                }else{
                    alert("失败");
                }
            })
        }, 1000);
    }
    modalDemo(){
        this.props.navigator.push({
            component: ModalDemo,
            args: {
                pageType: 0,
                title: "新增地址"
            }
        })
    }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  render() {
    const {navigator,route} = this.props;
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
           <NavBar
               title={this.state.object.title}
               leftIcon="ios-arrow-back"
               leftPress={this.back.bind(this)}
               rightIcon="ios-call-outline"
               rightPress={this.setModalVisible.bind(this,true)}
               // rightPress={this.modalDemo.bind(this)}
           />
          <ScrollableTabView
                renderTabBar={() => <TabViewBar/>}
                tabBarUnderlineColor='#f00'
                tabBarBackgroundColor='#fff'
                tabBarActiveTextColor='#000'
                tabBarInactiveTextColor='gray'
                tabBarTextStyle={{fontSize: 15}}>
                <OrderStauts tabLabel='订单状态' {...this.props} dataInfo={this.state.object}/>
                <OrderDetails tabLabel='订单详情' {...this.props} dataInfo={this.state.object}/>
          </ScrollableTabView>
           <Modal
               animationType={"slide"}
               transparent={true}
               visible={this.state.modalVisible}
               onRequestClose={() => {alert("Modal has been closed.")}}
           >
               <View style={{flex: 1, justifyContent: 'flex-end',backgroundColor:'rgba(0,0,0,0.5)'}}>
                   <View style={{alignItems:'center',backgroundColor:'#FFF'}}>
                       <View style={{padding:10}}>
                           <Text>拨打电话</Text>
                       </View>
                       <View style={{}}>
                           <Text style={{fontSize:20}}>商家电话：{this.state.phoneNum}</Text>
                       </View>
                       <View style={{width:width,height:2,backgroundColor:'gray'}}/>
                       <TouchableHighlight
                           style={{width:width,padding:10,alignItems:'center'}}
                           onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                           <Text style={{fontSize:16}}>取消</Text>
                       </TouchableHighlight>

                   </View>
               </View>
           </Modal>
      </View>
    );
  }
}
let styles = StyleSheet.create({

});
export default OrderSingle