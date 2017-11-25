import React, {Component} from 'react';
import './Profile.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPut} from '../../api/index';
export default class Profile extends Component {
    constructor(){
        super();
        this.state={
            userId:'',
                userName:'',
                phone:'',
                mail:'',
                desc:'',
                isSex:true,
                sex:'man'
        }
    }

    handleClick=()=>{
        myPut('/user',{
            ...this.state
        }).then(result=>{
            if(result.code==0){
                this.props.location.changeUserInfo(result.userInfo);
                this.props.history.push('/mine')

            }else{
                alert('修改失败');
            }
        })
    };
    click=(e)=>{
        if(e.target.id=="man"){
            this.setState({
                sex:"man",
                isSex:true
            })
        }else if(e.target.id=="woman"){
            this.setState({
                sex:"woman",
                isSex:false
            })
        }
    };
    componentWillMount(){
        let info={};
        if(this.props.location.params){
            info=this.props.location.params.userinfo;
        }else{
            return;
        }
        this.setState({...info});
    }

    render() {
        return (
            <div className="profile-bg">
                <MyHeader showBack={true} title="我的资料"/>
                <div className='my-container'>

                    <div className="profile-top">
                        <div>
                            <label htmlFor="">
                                用户名
                            </label>
                            <input type="text"  placeholder="用户名" value={this.state.userName}
                                   onChange={(e)=>this.setState({userName:e.target.value})}/>
                        </div>
                        <span className="pro-sex">
                            <form>
                                性别
                            </form>
                            <label >
                               男<input name="sex" type="radio" defaultChecked={this.state.isSex} onClick={(e)=>this.click(e)} id="man"/>
                            </label>
                            <label >
                                女<input name="sex" type="radio" defaultChecked={!this.state.isSex} onClick={(e)=>this.click(e)} id="woman"/>
                            </label>
                        </span>
                        <div>
                            <label htmlFor="">
                                手机号
                            </label>
                            <input type="text" placeholder="请输入手机号码" value={this.state.phone}
                                   onChange={(e)=>this.setState({phone:e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="">
                                邮箱
                            </label>
                            <input type="text" placeholder="请输入邮箱" value={this.state.mail}
                                   onChange={(e)=>this.setState({mail:e.target.value})}/>
                        </div>
                        <div className="pro-ind">
                            <label >个人简介</label>
                            <input type="text" value={this.state.desc} placeholder="请输入你的介绍" onChange={(e)=>{this.setState({desc:e.target.value})}}></input>
                        </div>
                    </div>
                    <div className="profile-btn">
                            <button onClick={this.handleClick}>
                                保存
                            </button>
                    </div>

                </div>
            </div>
        )
    }
}

