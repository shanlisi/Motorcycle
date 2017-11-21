import React,{Component} from 'react';

import './ShoppingCart.less'

import MyHeader from "../../components/MyHeader/MyHeader";


export default class ShoppingCart extends Component {

    constructor ( props ) {
        super( props);
        this.state = {
            amount: 0
        }

        this.addHandle = this.addHandle.bind( this );
        this.minusHandle = this.minusHandle.bind( this );
    }
    addHandle () {
        this.setState ({
            amount: this.state.amount + 1
        })
    }
    minusHandle () {
        if ( this.state.amount < 1 ) {
            return;
        }
        this.setState({
            amount: this.state.amount - 1
        })
    }

    render(){
        return (
            <div>
                <MyHeader showBack={true} title="购物车"/>
                <div className='my-container shop-cart-container'>
                    {
                        <ul className="shop-cart">
                            <li className="cart-item">
                                <h4 className="item-name"> 牛魔王官方旗舰店 </h4>
                                <div className="item-body">
                                    <div className="selected">
                                        <input type="checkbox"/>
                                    </div>
                                    <div className="item-img">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="item-body-content">
                                        <p>新大洲本田战神150l 11月购车均可享受晒单有礼，线上线下优惠同步享受</p>
                                        <p className="type">颜色：黑色</p>
                                        <div className="counter">
                                            <button onClick={ this.minusHandle }>-</button>
                                            <input type="text" value={this.state.amount}/>
                                            <button onClick={ this.addHandle }>+</button>
                                        </div>
                                        <span className="delete-icon">删除</span>
                                    </div>
                                </div>
                                <div className="item-footer">
                                    <span>小计：<strong>￥100800</strong> 元</span>
                                    <span>应付定金：<strong>￥100800</strong> 元</span>
                                </div>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        )
    }
}