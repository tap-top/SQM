/**
 * Created by tww on 2017/5/7.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    ToastAndroid,
    View
} from 'react-native';
import Button from './Button';
import Test from './test';
var _navigator;
var d;
class Hello2 extends Component {

    constructor(props){
        super(props);
        d = this;
        this.state = {city:''}
        //  this.refeshView = this.refeshView.bind(this);
    }

    configureScene(route){
        return Navigator.SceneConfigs.FadeAndroid;
    }

    refeshView(msg){
        console.log('刷新');
        d.setState({'city':msg});
        console.log('end');
    }

    renderScene(router, navigator){
        console.log(d);
        _navigator = navigator;
        if(router.id === 'main'){
            return <View style={styles.container}>
                <Button  onPress={() => {
                    console.log('start');
                    _navigator.push({title:'MainPage',id:'page',callBack:(msg)=>{
                        console.log(d);
                        d.refeshView(msg);
                        console.log('end');}});
                }} text={'打开'} style={styles.instructions} disabled = {false}/>

                <Text style={styles.welcome}>
                    {d.state.city}
                </Text>
                <Text style={styles.instructions}>

                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>


            </View>
        }else if(router.id === 'page'){

            return (
                <Test navigator={navigator} router={router}/>
            );
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ title: 'Main', id:'main'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene} />

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('Hello2', () => Hello2);