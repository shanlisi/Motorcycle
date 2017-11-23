import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

import { myGet } from "./../../../api/index"
import cookie from "./../../App/cookie"
/**
 * 获取用户购物车信息 
 * 用户信息存在 展示购物车页面
 * 用户信息不存在 跳转至 login 页面
 */


class AuthRoute extends Component {

    componentDidMount () {
        let userid = JSON.parse( cookie.get( 'USER' ) ).userId;
        // 检查用户是否已经登录
        myGet( "/user/" + userid ).then( ( response ) => {
            if ( response.code === 0 && !response.login  ) {
                this.props.history.push( "/login" );
                return;
            }
        })
    }

    render ( ) {
        return null;
    }
}

export default withRouter( AuthRoute );