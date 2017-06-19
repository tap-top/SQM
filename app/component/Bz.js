'use strict';

import React, { Component, PropTypes } from 'react'
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LocalImg from '../images'
import px2dp from '../util'
import Button from './Button'

export default class Bz extends Component {
  constructor(props){
      super(props)
  }
  // static propTypes = {
  //     name: PropTypes.string.isRequired, // 商家名
  //     logo: PropTypes.number.isRequired, // 商家logo
  //     isBrand: PropTypes.bool,
  //     scores: PropTypes.number, //商家评分
  //     sale: PropTypes.number, //月销售量
  //     bao: PropTypes.bool, // 保计划
  //     piao: PropTypes.bool, // 票
  //     ontime: PropTypes.bool, // 准时
  //     fengniao: PropTypes.bool, // 蜂鸟专送
  //     startPay: PropTypes.string, // 起送费
  //     deliverPay: PropTypes.string, // 配送费
  //     evOnePay: PropTypes.string, // 费用/人
  //     journey: PropTypes.string, // 路程
  //     time: PropTypes.string, // 送餐时间
  //     activities: PropTypes.array,
  //     onPress: PropTypes.func
  // }

  render(){
    // const {name, isBrand, logo, scores, sale, bao, piao, ontime, fengniao, startPay, deliverPay, evOnePay, journey, time, activities, onPress} = this.props
    const {sellerId, brand, sellerName, sellerPhone, sellerAddress, stars, monthSelled,sellerTime, distance, startPrice, dispatchPrice, perCaptitaPrice, onPress} = this.props
      let scale = stars/5*50;
      let star = parseFloat(stars).toFixed(1)
      // let star = parseFloat(stars).toFixed(1)
      return (
          <Button onPress={onPress} {...this.props}>
              <View style={styles.bzWrap}>
                  <View style={styles.border}>
                      <Image source={JSON.parse(brand)} style={styles.bzLogo}/>
                      <View style={styles.bzContent}>
                          <View style={styles.between}>
                              <View style={{flexDirection: "row", flex: 1}}>
                                  {/*{isBrand ? (<Text style={styles.brand}>{"品牌"}</Text>) : null}*/}
                                  <Text numberOfLines={1} style={styles.name}>{sellerName}</Text>
                              </View>
                              {/*<View style={{flexDirection: "row", justifyContent: "flex-end", width: 70}}>*/}
                                  {/*{bao ? (<Text style={styles.label}>{"保"}</Text>) : null}*/}
                                  {/*{piao ? (<Text style={[styles.label, {marginLeft: 2}]}>{"票"}</Text>) : null}*/}
                              {/*</View>*/}
                          </View>
                          <View style={[styles.between, {marginTop: 8}]}>
                              <View style={{flexDirection: "row", flex: 1,justifyContent:'space-between'}}>
                                  <View style={{flexDirection:"row"}}>
                                      <Image source={LocalImg.star2} style={{height: 10, width: 55}}/>
                                      <View style={{
                                          height: 10,
                                          position: "absolute",
                                          left: 0,
                                          top: 0,
                                          width: scale,
                                          overflow: "hidden",
                                           backgroundColor:'transparent',
                                      }}>
                                          <Image source={LocalImg.star1} style={{height: 10, width: 55}}/>
                                      </View>
                                      <Text style={{fontSize: px2dp(11), color: "#ff6000"}}>{star}</Text>
                                      <Text style={{fontSize: px2dp(11), color: "#666", marginLeft: 2}}>{`月售${monthSelled}单`}</Text>
                                  </View>

                                  <View style={{flexDirection:"row"}}>
                                      <Text style={{fontSize: px2dp(11), color: "#666", marginLeft: 2}}>{`${sellerTime}分钟`}</Text>
                                      <Text style={styles.line}>{'|'}</Text>
                                      <Text style={{fontSize: px2dp(11), color: "#666", marginLeft: 2}}>{`${distance}米`}</Text>
                                  </View>
                              </View>
                              {/*<View style={{flexDirection: "row", justifyContent: "flex-end"}}>*/}
                                  {/*{ontime ? (<Text style={styles.label1}>{"准时达"}</Text>) : null}*/}
                                  {/*{fengniao ? (<Text style={[styles.label2, {marginLeft: 2}]}>{"蜂鸟专送"}</Text>) : null}*/}
                              {/*</View>*/}
                          </View>
                          <View style={[styles.between, {marginTop: 8}]}>
                              <View style={{flexDirection: "row", flex: 1}}>
                                  <Text style={styles.infoText}>起送    {startPrice}</Text>
                                  <Text style={styles.line}>{'|'}</Text>
                                  <Text style={styles.infoText}>配送    {dispatchPrice}</Text>
                                  <Text style={styles.line}>{'|'}</Text>
                                  <Text style={styles.infoText}>平均    {perCaptitaPrice}</Text>
                              </View>
                              {/*<View style={{flexDirection: "row", justifyContent: "flex-end"}}>*/}
                                  {/*<Text style={styles.infoText}>{journey}</Text>*/}
                                  {/*<Text style={styles.line}>{'|'}</Text>*/}
                                  {/*<Text style={{fontSize: px2dp(11), color: "#00abff", marginLeft: 2}}>{time}</Text>*/}
                              {/*</View>*/}
                          </View>
                          {/*{this.renderActivities()}*/}
                      </View>
                  </View>
              </View>
          </Button>
      );
  }
}


const styles = StyleSheet.create({
  bzWrap: {
    backgroundColor: "#fff",
    paddingLeft: 10
  },
  border: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5"
  },
  bzBox: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderTopColor: "#f9f9f9"
  },
  bzLogo: {
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#f9f9f9",
    width: px2dp(60),
    height: px2dp(60)
  },
  bzContent: {
    marginLeft: 6,
    marginRight: 10,
    flex: 1
  },
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 3
  },
  brand: {
    fontSize: 12,
    color: "#52250a",
    paddingHorizontal: 3,
    paddingVertical: 2,
    backgroundColor: "#ffdc37"
  },
  label: {
    fontSize: 10,
    color: "#999",
    borderWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 3
  },
  label1: {
    fontSize: 10,
    color: "#00abff",
    borderWidth: 1,
    borderColor: "#00abff",
    textAlign: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 3
  },
  label2: {
    fontSize: 10,
    color: "#fff",
    backgroundColor: "#00abff",
    textAlign: "center",
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  line: {
    fontSize: px2dp(11),
    color: "#999",
    paddingHorizontal: 3
  },
  infoText: {
    fontSize: px2dp(11),
    color: "#666"
  },
  actives: {
    paddingTop: 4,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f9f9f9"
  }
})
