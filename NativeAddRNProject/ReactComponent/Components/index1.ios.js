import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class RNFirstView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={()=>this.passValueToNativeOne()}>页面1</Text>
                <View style={styles.bottomView}>
                    <View style={[styles.itemView,{backgroundColor:'red'}]}></View>
                    <View style={[styles.itemView,{backgroundColor:'green'}]}></View>
                    <View style={[styles.itemView,{backgroundColor:'blue'}]}></View>
                </View>
            </View>
        );
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
    bottomView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemView:{
        width:100,
        height:100,
        marginLeft: 10,
    },
});