import React, {Component} from 'react';
import './Map.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
import cookie from '../App/cookie'
import {myGet} from '../../api/index'

export default class Map extends Component {
    constructor() {
        super();
        this.state = {

            userInfo: {
                userId: '',
                userName: '',
                phone: '',
                sex: '',
                mail: '',
                desc: '',
                address: [],
                orderForms: [],
            }

        };
    }
    handleAddress=(address)=>{
        this.setState({
            userInfo:{...this.state.userInfo,address}
        })
    };

    handleTack = () => {
        let userId = JSON.parse( cookie.get( "USER" ) ).userId;
        if (userId) {
            myGet('/user/' + userId).then(res => {
                if (res.code == 0 && res.login) {
                    this.setState({userInfo: res.userInfo});
                } else {
                   this.props.history.push('/mine')
                }
            });
        } else {
            this.props.history.push('/login')
        }
    };


    componentDidMount() {
        if (this.props.userInfo) {
            this.setState({userInfo: this.props.userInfo})
        } else {
            this.handleTack();
        }
    }

    render() {
        return (
            <div className="map-bg">
                <MyHeader showBack={true} title="收获地址"/>
                <div className='my-container'>
                    <div className="map-add">
                        {this.state.userInfo.address.length > 0 ?
                            <div className="map-ind">
                                <div className="map-ind-t">
                                    {this.state.userInfo.address.map((item,index )=> (
                                        <div key={index}>
                                            <p>收件人：{item.man}</p>
                                            <p>联系电话：{item.phone}</p>
                                            <p>收获地址：{item.location}</p>
                                        </div>

                                    ))}
                                </div>
                                <Link to={{
                                    pathname: `/add`,
                                    params:'',
                                    state:{userInfo: this.state.userInfo,
                                        handleAddress:this.handleAddress}
                                }}>
                                    <div className="map-ind-T">修改地址</div>
                                </Link>
                            </div>

                            :
                            <div className="map-n">
                                <p className="map-ind-t">暂无相关内容</p>
                                <Link to={{
                                    pathname: `/add`,
                                    params:'',
                                    state:{handleAddress:this.handleAddress}
                                }}>
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

