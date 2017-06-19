'use strict';

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
export default class Address extends Component {
  constructor(props){
      super(props);
      this.state = {
          addressid:"",
          isShow:false,
          loading: true,
          userID:Global.userinfo.userid,
          address:false,
          delete:false,
      }
  }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
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
          this.timer = setTimeout(() => {
                  this.setState({loading: false})
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
                          this.setState({isShow:true});
                          this.setState({address: json.object});
                      }else{
                          alert("失败");
                      }
                  })
              }, 1000);
      }
    }
  add(data){
    this.props.navigator.push({
        component: EditAddress,
        args: {
          pageType: 0,
          title: "新增地址",
            data
        }
    })
  }
  delete(item){
      this.timer = setTimeout(() => {
          this.setState({loading: false});
          fetch(Global.url+"/addressDelete",{
              method:"POST",
              headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body:`id=${item.id}`
          }).then((response)=>{
              this.timer &&clearTimeout(this.timer);
              if(response.ok===true){
                  return response.json();
              }else{
                  Alert.alert('提示','网络错误',[{text:'确定'}])
              }
          }).then((json) =>{
              if(json !=undefined && json.code ==="1"){
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
                              this.setState({isShow:true});
                              this.setState({address: json.object});
                          }else{
                              alert("失败");
                          }
                      })
                  ToastAndroid.show( "删除成功",ToastAndroid.SHORT);
              }else{
                  alert("失败");
              }
          })
      }, 100);
  }
  edit(data){
    this.props.navigator.push({
        component: EditAddress,
        args: {
          pageType: 1,
          title: "修改地址",
            data
        }
    })
  }
  back(){
    this.props.navigator.pop()
  }
  render(){
      return (
          <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
              <NavBar
                  title="收货地址"
                  leftIcon="ios-arrow-back"
                  leftPress={this.back.bind(this)}
              />
              {
                  this.state.isShow?null: (<ActivityIndicator
                  size='large'
                  color='gray'
                  animating={this.state.loading}
                  />)
              }
              {!this.state.address?null:
                  (
                      <ScrollView>
                          {this.state.address.map((item, i) => {
                              return (
                                  <Button key={i}>
                                      <View style={styles.address}>
                                          <View>
                                              <Text style={{
                                                  color: "#333",
                                                  fontSize: px2dp(14)
                                              }}>{item.name + " " + item.phone}</Text>
                                              <View style={styles.ads1List}>
                                                  <Text
                                                      style={[styles.tag, {backgroundColor: item.color || "#0096ff",}]}>{item.tag}</Text>
                                                      {/*style={[styles.tag, {backgroundColor: item.color || "#0096ff",}]}>{item.tag}</Text>*/}
                                                  <Text style={{color: "#bbb", fontSize: px2dp(13)}}>{item.address}</Text>
                                              </View>
                                          </View>
                                          <View style={{flexDirection: 'row'}}>
                                              <Icon onPress={this.edit.bind(this, item)} name="ios-create-outline" size={22}
                                                    color="#ccc"/>
                                              <View style={{width: 30}}/>
                                              <Icon onPress={this.delete.bind(this, item)} name="ios-trash-outline" size={22}
                                                    color="#ccc"/>
                                          </View>
                                      </View>
                                  </Button>
                              )
                          })}
                      </ScrollView>
                  )

              }
              <Button style={{position: "absolute", bottom: 0, left: 0, right: 0, flex: 1}}
                      onPress={this.add.bind(this)}>
                  <View style={{
                      height: px2dp(45),
                      flexDirection: "row",
                      backgroundColor: "#fff",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                  }}>
                      <Icon name="ios-add-circle-outline" size={18} color="#0096ff"/>
                      <Text style={{color: "#0096ff", fontSize: px2dp(14), marginLeft: 8}}>{"新增地址"}</Text>
                  </View>
              </Button>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  address: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#fbfbfb",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 8
  },
  tag: {
    color: "#fff",
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5
  },
  ads1List: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5
  }
})
