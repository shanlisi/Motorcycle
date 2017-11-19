import React,{Component} from 'react';
import './Login.less'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class Login extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="登录"/>
                <div className='my-container'>
                    登录
                </div>
            </div>
        )
    }
}
