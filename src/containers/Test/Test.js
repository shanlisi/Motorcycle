import React,{Component} from 'react';
import '../Login/Login.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPost,myGet,myDelete,myPut} from '../../api/index'

export default class Test extends Component{

    handleClick=()=>{
        myPost('/login',{userName:'shanlisi2',password:19940319
        }).then(res=>{
            console.log('登录',res);})
    };
    getInfo=()=>{
        myPost('/shoppingCart',{
            userId:3,
            cartInfo:{
            productId:1,
            name:'商品名',
            price:9800,
            num:1,
            typeModel:'亮蓝色'
        }
    }).then(res=>{
            console.log('加入购物车',res);
            myPut('/shoppingCart',{
                userId:3,
                cartInfo: {
                    productId: 1,
                    num: 3,
                    typeModel: '亮蓝色'
                }
            })
        })
    };
    logout=()=>{
        myGet('/shoppingCart/userId').then(res=>{
            console.log('获取购物车信息',res);
        })
    };
    delCart=()=>{
        myDelete('/shoppingCart',{
            userId:3,
            cartInfo: {
                productId: 1,
                typeModel: '亮蓝色'
            }
        }).then(res=>{
            console.log('删除购物车',res);
        })
    };
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="测试"/>
                <div className='my-container'>

                    <button onClick={this.handleClick}>登录</button>
                    <br/>
                    <button onClick={this.getInfo}>加入购物车-》修改购物车</button>
                    <br/>
                    <button onClick={this.logout}>获取购物车信息</button>
                    <button onClick={this.delCart}>获取购物车信息</button>
                </div>
            </div>
        )
    }
}
