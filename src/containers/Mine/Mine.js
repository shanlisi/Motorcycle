import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './Mine.less';
import MyHeader from "../../components/MyHeader/MyHeader";
import cookie from '../App/cookie'
import {myGet} from '../../api/index'
import LoadPicture from "../../components/LoadPicture/index";

export default class Mine extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(cookie.get('USER')),
            userInfo: {}
        };
    }
    componentWillMount(){
        if(!JSON.parse(cookie.get('USER'))){
            this.props.history.push('/login');
        }else{
            this.handleTack();
        }

    }
    handleOut = () => {
        myGet('/logout').then(res=>{
            if(res.code==1){alert('退出失败，请重试')}
        });
        cookie.remove('USER')

    };
    handleTack = () => {
        let userID = JSON.parse(cookie.get('USER')).userId;
        if (userID) {
            myGet('/user/' + userID).then(res => {
                if (res.code == 0 && res.login) {
                    this.setState({userInfo: res.userInfo});
                } else {
                    console.log(res.error);
                }
            });
        } else {
            this.props.history.push('/login')
        }
    };

    changeUserInfo=(userInfo)=>{
        this.setState({userInfo})
    };
    render() {
        return (
            <div className="mine-bg">
                <MyHeader showBack={true} title="个人中心"/>
                <div className='my-container'>
                    <div className="mine-header">
                        <div className="mine-left">
                            <LoadPicture/>
                            {/*<img src={require('../../images/mine-header.jpg')}/>*/}
                            <span>点击图片</span>
                        </div>
                        <div className="mine-cen">
                            <p>{this.state.userInfo.userName ? this.state.userInfo.userName : "登录"}</p>
                            <div>个人</div>
                            <span>头衔：新兵</span>
                            <span>积分：2分</span>
                        </div>
                        <div className="mine-right">
                            <Link to='/login' className="mine-out" onClick={this.handleOut}
                            >退出</Link>
                        </div>

                    </div>
                    <ul className="mine-nav">
                        <li>
                            <Link to="/shoppingCart">
                                <i className="iconfont icon-gouwuche"></i>
                                <span>我的购物车</span>
                                <i className="iconfont icon-arrow-right"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to={{
                                pathname: `/sub`,
                                state: 'hello',
                                params: {userinfo: this.state.userInfo}
                            }} onClick={this.handleTack}>
                                <i className="iconfont icon-dingdan"></i>
                                <span>我的订单</span>
                                <i className="iconfont icon-arrow-right"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to={{
                                pathname: `/map`,
                                userInfo: this.state.userInfo
                            }} onClick={this.handleTack}>
                                <i className="iconfont icon-dizhi"></i>
                                <span>收货地址</span>
                                <i className="iconfont icon-arrow-right"></i>
                            </Link>
                        </li>
                        <li>

                            <Link to={{
                                pathname: `/profile`,
                                changeUserInfo: this.changeUserInfo,
                                params: {userinfo: this.state.userInfo}
                            }} onClick={this.handleTack}>
                                <i className="iconfont icon-ziliao"></i>
                                <span>我的资料</span>
                                <i className="iconfont icon-arrow-right"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
