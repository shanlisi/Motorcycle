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
        myGet('/user/3').then(res=>{
            console.log('获取用户信息',res);
            res.userInfo.desc='我要上头条~~~~~~~~~';
            res.userInfo.userId=22;
            myPut('/user',res.userInfo).then(res=>{
                console.log('修改后',res);
            })

        })
    };
    logout=()=>{
        myGet('/logout').then(res=>{
            console.log('退出',res);
        })
    };
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="测试"/>
                <div className='my-container'>

                    <button onClick={this.handleClick}>登录</button>
                    <br/>
                    <button onClick={this.getInfo}>获取个人信息</button>
                    <br/>
                    <button onClick={this.logout}>退出</button>
                </div>
            </div>
        )
    }
}
