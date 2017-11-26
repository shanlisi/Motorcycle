import React,{Component} from 'react';
import './SignUp.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {Link} from 'react-router-dom';
import {myPost} from '../../api/index';
export default class SignUp extends Component{
    constructor(){
        super();
        this.state={num:'',username:false,password:false,phone:false,blur:false,name:'',pass:'',tel:''}
    };
    componentWillMount(){
        this.photo();
    }
    username=(e)=>{
        let reg=/[^\u4e00-\u9fa5_a-zA-Z0-9]+/g;
        let str=e.target.value;
        if(str.length<3||str.length>8){
            username.className="iconfont icon-cuowu";
            username.style.color="red";
            console.log('err');
            this.setState({username:false});
        }else if(str.match(reg)){
            username.className="iconfont icon-cuowu";
            username.style.color="red";
            console.log('err2');
            this.setState({username:false});
        }else{
            username.className="iconfont icon-gou";
            username.style.color="green";
            this.setState({username:true,name:e.target.value});
        }
    };
    password=(e)=>{
        let reg=/[^a-zA-Z0-9]+/g;
        let str=e.target.value;
        if(str.length<6||str.length>10){
            password.className="iconfont icon-cuowu";
            password.style.color="red";
            console.log('err');
            this.setState({password:false});
        }else if(str.match(reg)){
            password.className="iconfont icon-cuowu";
            password.style.color="red";
            console.log('err2');
            this.setState({password:false});
        }else{
            password.className="iconfont icon-gou";
            password.style.color="green";
            this.setState({password:true,pass:e.target.value});
        }
    };
    phone=(e)=>{
        let reg=/^1(3|4|5|7|8)\d{9}$/g;
        let str=e.target.value;
        if(str.length!==11){
            phone.className="iconfont icon-cuowu";
            phone.style.color="red";
            console.log('err');
            this.setState({phone:false});
        }else if(!reg.test(str)){
            phone.className="iconfont icon-cuowu";
            phone.style.color="red";
            console.log('err2');
            this.setState({phone:false});
        }else{
            phone.className="iconfont icon-gou";
            phone.style.color="green";
            this.setState({phone:true,tel:e.target.value});
        }
    };
    photo=()=>{
      let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let content='';
        for (let i = 0; i < 4; i++) {
            let num=Math.round(Math.random()*61);
            content+=str.substring(num,num+1);
        }
        this.setState({num:content});
    };
    blur=(e)=>{
        if(e.target.value==this.state.num){
            this.setState({blur:true});
      }else{
          //alert('您的验证码输入有误，请重新输入');
            this.setState({blur:false});
      }
    };
    summit=()=>{
        if(this.state.username&&this.state.password&&this.state.phone&&this.state.blur){
            let user=this.state.name,
                pass=this.state.pass,
                tel=this.state.tel;

            myPost('/signUp',{
                userName:user,
                password:pass,
                phone:tel
            }).then(res=>{
                if(res.code==0){
                    this.props.history.push('/login');
                }else{
                    alert(res.error+'请换一个再试！');
                    this.photo();
                }
            })
        }else{
            alert('您输入的信息不正确，请重新输入！');
            this.photo();
        }
    };
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="注册"/>
                <div className='my-container signup'>
                    <div className="content">
                        <div className="user">
                            <span>用户名</span>
                            <input type="text" placeholder="支持3-8位字母汉字数字" onChange={this.username}/>
                            <i id="username"></i>
                        </div>
                        <div className="user">
                            <span>密码</span>
                            <input type="text" placeholder="支持6-10位数字或字母" onChange={this.password}/>
                            <i id="password"></i>
                        </div>
                        <div className="user">
                            <span>手机号</span>
                            <input type="text" placeholder="支持11位大陆手机号" onChange={this.phone}/>
                            <i id="phone"></i>
                        </div>
                        <div className="verify">
                            <span>验证码</span>
                            <input type="text" placeholder="请输入验证码" onBlur={this.blur}/>
                            <div className="photo" id="photo" onClick={this.photo} >{this.state.num}</div>
                        </div>
                        <div className="submit" onClick={this.summit}>注册</div>
                        <p>Motorcycle会遵守<a href="https://render.alipay.com/p/f/fd-iztow1fi/index.html">《用户服务协议》</a></p>
                        <p>保证您的信息安全</p>
                        <p>已拥有Motorcycle账号？<Link to="/login">直接登录</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}