
import React, { Component, PropTypes } from 'react';
import { requireNativeComponent} from 'react-native';
//第一种
// export  default  requireNativeComponent('AlaleiRefreshControl', 'MyRefreshControl');
//第二种
var MyRefresh = requireNativeComponent('AlaleiRefreshControl', MyRefreshControl);
export default class MyRefreshControl extends Component {
    render() {
        return (
            <MyRefresh {...this.props} />
        );
    }
}