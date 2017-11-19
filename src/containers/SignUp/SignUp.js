import React,{Component} from 'react';
import './SignUp.less'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class SignUp extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="注册"/>
                <div className='my-container'>
                    注册
                </div>
            </div>
        )
    }
}
