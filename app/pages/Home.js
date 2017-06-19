/**
 * @author tww
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  BackAndroid,
  ScrollView,
  StyleSheet,
  AlertIOS,
  RefreshControl,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Animated
} from 'react-native'
import LocalImg from '../images'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import SplashScreen from 'react-native-splash-screen'
import Global from '../Global'
import SearchView from '../component/SearchView'
import LbsModal from '../component/LbsModal'
import TabView from '../component/TabView'
import Bz from '../component/Bz'
import DetailPage from './DetailPage'
import data from '../data'
import NavBar from "../component/NavBar";

const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?140:120)
const InputHeight = px2dp(28)

export default class HomePage extends Component {
  constructor(props){
      super(props)
      this.state = {
          location: "安徽大学",
          scrollY: new Animated.Value(0),
          searchView: new Animated.Value(0),
          modalVisible: false,
          searchBtnShow: true,
          listLoading: false,
          isRefreshing: false,
          data:[],
      };

      this.SEARCH_BOX_Y = px2dp(isIOS?48:43)
      this.SEARCH_FIX_Y = headH-px2dp(isIOS?64:44)
      this.SEARCH_KEY_P = px2dp(58)
      this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y-this.SEARCH_BOX_Y
      this.SEARCH_FIX_DIFF_Y = headH-this.SEARCH_FIX_Y-headH
  }
  componentDidMount(){
      SplashScreen.hide()
      BackAndroid.addEventListener('hardwareBackPress', function () {
          BackAndroid.exitApp(0)
          return true
      })
      fetch(Global.url+"/sellerFindAll",{
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
          if(json !=undefined && json.code ==="0"){
              this.setState({data:json.object});
          }else{
              alert("失败");
          }
      })
  }
  _renderHeader(){
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y]
    })
    let lbsOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0]
    })
    let keyOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
      outputRange: [1, 1, 0]
    })
      return (
          <View style={styles.header}>
              <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
                  <TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
                      <View style={styles.lbs}>
                          <Icon name="ios-pin" size={px2dp(18)} color="#fff"/>
                          <Text style={{
                              fontSize: px2dp(18),
                              fontWeight: 'bold',
                              color: "#fff",
                              paddingHorizontal: 5
                          }}>{this.state.location}</Text>
                          <Icon name="md-arrow-dropdown" size={px2dp(16)} color="#fff"/>
                      </View>
                  </TouchableWithoutFeedback>
                  {/*<View style={styles.weather}>*/}
                      {/*<View style={{marginRight: 5}}>*/}
                          {/*<Text style={{color: "#fff", fontSize: px2dp(11), textAlign: "center"}}>{"3°"}</Text>*/}
                          {/*<Text style={{color: "#fff", fontSize: px2dp(11)}}>{"阵雨"}</Text>*/}
                      {/*</View>*/}
                      {/*<Icon name="ios-flash-outline" size={px2dp(25)} color="#fff"/>*/}
                  {/*</View>*/}
              </Animated.View>
              <Animated.View style={{
                  marginTop: px2dp(25),
                  transform: [{
                      translateY: searchY
                  }]
              }}>
                  <TouchableWithoutFeedback onPress={() => {
                  }}>
                      <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
                          <Icon name="ios-search-outline" size={20} color="#666"/>
                          <TextInput
                              underlineColorAndroid='transparent'
                              placeholder="输入商家，商品名称"
                              style={{
                              width:0.8*width,
                              fontSize: 12,
                              color: "#666",
                              padding:0,
                          }}/>
                      </View>
                  </TouchableWithoutFeedback>
              </Animated.View>
          </View>
      );
  }
  _renderFixHeader(){
    let showY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [-9999, -9999, 0, 0]
    })
    return (
      <Animated.View style={[styles.header, {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        height: px2dp(isIOS?64:44),
        paddingTop: px2dp(isIOS?25:10),
        transform: [
          {translateY: showY}
        ]
      }]}>
        <TouchableWithoutFeedback onPress={()=>{}}>
          <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
            <Icon name="ios-search-outline" size={20} color="#666" />
            <TextInput underlineColorAndroid='transparent'
                       placeholder="输入商家，商品名称"
                       style={{width:0.8*width,padding:0,fontSize: 12, color:"#666", marginLeft: 5}}/>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
  openLbs(){
    this.setState({modalVisible: true})
  }
  changeLocation(location){
    this.setState({location})
  }
  _renderBZ(){
    return this.state.data.map((item, i) => {
      item.onPress = () => {
        this.props.navigator.push({
            component: DetailPage,
            args: {item}
        })
      }
      //加载商家的信息
      return (<Bz {...item} key={i}/>)
    })
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
        fetch(Global.url+"/sellerFindAll",{
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
            if(json !=undefined && json.code ==="0"){
                this.setState({data:json.object});
            }else{
                alert("失败");
            }
        })
      this.setState({isRefreshing: false});
    }, 2000)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
          <NavBar
              title={"欢迎使用食芊觅客户端"}
          />
        <ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          {/*{this._renderHeader()}*/}
          <View style={styles.business}>
            {/*<Text style={{color: "#666", paddingLeft: 16, paddingBottom: 6}}>{"推荐商家"}</Text>*/}
            {this._renderBZ()}
            <ActivityIndicator style={{marginTop: 10}} animating={this.state.listLoading}/>
          </View>
        </ScrollView>
        {/*{this._renderFixHeader()}*/}
        <SearchView show={this.state.searchView} scrollY={this.state.scrollY}/>
        <LbsModal
          modalVisible={this.state.modalVisible}
          location={this.state.location}
          setLocation={this.changeLocation.bind(this)}
          closeModal={(()=>this.setState({modalVisible: false})).bind(this)}
          {...this.props}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0398ff",
    height: headH,
    paddingTop: px2dp(isIOS?30:10),
    paddingHorizontal: 16
  },
  typesView: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  lbsWeather: {
    height: InputHeight,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeholder: {
    height: InputHeight,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: "row"
  },
  scrollView: {
    marginBottom: px2dp(46)
  },
  recom: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  business: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 16
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: px2dp(11),
    color: "#fff",
    marginHorizontal: 3
  },
  recomItem: {
    width: width/2,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row"
  },
  recomWrap: {
    flex: 1,
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: "#00abff",
    borderColor: "#00abff",
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5
  },
  gift: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  fixSearch: {
    backgroundColor: "#0398ff",
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  }
})
