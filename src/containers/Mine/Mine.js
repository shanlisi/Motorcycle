import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './Mine.less';
import MyHeader from "../../components/MyHeader/MyHeader";
export default class Mine extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="个人中心"/>
                <div className='my-container'>
                    李睿测试
                    个人中心 <br/>
                    <Link to="/login">登录</Link> <br/>
                    <Link to="/signup">注册</Link>
                </div>
            </div>
        )
    }
}
