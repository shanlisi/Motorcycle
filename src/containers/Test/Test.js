import React, {Component} from 'react';
import '../Login/Login.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPost, myGet, myDelete, myPut} from '../../api/index'

export default class Test extends Component {

    handleClick = () => {
        myPost('/login', {
            userName: 'shanlisi3', password: 19940319
        }).then(res => {
            console.log('登录', res);
        })
    };
    changeUserInfo = () => {
        myPut('/user', {
                userId: 3,
                userName: 'shanlisi3',
                phone: '手机号',
                sex: '性别',
                mail: '邮箱',
                desc: '简介',
                address: [],
                orderForms: []
            }
        ).then(res => {
            console.log('修改用户信息', res);
        })
    };
    getInfo = () => {
        myPost('/shoppingCart', {
            userId: 3,
            cartInfo: {
                productId: 1,
                name: '商品名',
                price: 9800,
                num: 1,
                typeModel: '亮蓝色'
            }
        }).then(res => {
            console.log('加入购物车', res);

        })
    };
    changeCart = () => {
        myPut('/shoppingCart', {
            userId: 3,
            cartInfo: {
                productId: 1,
                num: 1,
                typeModel: '亮蓝色'
            }
        }).then(res => {
            console.log(res);
        })
    };
    getCart = () => {
        myGet('/shoppingCart/3').then(res => {
            console.log('获取购物车信息', res);
        })
    };
    delCart = () => {
        myDelete('/shoppingCart', {
            userId: 3,
            cartInfo: {
                productId: 1,
                typeModel: '亮蓝色'
            }
        }).then(res => {
            console.log('删除购物车', res);
        })
    };

    constructor(){
        super();
        this.state={
            checked1:false,
            checked2:false,
            checked3:false,
            checked4:false
        }
    }
    handleChecked1=()=>{
        this.setState({
            checked1:!this.state.checked1
        })
    };
    handleChecked2=()=>{
        this.setState({
            checked2:!this.state.checked2
        })
    };
    handleChecked3=()=>{
        this.setState({
            checked3:!this.state.checked3
        })
    };
    handleChecked4=()=>{
        this.setState({
            checked4:!this.state.checked4
        })
    };
    handleCheckedAll=()=>{
        let flg=!(this.state.checked1&&this.state.checked2&&this.state.checked3&&this.state.checked4);
        this.setState({
            checked1:flg,
            checked2:flg,
            checked3:flg,
            checked4:flg
        })
    };
    render() {
        return (
            <div>
                <MyHeader showBack={true} title="测试"/>
                <div className='my-container'>
                    <div>
                        <button onClick={this.handleClick}>登录</button>
                        <br/>
                        <button onClick={this.getInfo}>加入购物车-》修改购物车</button>
                        <br/>
                        <button onClick={this.getCart}>获取购物车信息</button>
                        <br/>
                        <button onClick={this.changeCart}>修改购物车</button>
                        <br/>
                        <button onClick={this.delCart}>删除</button>
                        <br/>
                        <button onClick={this.changeUserInfo}>修改用户信息</button>
                        <br/>
                        <button onClick={()=>{
                            myGet('/user/3').then(res=>{
                                console.log('获取用户信息',res);})
                        }}>获取</button>


                    </div>

                    <br/>
                    <hr/>
                   <div>

                       <input type="checkbox" checked={this.state.checked1} onClick={this.handleChecked1}/>商品1 <br/>
                       <input type="checkbox" checked={this.state.checked2} onClick={this.handleChecked2}/>商品2 <br/>
                       <input type="checkbox" checked={this.state.checked3} onClick={this.handleChecked3}/>商品3 <br/>
                       <input type="checkbox" checked={this.state.checked4} onClick={this.handleChecked4}/>商品4 <br/>
                       <hr/>
                       <input type="checkbox" checked={(this.state.checked1&&this.state.checked2&&this.state.checked3&&this.state.checked4) } onClick={this.handleCheckedAll}/>全选 <br/>
                   </div>
                </div>
            </div>
        )
    }
}
