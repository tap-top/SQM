'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Animated,
  AlertIOS,
  Platform,
  findNodeHandle,
  Image,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Parabolic from 'react-native-parabolic'
import px2dp from '../util'
import LocalImg from '../images'
import data from '../data'
import NavBar from '../component/NavBar'
import TabViewBar from '../component/TabViewBar'
import GoodsList from '../pages/GoodsList'
import Comments from '../pages/Comments'
import ShopBar from '../component/ShopBar'
import Global from '../Global'
import { BlurView } from 'react-native-blur'
let {width, height} = Dimensions.get('window')

export default class DetailPage extends Component {
  constructor(props){
    super(props)
      this.state = {
            commentinfo:"评价("+parseFloat(this.props.item.stars).toFixed(1)+")分",
          sellerID:this.props.item.sellerId,
          collectColor:"#FFF",
          isCollect:"收藏",
          scrollY: 0,
          titleOpacity: 0,
          activeOpacity: 1,
          headOpacity: 1,
          addBtnY: -9999,
          animateBtnX: 0,
          animateBtnY: 0,
          runBtn: new Animated.Value(0),
          selected: [],
          lens: {},
          bgY: 0,
          bgScale: 1,
          viewRef: 0,
          b: {},
          goods: [],
          data: {
              name:this.props.item.sellerName,
              isBrand: true,
              logo: this.props.item.brand,
              scores: 3.5,
              sale: 4013,
              bao: true,
              piao: true,
              ontime: true,
              fengniao: true,
              startPay: "￥20起送",
              deliverPay: "配送费￥4",
              evOnePay: "￥21/人",
              journey: "250m",
              time: this.props.item.sellerTime,
              bulletin: "推荐使用食芊觅订餐",
              activities: [
                  // {key: "减", text: "满20减2，满30减3，满40减4（不与美食活动同享）"},
                  // {key: "特", text: "双人餐特惠"},
              ]
          }
      };
    // alert(JSON.stringify(this.props.item))
  }
  componentDidMount(){
      fetch(Global.url+"/goodsFindAll",{
          method:"POST",
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body:`sellerID=${this.state.sellerID}`
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


    let marginTop = 18+px2dp(80+this.state.data.activities.length*18)
    let { scrollY } = this.refs.goodsList.state
    let activeHeight = px2dp(18)*2
    this.setState({
      activeOpacity: scrollY.interpolate({inputRange: [0, activeHeight],outputRange: [1, 0]}),
      bgScale: scrollY.interpolate({inputRange: [ -marginTop, 0, marginTop],outputRange: [2, 1, 1]}),
      headOpacity: scrollY.interpolate({inputRange: [0, activeHeight, marginTop],outputRange: [1, 1, 0]}),
      titleOpacity: scrollY.interpolate({inputRange: [0, marginTop-10, marginTop],outputRange: [0, 0, 1]}),
      scrollY: scrollY.interpolate({inputRange: [0, marginTop, marginTop],outputRange: [0, -marginTop, -marginTop]}),
      bgY: scrollY.interpolate({inputRange: [ -marginTop, 0, marginTop, marginTop],outputRange: [marginTop/2, 0, -marginTop/3, -marginTop/3]})
    })
  }
    collect(){
        alert(this.state.collectColor)
        this.setState({isCollect:"已收藏"});
        this.setState({collectColor:"red"});
    }
  back(){
    this.props.navigator.pop()
  }
  onAdd(data){
    let { pos } = data
      // alert(JSON.stringify(data))
      // data.data是菜品的信息
      //菜品的ID是h
    this.setState({
      addBtnY: data.y
    })
    this.refs["parabolic"].run(pos, data)
  }
    minusItem(obj,index){
        let { selected,lens } = this.state
        let key = index
        let num = (lens[key]||0)-1
        if(num < 0){
            return
        }
        lens[key] = num
        lens.maxPrice -= obj.price
        lens.length -= 1

        for(let i=0,item; item=selected[i]; i++){
            if(item.id == key){
                selected.splice(i)
            }
        }
        this.setState({selected, lens})
    }
  parabolicEnd(data){
    let { selected, lens } = this.state
    let num = (lens[data.h]||0)+1
    let price = lens.maxPrice || 0
    let length = lens.length || 0
    lens[data.h] = num
    lens.maxPrice = price+data.data.price
    lens.length = length + 1
      let flag = 0;
      for(let i=0;i<selected.length;i++){
        if(selected[i].goodsId==data.h){
            selected[i].length=num;
            flag = 1;
        }
      }
      if(flag === 0){
          selected.push({goodsId:data.h,data:data.data,length:num})
      }
    this.state.runBtn.setValue(0)
    this.setState({ addBtnY: -9999, selected, lens})
    this.refs.shopbar.runAnimate()
  }
  renderGoods(){
    let marginTop = 18+px2dp(80+this.state.data.activities.length*18)
    let MAIN_HEIGHT = height - NavBar.topbarHeight
    let CONTENT_HEIGHT = MAIN_HEIGHT - marginTop
    let style = {
      transform: [{
        translateY: this.state.scrollY
      }]
    }
    if(Platform.OS == "android"){
      style.height = height + 80
    }

    return (
      <Animated.View style={[styles.topView, style]}>
        <View style={{
          backgroundColor: "#f3f3f3",
          height: MAIN_HEIGHT,
          width,
          marginTop
        }}>
            {/*{alert(JSON.stringify(this.state.selected))}*/}
          <ScrollableTabView page={0} renderTabBar={() => <TabViewBar/>}>
            <GoodsList
                ref="goodsList"
                minus={this.minusItem.bind(this)}
                lens={this.state.lens}
                goods={this.state.goods}
                onAdd={this.onAdd.bind(this)}
                headHeight={marginTop} tabLabel="商品"/>
            <Comments headHeight={marginTop} tabLabel={this.state.commentinfo} sellerID={this.state.sellerID} />
              {/*{alert(this.state.sellerID)}*/}
          </ScrollableTabView>
        </View>
      </Animated.View>
    )
  }

  // renderActivities(){
  //   let color = {
  //     "减": "#f07373",
  //     "特": "#f1884f",
  //     "新": "#73f08e"
  //   }
  //   let { activities } = this.state.data
  //   if(!activities || !activities.length){
  //     return null
  //   }else{
  //     return (
  //       <Animated.View style={[styles.actives, {opacity: this.state.activeOpacity}]}>
  //         {
  //           activities.map((item, i) => {
  //             return (
  //               <View key={i} style={{flexDirection: "row", alignItems:"center", height: px2dp(18)}}>
  //                 <Text style={{fontSize: px2dp(11), color: "#fff", backgroundColor: color[item.key] || "#f1884f", paddingHorizontal: 1, paddingVertical: 1}}>{item.key}</Text>
  //                 <Text numberOfLines={1} style={{fontSize: px2dp(11), marginLeft:3, color: "#fff"}}>{item.text}</Text>
  //               </View>
  //             )
  //           })
  //         }
  //       </Animated.View>
  //     )
  //   }
  // }
  imageLoaded(){
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
  }
  render(){
    let { data } = this.state
    let props = Platform.OS === 'ios'?{
      blurType: "light",
      blurAmount: 25
    }:{
      viewRef: this.state.viewRef,
      downsampleFactor: 10,
      overlayColor: 'rgba(255,255,255,.1)'
    }
      return (
          <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
              <Animated.Image source={this.state.data.logo} ref={'backgroundImage'}
                              onLoadEnd={this.imageLoaded.bind(this)} style={[
                  styles.bg,
                  {
                      transform: [{translateY: this.state.bgY},
                          {scale: this.state.bgScale}]
                  }
              ]}>
                  {/*<BlurView {...props} style={styles.blur}/>*/}
              </Animated.Image>
              <View style={styles.head}>
                  <Animated.View style={{flexDirection: "row", paddingLeft: 16, opacity: this.state.headOpacity}}>
                      <Image source={JSON.parse(this.state.data.logo)} style={styles.logo}/>
                      <View style={{marginLeft: 14, flex: 1}}>
                          <Text style={{color: "#fff"}}>{data.name}</Text>
                          <TouchableOpacity>
                              <View style={{flexDirection: "row", paddingTop: 8, paddingBottom: 18}}>
                                  {/*{data.fengniao?(<Text style={[styles.label2, {marginRight: 5}]}>{"蜂鸟专送"}</Text>):null}*/}
                                  <Text style={{color: "#fff", fontSize: px2dp(12)}}>{`${data.time}分钟送达`}</Text>
                              </View>
                          </TouchableOpacity>
                          <Text style={{color: "#fff", fontSize: px2dp(12)}} numberOfLines={1}>{data.bulletin}</Text>
                      </View>
                      {/*<TouchableOpacity onPress={this.collect.bind(this)}*/}
                                        {/*style={{alignItems:'center',justifyContent:'center',width:80,borderLeftWidth:1,borderLeftColor:"gray",backgroundColor:'red'}}>*/}
                          {/*<Icon name="ios-star" size={22}*/}
                                {/*color={this.state.collectColor}/>*/}
                          {/*<Text style={{color:"#FFF"}}>{this.state.isCollect}</Text>*/}
                      {/*</TouchableOpacity>*/}
                  </Animated.View>
                  {/*{this.renderActivities()}*/}
              </View>
              {this.renderGoods()}
              <NavBar
                  title={data.name}
                  titleStyle={{opacity: this.state.titleOpacity}}
                  style={{backgroundColor: "transparent", position: "absolute", top: 0, width}}
                  leftIcon="ios-arrow-back"
                  leftPress={this.back.bind(this)}
                  // rightIcon="ios-more"
                  // rightPress={() => {
                  //     alert("暂未开放")
                  // }}
              />
              <Parabolic
                  ref={"parabolic"}
                  style={[styles.tmpBtn, {top: this.state.addBtnY}]}
                  renderChildren={() => {
                      return (
                          <View style={{
                              width: px2dp(14),
                              height: px2dp(14),
                              backgroundColor: "#3190e8",
                              borderRadius: px2dp(7),
                              overflow: "hidden",
                          }}/>
                      )
                  }}
                  animateEnd={this.parabolicEnd.bind(this)}
              />
              {/*{alert(JSON.stringify(this.props.item))}*/}
              <ShopBar ref={"shopbar"} list={this.state.selected} seller={this.props.item} {...this.props} lens={this.state.lens}/>
          </View>
      );
  }
}
/*
<Animated.View style={[styles.tmpBtn, {
  top: this.state.addBtnY,
  transform: [
    { translateX: this.state.animateBtnX },
    { translateY: this.state.animateBtnY }
  ]
}]}>
  <View style={{width:px2dp(14), height:px2dp(14), backgroundColor:"#3190e8", borderRadius: px2dp(7), overflow:"hidden"}}></View>
</Animated.View>
*/
const styles = StyleSheet.create({
    head: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        paddingTop: NavBar.topbarHeight,
        backgroundColor: "rgba(0,0,0,.3)"
    },
    bg: {
        width,
        height: width,
        resizeMode: "cover"
    },
    blur: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        width,
        height: width,
    },
    logo: {
        width: px2dp(80),
        height: px2dp(80),
        resizeMode: "cover",
        backgroundColor:'rgba(250,250,250,0.5)'
    },
    label2: {
        fontSize: 10,
        color: "#fff",
        backgroundColor: "#00abff",
        textAlign: "center",
        paddingHorizontal: 2,
        paddingVertical: 1
    },
    actives: {
        paddingTop: 4,
        marginTop: 8,
        paddingHorizontal: 16
    },
    topView: {
        position: "absolute",
        top: NavBar.topbarHeight,
        bottom: 0,
        left: 0,
        right: 0
    },
    tmpBtn: {
        backgroundColor: "transparent",
        position: "absolute",
        right: 4,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});
