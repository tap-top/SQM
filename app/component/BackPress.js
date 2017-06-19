/**
 * Created by tww on 2017/4/28.
 */
import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
class BackPress extends Component {
    constructor(props) {
        super(props);
        BackAndroid.addEventListener('hardwareBackPress',  ()=> {
            this.props.navigator.pop();
            return true;
        });
    }
}
module.exports = BackPress;   // 这里需用这种方法，否则会报 super 的错