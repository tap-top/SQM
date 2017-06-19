'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  AlertIOS,
  Animated,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import px2dp from '../util'
import LocalImg from '../images'
import Button from '../component/Button'
import Icon from 'react-native-vector-icons/Ionicons'

let {width, height} = Dimensions.get('window')
const MAIN_HEIGHT = height - (Platform.OS === 'ios' ? 64 : 42) - 36
const LABEL_HEIGHT = 25
const PIC_SIZE = px2dp(60)

export default class GoodsList extends Component {
  constructor(props){
      super(props)
      this.state = {
        scrollY: new Animated.Value(0)
      }
  }
  componentDidMount(){

  }
  addItem(obj,id){/*添加商品*/
    this.refs[id].measure((a, b, w, h, px,py) => {
        this.props.onAdd({
            h: id,
            x: px,
            y: py,
            data: obj,
            pos: [px, py, 26, height - 60]
        });
    })
  }
  minusItem(obj, index){/*删除商品*/
    this.props.minus(obj, index)
  }
  renderList(){
    let { goods, lens } = this.props

      return (
          goods.map((obj) => {
              let len = lens[obj.id]||0;
              return (
              <View key={obj.id}>
                  {/*<View><Text>{len} {lens[index]} {index} {JSON.stringify(lens)}</Text></View>*/}
                  <Button onPress={() => { }}>
                      <View style={styles.itemWrap}>
                          <View style={styles.item}>
                              <Image source={obj.image} style={{
                                  backgroundColor: "#f9f9f9",
                                  width: PIC_SIZE,
                                  height: PIC_SIZE,
                                  resizeMode: "contain",
                                  marginRight: 8
                              }}/>
                              <View style={{flex: 1}}>
                                  <Text
                                      style={{fontSize: px2dp(14), color: "#333", fontWeight: "bold"}}>{obj.name}</Text>
                                  <Text numberOfLines={2} style={{
                                      fontSize: px2dp(10),
                                      color: "#999",
                                      paddingVertical: 2
                                  }}>{obj.info}</Text>
                                  <Text style={{fontSize: px2dp(10), color: "#666"}}>已售 {obj.sale}</Text>
                              </View>
                          </View>
                          <Text style={{
                              fontSize: px2dp(16),
                              fontWeight: "bold",
                              color: "#ff6000",
                              paddingTop: 6,
                              paddingLeft: PIC_SIZE + 8
                          }}>{`￥${obj.price}`}</Text>
                      </View>
                  </Button>

                  <View style={[styles.priceView, {
                          transform: [
                              {
                                  translateX: len ? 0 : 999
                              }
                          ]
                      }]}>
                      <TouchableOpacity onPress={this.minusItem.bind(this, obj,obj.id)}>
                          <Icon name={"ios-remove-circle-outline"} size={px2dp(26)} color={"#3190e8"}/>
                      </TouchableOpacity>
                      <Text style={{fontSize: px2dp(13), width: 25, textAlign: "center", color: "#333"}}>{len}</Text>
                  </View>

                  <TouchableOpacity ref={obj.id} style={styles.addBtn} onPress={this.addItem.bind(this, obj, obj.id)}>
                      <Icon name={"ios-add-circle"} size={px2dp(26)} color={"#3190e8"}/>
                  </TouchableOpacity>
              </View>
              )
          })
    )
  }
  render(){
    let { headHeight } = this.props
    let scrollY = this.state.scrollY.interpolate({
      inputRange: [0, headHeight, headHeight],
      outputRange: [0, headHeight, headHeight+1]
    })
    let style = {flex: 1,flexDirection: "row", backgroundColor:"#000"}
    if(Platform.OS == "android"){
      style.height = height
    }
    return (
      <View style={style}>
        <View style={{flex:1}}>
          <ScrollView
           style={{flex: 1}}
           showsVerticalScrollIndicator={false}
           onScroll={Animated.event(
             [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
           )}
           scrollEventThrottle={16}
          >
            <Animated.View style={{
              backgroundColor:"#FFF",
              paddingBottom: headHeight + px2dp(65),
              transform: [{translateY: scrollY}]
            }}>
              {this.renderList()}
            </Animated.View>
          </ScrollView>
          {/*<View style={[styles.label, {*/}
            {/*position: "absolute",*/}
            {/*top:0,*/}
            {/*left:0,*/}
            {/*right: 0*/}
          {/*}]}>*/}
            {/*<Text style={{fontSize: px2dp(13), color: "#666"}}>{Object.keys(this.props.goods)[0]}</Text>*/}
          {/*</View>*/}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  typeItem: {
    flexDirection: "row",
    alignItems:"center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor:"#f8f8f8"
  },
  itemWrap: {
    paddingTop: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fff",
    paddingHorizontal: 12
  },
  item: {
    flexDirection: "row"
  },
  label: {
    // height: LABEL_HEIGHT,
    // paddingLeft: 10,
    // justifyContent: "center",
    // backgroundColor: "#f5f5f5",
    // borderLeftWidth: 3,
    // borderLeftColor: "#ddd"
  },
  active: {
    borderLeftWidth: 3,
    borderLeftColor: "#3190e8",
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
  },
  addBtn: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  priceView: {
    flexDirection:"row",
    backgroundColor:"transparent",
    position: "absolute",
    right: 34,
    bottom: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
})