'use strict';

import React, { Component, } from 'react'
import {
  Text,
  View,
    Dimensions

} from 'react-native'
import NavBar from '../component/NavBar'
import TakeOut from './TakeOut'
import ReadyAppraise from './ReadyAppraise'
import TabViewBar from '../component/TabViewBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
var {height,width} = Dimensions.get('window');
export default class Order extends Component {
  constructor(props){
      super(props)
      this.state = {
          number:5,
          hideDelete:true,
          delete:true,
      }
  }
    rightPress(){
        this.setState({delete:true})
    }
    rightSubmit(){
        this.setState({delete:false})
    }
    HideDelete(){
        this.setState({hideDelete:!this.state.hideDelete})
    }
  render(){
      return (
          <View style={{height: height - 75, backgroundColor: "#f3f3f3"}}>
              <NavBar title="订单"
              />
              {/*{*/}
                  {/*(!this.state.delete) ? (*/}
                      {/*<NavBar title="订单"*/}
                              {/*rightIcon="ios-trash-outline"*/}
                              {/*rightPress={this.rightPress.bind(this)}*/}
                      {/*/>*/}
                  {/*) : (*/}
                      {/*<NavBar title="订单"*/}
                              {/*rightIcon="ios-checkbox-outline"*/}
                              {/*rightPress={this.rightSubmit.bind(this)}*/}
                      {/*/>*/}
                  {/*)*/}
              {/*}*/}
              {/*添加点击待评价隐藏删除的按钮*/}
              <ScrollableTabView locked="true" renderTabBar={() => <TabViewBar/>}>
                  <TakeOut tabLabel="全部订单" {...this.props}/>
                  <ReadyAppraise tabLabel="待评价" {...this.props}/>
              </ScrollableTabView>
          </View>
      );
  }
}
