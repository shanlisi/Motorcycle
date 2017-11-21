import React,{Component} from 'react';
import './Login.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPost} from '../../api/index'

export default class Login extends Component{

    handleClick=()=>{
        myPost('/signup',{userName:'shanlisi2',password:19940319
        }).then(res=>{
            console.log(res,typeof res);})
    };
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="登录"/>
                <div className='my-container'>
                    登录





                    <button onClick={this.handleClick}>点击</button>
                </div>
            </div>
        )
    }
}
