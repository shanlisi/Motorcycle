import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from './cookie';
import './Login.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPost} from '../../api/index';
export default class Login extends Component{
    logon=()=>{
        /*$.ajax({
            url:'',
            type:'post',
            data:{
                user:username.value,
                pass:password.value
            },
            success(result){
                console.log(result);
            }
        });*/
        myPost('/login',{
            userName:username.value,
            password:password.value
        }).then(res=>{
            if(res.code==0){
                /*window.location.href='http://localhost:8555/#/';*/
                this.props.history.goBack();
                cookie.set("USER",JSON.stringify(res));
            }else if(res.code==1){
                alert(res.error);
            }
        });

    };
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="登录"/>
                <div className='my-container login'>
                    <div className="content">
                        <div className="pic">
                            <img src="http://localhost:3000/public/images/productList/list-id-4.jpg" alt=""/>
                        </div>
                        <div className="input">
                            <span>用户名：</span>
                            <input type="text" placeholder="请输入用户名/手机号" id="username"/>
                        </div>
                        <div className="input">
                            <span>密码：</span>
                            <input type="password" placeholder="请输入密码" id="password"/>
                        </div>
                        <div className="button" onClick={this.logon}>登录</div>
                        <div className="signup">
                            <span className="text">还没有牛摩网账号？</span>
                            <Link to="/signup" className="free">免费注册</Link>
                            <a className="forget">忘记密码</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
