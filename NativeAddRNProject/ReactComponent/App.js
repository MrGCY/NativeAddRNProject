

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
    View,
    NativeModules,
    NativeEventEmitter,
    Alert,
} from 'react-native';
// 拿到原生模块
var CalendarManager = NativeModules.CalendarManager;
var nativeAppEv;

export default class APP extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            str:''
        };
      }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeOne()}>点击往原生传字符串</Text>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeTwo()}>点击往原生传字符串+字典</Text>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeThree()}>点击往原生传字符串+日期</Text>
                <Text style={styles.welcome} onPress={()=>this.callBackOne()}>点击调原生+回调</Text>
                <Text style={styles.welcome} onPress={()=>this.callBackTwo()}>Promises</Text>
                <Text style={styles.welcome} onPress={()=>this.useNativeValue()}>使用原生定义的常量</Text>
                <Text style={styles.welcome}>我是原生传过来的:{this.state.str}</Text>
            </View>
        );
    }
    // 传原生一个字符串
    passValueToNativeOne = ()=>{
        CalendarManager.addEventOne('周少停');
    }
    // 传原生一个字符串 + 字典
    passValueToNativeTwo = ()=>{
        CalendarManager.addEventTwo('周少停',{job:'programmer'});
    }
    // 传原生一个字符串 + 日期
    passValueToNativeThree = ()=>{
        CalendarManager.addEventThree('周少停',19910730);
    }
    // 传原生一个字符串 + 回调
    callBackOne = ()=>{
        CalendarManager.testCallbackEventOne(('我是RN给原生的'),(error, events) => {
            if (error) {
                console.error(error);
            } else {
                alert(events)
            }
        })
    }
    //Promise回调
    async callBackTwo(){
        try{
            var events=await CalendarManager.testCallbackEventTwo();
            alert(events)
        }catch(e){
            console.error(e);
        }
    }
    //使用原生定义的常量
    useNativeValue = ()=>{
        alert(CalendarManager.ValueOne)
    }
    componentWillMount(){
        // 创建自定义事件接口
        const eventEmitterManagerEmitter = new NativeEventEmitter(CalendarManager);
        // 导出通知事件常量
        const EventEmitterManagerEvent   = CalendarManager.EventEmitterManagerEvent;
        // 监听原生 发送的通知
        nativeAppEv = eventEmitterManagerEmitter.addListener(
            EventEmitterManagerEvent,
            (reminder) => {
                this.setState({
                    str:reminder
                })
            }
        );
    }
    componentDidMount() {
        // 调用原生模块 postNotificationEvent方法
        CalendarManager.postNotificationEvent('高晨阳事件传递');
    }

    componentWillUnmount() {
        nativeAppEv.remove();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:100
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

