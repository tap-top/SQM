/**
 * Created by tww on 2017/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
var _navigator;
import Button from './Button';
class Test extends Component {

    render() {
        return (
            <View style={{flex:1}}>

                <Button  onPress={() => {
                    console.log(this.props);
                    this.props.router.callBack('I am a Student');
                    this.props.navigator.pop();
                }} text={'返回'} style={styles.instructions} disabled = {false}/>

            </View>
        );

    }



}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: '#126798',
        marginTop: 50,
    }
});

module.exports = Test;