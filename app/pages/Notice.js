'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native'
import NavBar from '../component/NavBar'
import Global from '../Global'
import Item from '../component/Item'
import LoginPage from './LoginPage'
//FontAwesome
export default class Notice extends Component {
  constructor(props){
      super(props)
      this.state={
          isShow:false,
          loading: true,
          isLogin:Global.userinfo.userid,
          Object:[],
      }
  }
  back(){
    this.props.navigator.pop()
  }
    componentDidMount() {
        if(this.state.isLogin===undefined){
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
                fetch(Global.url+"/noticeFindNotice",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    // body:`userID=${this.state.userID}`
                    body:`userID=1`
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
                        this.setState({Object:json.object});
                    }else{
                        alert("失败");
                    }
                })
            }, 1000);
        }
    }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="消息通知"
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
              {this.state.isLogin===null?
                  (<View style={{height:300,justifyContent:'center',alignItems:'center'}}>
                      <Text>您当前没有消息</Text>
                  </View>)
                  :
                  (
                  this.state.Object.map((item, i) => {
                      return (
                          <View style={{padding:10,backgroundColor:"#EEE",marginTop:5}}>
                              <Text style={{color:"#E23423",fontSize:20}}>{item.title}</Text>
                              <Text style={{}}>{item.info}</Text>
                          </View>
                      )
                  })
                  )}
      </View>
    )
  }
}
