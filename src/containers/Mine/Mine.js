import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './Mine.less';
import MyHeader from "../../components/MyHeader/MyHeader";
import cookie from  '../App/cookie'
export default class Mine extends Component {
    constructor() {
        super();
        //this.state = {user: JSON.parse(cookie.get('USER'))};
        this.state = {user: []};
    }

    handleOut = () => {
        cookie.remove('USER')
    };
    handleTack=()=>{

    };

    render() {
        return (
            <div className="mine-bg">
                <MyHeader showBack={true} title="个人中心"/>
                <div className='my-container'>
                    <div className="mine-header">
                        <div className="mine-left">
                            <img src={require('../../images/mine-header.jpg')}/>
                            <span>未认证</span>
                        </div>
                        <div className="mine-cen">
                            <p>{this.state.user.user ? this.state.user.user : "登录"}</p>
                            <div>个人</div>
                            <span>头衔：新兵</span>
                            <span>积分：2分</span>
                        </div>
                        <div className="mine-right">
                            <Link to='/login' className="mine-out"
                                  onClick={this.handleOut}>退出</Link>

                            <Link to='/profile' className="mine-pro" onClick={this.handleTack}>
                                <i className="iconfont icon-arrow_right_icon"></i>
                            </Link>
                        </div>

                    </div>
                    <ul className="mine-nav">
                        <li>
                            <Link to="/shoppingCart">
                                <i className="iconfont icon-iconcart"></i>
                                <span>我的购物车</span>
                                <i className="iconfont icon-icon-arrow-right"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/sub">
                                <i className="iconfont icon-iconfontdizhi2"></i>
                                <span>我的订单</span>
                                <i className="iconfont icon-icon-arrow-right"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/map">
                                <i className="iconfont icon-icon_lingdang"></i>
                                <span>收获地址</span>
                                <i className="iconfont icon-icon-arrow-right"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile">
                                <i className="iconfont icon-iconfontgerenziliao"></i>
                                <span>我的资料</span>
                                <i className="iconfont icon-icon-arrow-right"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
