import React, {Component} from 'react';
import './Profile.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class Profile extends Component {

    render() {
        return (
            <div className="profile-bg">
                <MyHeader showBack={true} title="我的资料"/>
                <div className='my-container'>

                    <div className="profile-top">
                        <div>
                            <label htmlFor="">
                                账号
                            </label>
                            <input type="text" placeholder="请输入账号"/>
                        </div>
                        <span className="pro-sex">
                            <form>
                                性别
                            </form>
                            <label >
                               男<input name="sex" type="radio"/>
                            </label>
                            <label >
                                女<input name="sex" type="radio"/>
                            </label>

                        </span>
                        <div>
                            <label htmlFor="">
                                手机号
                            </label>
                            <input type="password" placeholder="请输入手机号码"/>
                        </div>
                        <div>
                            <label htmlFor="">
                                邮箱
                            </label>
                            <input type="password" placeholder="请输入邮箱"/>
                        </div>
                        <div className="pro-ind">
                            <label >个人简介</label>
                            <textarea></textarea>

                        </div>
                    </div>
                    <div className="profile-btn">
                        <Link to="/mine">
                            <button onClick={this.handleClick}>
                                保存
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

