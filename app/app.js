'use strict';

import React, { Component } from 'react'
import {BackAndroid, Navigator, View, StatusBar, Platform } from 'react-native'
import Wrapper from './component/Wrapper'
//import Events from './util/event'
import SplashScreen from 'react-native-splash-screen'

export default class Navigation extends Component{
    constructor(props){
      super(props)
    }
    componentDidMount(){
        SplashScreen.hide()
        BackAndroid.addEventListener('hardwareBackPress', function () {
            BackAndroid.exitApp(0)
            return true
        })
    }
    render(){
        return Platform.OS == "ios"?(
          <Navigator
            initialRoute={{component: Wrapper}}
            configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            renderScene={(route, navigator) => {
                  return <route.component navigator={navigator} {...route.args}/>
                }
            }
          />
        ):(
          <View style={{flex: 1}}>
            <StatusBar
             backgroundColor="#0398ff"
             barStyle="light-content"
           />
            <Navigator
              initialRoute={{component: Wrapper}}
              configureScene={() => Navigator.SceneConfigs.FloatFromRight}
              renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                  }
              }
            />
          </View>
        )
    }
}
