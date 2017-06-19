'use strict';

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  AlertIOS,
  RefreshControl,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'
import px2dp from '../util'
import LocalImg from '../images'
import Button from '../component/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import Global from '../Global'

export default class Comments extends Component {
  constructor(props){
      super(props)
      this.state={
          sellerID:this.props.sellerID,
          data:[],
      }
      // alert(this.state.sellerID)
  }

    componentDidMount() {
        this._onRefresh();
    }

    _noData() {
        return (
            <View style={{alignItems: "center", paddingTop: 50}}>
                {/*<TouchableHighlight onPress={this.goProfile.bind(this)}><Text>1231231</Text></TouchableHighlight>*/}
                {/*<Image source={LocalImg.noData} style={styles.noData}/>*/}
                <Text style={{color: "#aaa"}}>"无评价记录"</Text>
            </View>
        )
    }
    _onRefresh() {
        fetch(Global.url+"/commentFindCommentBySellerID",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`sellerID=${this.state.sellerID}`
        }).then((response)=>{
            this.timer &&clearTimeout(this.timer);
            if(response.ok===true){
                return response.json();
            }else{
                Alert.alert('提示','网络错误',[{text:'确定'}])
            }
        }).then((json) =>{
            if(json !=undefined && json.code ==="0"){
                this.setState({data: json.object});
                this.setState({allstar:json.msg})

                // alert(JSON.stringify(json.msg))
            }else{
                alert("失败");
            }
        })

    }
  renderComments(){
    let scale = 1/5*55
      return (
          this.state.data.map((item, i) => {

              // alert(JSON.stringify(item))
              return <Item key={i} {...item} userId={item.userId} {...this.props}/>
          })
      )
  }
  render(){
    let scale1 = this.state.allstar/5*155
    let scale2 = 4.6/5*55
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{ flex: 1}}>
        <View style={{
          paddingBottom: this.props.headHeight + px2dp(46)
        }}>
          <View style={styles.source}>
            <View style={[styles.center,{width:140, borderRightWidth: 1, borderRightColor: "#f1f1f1"}]}>
              <Text style={{fontSize: 18, color: "#ff6000", fontWeight:"bold"}}>{parseFloat(this.state.allstar).toFixed(1)}</Text>
              <Text style={{fontSize: px2dp(13),color: "#333", paddingVertical: 3}}>{"综合评分"}</Text>
              {/*<Text style={{fontSize: px2dp(13),color: "#999", paddingVertical: 3}}>{"高于周边商家99%"}</Text>*/}
            </View>
            <View style={[styles.center,{flex: 1}]}>
              <View style={{flexDirection:"row", justifyContent:"center", alignItems: "center"}}>
                {/*<Text style={{fontSize: px2dp(13),color: "#333", paddingVertical: 3}}>{"服务态度"}</Text>*/}
                <View>
                  <Image source={LocalImg.star2} style={{height: 30, width: 155}}/>
                  <View style={{height: 30, position:"absolute", left:0, top:0, width: scale1, overflow:"hidden",backgroundColor:'white'}}>
                    <Image source={LocalImg.star1} style={{height: 30, width: 155}}/>
                  </View>
                </View>
                {/*<Text style={{fontSize: px2dp(14),color: "#ff6000"}}>{"4.9"}</Text>*/}
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.tags}>
              {/*{this.renderTags()}*/}
            </View>
            {/*<View style={{paddingLeft: 16, paddingVertical: 10, flexDirection: "row", alignItems: "center"}}>*/}
              {/*<Icon name="ios-checkmark-circle" size={px2dp(20)} color="#4cd964" />*/}
              {/*<Text style={{fontSize: px2dp(13),color: "#333", marginLeft: 3}}>{"只看有内容的评论"}</Text>*/}
            {/*</View>*/}
            <View style={{paddingLeft: 16}}>
              {this.renderComments()}
            </View>
          </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:this.props.userId,
            data:{headimg:0},
        }
    }
    componentDidMount() {
        fetch(Global.url+"/userFindByID",{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`userID=${this.state.userId}`
        }).then((response)=>{
            this.timer &&clearTimeout(this.timer);
            if(response.ok===true){
                return response.json();
            }else{
                Alert.alert('提示','网络错误',[{text:'确定'}])
            }
        }).then((json) =>{
            if(json !=undefined && json.code ==="0"){
                this.setState({data: json.object});
                // alert(JSON.stringify(json.object))
            }else{
                alert("失败");
            }
        })
    }
    render() {
        const {goodsStar,comment,time} = this.props
        // alert(JSON.stringify(this.props))
        let scale = goodsStar / 5 * 55
        return (
            <View
                  style={{borderTopWidth: 1, borderTopColor: "#f9f9f9", paddingVertical: 14, paddingRight: 16}}>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.uinfo}>
                        <Image source={JSON.parse(this.state.data.headimg)} style={{width: 40, height: 40, borderRadius: 20}}/>
                        <View style={{marginLeft: 5}}>
                            <Text
                                style={{fontSize: px2dp(13), color: "#333", paddingBottom: 5}}>{this.state.data.username}</Text>
                            <View style={{height: 10}}>
                                <Image source={LocalImg.star2} style={{height: 10, width: 55}}/>
                                <View style={{
                                    height: 10,
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: scale,
                                    overflow: "hidden",
                                    backgroundColor:'white'
                                }}>
                                    <Image source={LocalImg.star1} style={{height: 10, width: 55}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <Text style={{fontSize: px2dp(13), color: "#999"}}>{time}</Text>
                    </View>
                </View>
                <View style={{paddingLeft: 45}}>
                    <Text style={{fontSize: px2dp(13), color: "#333"}}>{comment}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  tags: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 10,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9"
  },
  uinfo: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  tag: {
    backgroundColor:"#ebf5ff",
    paddingHorizontal: 6,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  source: {
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 10
  }
})
