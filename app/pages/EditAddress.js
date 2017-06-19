'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
    ToastAndroid
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import Address from './Address'
import Icon from 'react-native-vector-icons/Ionicons'
import Global from "../Global"
export default class EditAddress extends Component {
  constructor(props){
      super(props)
      this.state = {
          statue:"添加成功",
          // id:this.props.data.id,
          name: this.props.data.name,
          phone: this.props.data.phone,
          gender: this.props.data.tag,
          address: this.props.data.address,
          color: "#81c2ff",
      };

  }
  componentDidMount(){
    if(this.props.pageType == 1){
      // let obj = {};
      // ["name","phone","tag","gender","address","number"].forEach((item) => {
      //     obj[item] = this.props.data[item]
      // })
      // this.setState({obj:obj})
    }
    this.refs.name.focus()
  }
  submit(){
      var datainfo={
          id:this.props.data.id,
          userId:Global.userinfo.userid,
          name:this.state.name,
          phone:this.state.phone,
          tag:this.state.gender,
          color:this.state.color,
          address:this.state.address,
      };
      var fetchOptions={
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body:`data=${[JSON.stringify(datainfo)]}`

      };
      global.url="";
      if(this.props.pageType === 1){
          // 修改
          global.url=Global.url+"/addressUpdateInfo";
          this.state.statue="修改成功";
      }else{
          global.url=Global.url+"/addressAdd";
          this.state.statue="添加成功";
      }
      fetch(global.url, fetchOptions)
          .then((response) => response.text())
          .then((responseText) => {
              this.props.navigator.push({
                  component: Address,
                  args: {
                      pageType: 1,
                      title: "修改地址",
                      data:"",
                  }
              })
              // callback(JSON.parse(responseText));
              ToastAndroid.show( this.state.statue,ToastAndroid.SHORT);
          }).done();
  }
  back(){
    this.props.navigator.pop()
  }
  render(){
      return (
          <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
              <NavBar
                  title={this.props.title}
                  leftIcon="ios-arrow-back"
                  leftPress={this.back.bind(this)}
              />
              <ScrollView>
                  <View style={{marginTop: 10, backgroundColor: "#fff"}}>
                      <View style={{backgroundColor: '#F0F0F0', padding: 10}}>
                          <Text>联系人</Text>
                      </View>
                      <View style={styles.item}>
                          <Text style={styles.label}>{"联系人"}</Text>
                          <View style={{flex: 1}}>
                              <TextInput
                                  underlineColorAndroid="transparent"
                                  autoCapitalize={"none"}
                                  ref={"name"}
                                  style={styles.textInput}
                                  placeholder="请填写收货人的姓名"
                                  placeholderTextColor="#aaa"
                                  onChangeText={(text) => this.setState({name: text})}
                                  value={this.state.name}
                              />
                              <View style={{
                                  paddingTop: 10,
                                  marginTop: 10,
                                  flexDirection: "row",
                                  borderTopWidth: 1,
                                  borderTopColor: "#f8f8f8"
                              }}>
                                  <Button style={{marginLeft: 10}} onPress={() => {
                                      this.setState({gender: "先生", color: "#81c2ff"})
                                  }}>
                                      <Text
                                          style={[styles.radio, this.state.gender === "先生" ? styles.ManActive : null]}>{"先生"}</Text>
                                  </Button>
                                  <Button style={{marginLeft: 10}} onPress={() => {
                                      this.setState({gender: "女士", color: "red"})
                                  }}>
                                      <Text
                                          style={[styles.radio, this.state.gender === "女士" ? styles.WomanActive : null]}>{"女士"}</Text>
                                  </Button>
                              </View>
                          </View>
                      </View>
                      <View style={styles.item}>
                          <Text style={styles.label}>{"手  机"}</Text>
                          <View style={{flex: 1}}>
                              <TextInput
                                  underlineColorAndroid="transparent"
                                  keyboardType={"numeric"}
                                  style={styles.textInput}
                                  placeholder="请填写收货手机号码"
                                  placeholderTextColor="#aaa"
                                  onChangeText={(text) => {
                                      this.setState({phone: text})
                                  }}
                                  value={this.state.phone}
                              />
                          </View>
                      </View>
                      <View style={{backgroundColor: '#F0F0F0', padding: 10}}>
                          <Text>收货地址</Text>
                      </View>
                      <View style={styles.item}>
                          <Text style={styles.label}>{"地  址"}</Text>
                          <View style={{flex: 1}}>
                              <TextInput
                                  underlineColorAndroid="transparent"
                                  style={styles.textInput}
                                  placeholder="小区/写字楼/学校"
                                  placeholderTextColor="#aaa"
                                  onChangeText={(text) => {
                                      this.setState({address: text})
                                  }}
                                  value={this.state.address}
                              />
                              {/*<View style={{paddingTop: 10,marginTop: 10, flexDirection:"row", borderTopWidth: 1, borderTopColor: "#f8f8f8"}}>*/}
                              {/*<TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="详细地址" placeholderTextColor="#aaa"/>*/}
                              {/*</View>*/}
                          </View>
                      </View>

                      {/*<View style={styles.item}>*/}
                      {/*<Text style={styles.label}>{"楼号-门牌号"}</Text>*/}
                      {/*<View style={{flex: 1}}>*/}
                      {/*<TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="例：16号楼110" placeholderTextColor="#aaa"/>*/}
                      {/*</View>*/}
                      {/*</View>*/}
                      {/*<View style={[styles.item, {alignItems: "center"}]}>*/}
                      {/*<Text style={{fontSize: px2dp(13), color:"#222", minWidth: 45}}>{"标签"}</Text>*/}
                      {/*<View style={{flexDirection:"row", flex: 1}}>*/}
                      {/*<Button style={{marginLeft: 10}} onPress={()=>{this.setState({tag:0})}}>*/}
                      {/*<Text style={[styles.radio, this.state.tag===0?styles.active:null]}>{"家"}</Text>*/}
                      {/*</Button>*/}
                      {/*<Button style={{marginLeft: 10}} onPress={()=>{this.setState({tag:1})}}>*/}
                      {/*<Text style={[styles.radio, this.state.tag===1?styles.active:null]}>{"公司"}</Text>*/}
                      {/*</Button>*/}
                      {/*<Button style={{marginLeft: 10}} onPress={()=>{this.setState({tag:2})}}>*/}
                      {/*<Text style={[styles.radio, this.state.tag===2?styles.active:null]}>{"学校"}</Text>*/}
                      {/*</Button>*/}
                      {/*</View>*/}
                      {/*</View>*/}
                  </View>
                  <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden"}}
                          onPress={this.submit.bind(this)}>
                      <View style={{
                          flex: 1,
                          height: 40,
                          backgroundColor: "#56d176",
                          alignItems: "center",
                          justifyContent: "center"
                      }}>
                          <Text style={{color: "#fff"}}>{"确定"}</Text>
                      </View>
                  </Button>
              </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#f8f8f8",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10
    },
    ManActive: {
        borderColor: "#81c2ff",
        backgroundColor: "#81c2ff",
        color: "white",
    },
    WomanActive: {
        borderColor: "red",
        backgroundColor: "red",
        color: "white",
    },
    label: {
        minWidth: 45,
        fontSize: px2dp(13),
        color: "#222",
        paddingTop: 8
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
        height: 30,
        fontSize: 13,
        paddingHorizontal: 10
    },
    radio: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: "#666",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        fontSize: px2dp(13),
        backgroundColor: "#fff"
    }
});
