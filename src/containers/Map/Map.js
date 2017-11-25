import React, {Component} from 'react';
import './Map.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
import cookie from  '../App/cookie'
import {myGet} from '../../api/index'
export default class Map extends Component {
    constructor() {
        super();
        // this.state = {
        //     userId: '',
        //     address: ''
        // }
        this.state = {
            user: JSON.parse(cookie.get('USER')),
            userInfo: {}
        };
    }

    handleTack = () => {
        let userID = JSON.parse(cookie.get('USER')).userId;
        if (userID) {
            myGet('/user/' + userID).then(res => {
                if (res.code == 0 && res.login) {
                    this.setState({userInfo: res.userInfo});
                }else {
                    window.location.href = 'http://localhost:8555/#/login';
                    alert(res.error);
                }
            });
        } else {
            window.location.href = 'http://localhost:8555/#/login';
        }
    };

    componentDidMount() {
        this. handleTack();
        let info = {};
        if (this.props.location.params) {
            info = this.props.location.params.userinfo;
        } else {
            return;
        }
        this.setState({
            userName: info.userName,
            address: info.address
        });
    }

    render() {
        return (
            <div className="map-bg">
                <MyHeader showBack={true} title="收获地址"/>
                <div className='my-container'>
                    <div className="map-add">
                        {this.state.address && this.state.address.length !== 0 ?
                            <div className="map-ind">
                                <div className="map-ind-t">
                                    <span>{this.state.address[0]}</span>
                                    <span>{this.state.address[1]}</span>
                                </div>
                                <div className="map-ind-b">{this.state.address[2]}</div>
                                <Link to={{
                                    pathname: `/add`,
                                    state: 'hello',
                                    params: {useradd: this.state.userInfo}
                                }} onClick={this.handleTack}>
                                    <div className="map-ind-T">修改地址</div>
                                </Link>
                            </div>

                            :
                            <div className="map-n">
                                <p className="map-ind-t">暂无相关内容</p>
                                <Link to={{
                                    pathname: `/add`,
                                    state: 'hello',
                                    params: {useradd: this.state.userInfo}
                                }} onClick={this.handleTack}>
                                    <div className="map-ind-b">添加新地址</div>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

