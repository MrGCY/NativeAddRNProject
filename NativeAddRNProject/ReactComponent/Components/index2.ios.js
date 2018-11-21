import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import MyRefreshControl from './MyRefreshView';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
var ITEM_HEIGHT = 100;
export default class demo extends Component {
    dataSource = [];
    constructor(props) {
        super(props);
        this.state = {
            dataArr : this.dataSource,
            isRefreshing : false,
        }
    }
    addItem(){
        this.dataSource = [];
        for (var i = 0; i < 10; i++) {
            this.dataSource.push({key: i + '', title: i + ''});
        }
    }
    componentDidMount() {
        //先刷新
        // this._handleRefresh();
    }

    _handleRefresh = () => {
        this.addItem();
        this.setState({
            isRefreshing: true
        });
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
                dataArr:this.state.dataArr.concat(this.dataSource),
            });
        }, 1500);
    }

    renderRefreshControl() {
        return <MyRefreshControl
            style={{backgroundColor : 'red'}}
            refreshing={this.state.isRefreshing}
            onRefresh={this._handleRefresh} />
    }
    //加载更多数据
    list_reloadMoreData(distanceFromEnd){
        console.log('距离底部' + distanceFromEnd);
        setTimeout(() => {
            if (this.dataSource.length > 0 && this.state.isRefreshing == false){
                this.state.isRefreshing = true;
                this.addItem();
                this.setState({
                    dataArr:this.state.dataArr.concat(this.dataSource),
                    isRefreshing:false,
                });
            }
        }, 1500);
    }
    //加载数据并展示
    list_renderItem = (item) => {
        let  txt = '第' + item.index + '个' + ' title=' + item.item.title;
        let bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        return (
            <TouchableOpacity
                key = {item.index + ''}
                activeOpacity = {0.5}
                onPress = {() => {this.onPress(item.index)}}
            >
                <View style = {{flexDirection:'row',height:ITEM_HEIGHT,backgroundColor:bgColor,justifyContent:'center',alignItems:'center',padding:10}}>
                    <Text style={[{flex:1},styles.txt]}>
                        {txt}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    onPress = (index) => {
        console.log('点击第' +index + 'cell了');
        // AlertIOS.alert();
    }
    //列表数据为空
    list_listEmptyComponent = () => {
        return (
            <View style={{backgroundColor: 'red', flex: 1, height: 500, alignItems: 'center',justifyContent: 'center'}}>
                <Text>list为空</Text>
            </View>
        );
    }
    //列表的尾部控件
    list_listFooterComponent = () => {
        return <Text style={[{height:ITEM_HEIGHT,backgroundColor:'orange'},styles.txt]}>尾部控件</Text>
    }
    //列表的头部控件
    list_listHeaderComponent = () => {
        return <Text style={[{height:ITEM_HEIGHT,backgroundColor:'yellow',color:'black',fontSize:40,textAlign:'center'}]}>头部控件</Text>
    }
    list_separator = () => {
        return <View style={{height:2,backgroundColor:'black'}}/>;
    }
    refreshFlat = () => {
        this.setState({
            dataArr : []
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={this.renderRefreshControl()}
                    data = {this.state.dataArr}
                    //两种方式都可以 感觉是一种语法糖
                    //renderItem = {(item) => this.list_renderItem(item)}
                    renderItem = {this.list_renderItem}
                    ListEmptyComponent = {this.list_listEmptyComponent}
                    ListFooterComponent = {this.list_listFooterComponent}
                    ListHeaderComponent = {this.list_listHeaderComponent}
                    ItemSeparatorComponent = {this.list_separator}
                    //设置滚动方向
                    //horizontal={true}
                    //注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onEndReachedThreshold = {0.5}
                    //只会触发一次
                    onEndReached = {(info) =>this.list_reloadMoreData(info.distanceFromEnd)}
                    // onEndReached = {(info) => console.log('快到底部了' + info.distanceFromEnd)}
                    //numColums:{3}
                    //columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}
                    // onRefresh={() => this.refreshFlat()}
                    // refreshing={this.state.isRefreshing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'green',
        flex:1,
    },
    txt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
    },

    contentView: {
        flex: 1,
        alignItems: 'center'
    },
    cellView:{
        width: screenWidth,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedView: {
        position: 'absolute',
        width: screenWidth,
        height: 100,
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(1, 1, 1, 0.0)'
    }
});
