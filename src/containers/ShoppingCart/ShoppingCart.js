import React,{Component} from 'react';
import './ShoppingCart.less'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class ShoppingCart extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="购物车"/>
                <div className='my-container'>
                    购物车
                </div>
            </div>
        )
    }
}
