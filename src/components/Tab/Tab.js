import React, {Component} from 'react';
import './Tab.less';
import {NavLink} from 'react-router-dom'
import cookie from '../../containers/App/cookie';



export default class Tab extends Component{
    handleClick=(e)=>{

        let coo=cookie.get('USER');
        let a=1;
        if(coo){
            // console.log(1);
            a=0
        }else{
            // console.log(2);
            a=1;
        }
        if(a===0){
            window.location.href='http://localhost:8555/#/mine';
        }else{
            // console.log(3);
            e.preventDefault();
            window.location.href='http://localhost:8555/#/login';
        }
    };
    render(){
        return (
            <div className='my-tab'>
                <NavLink to='/' exact>  <i className='iconfont  icon-createtask_fill'></i>  <span>资讯</span> </NavLink>
                <NavLink to='/list'>  <i className='iconfont  icon-gouwuche'></i><span>商城</span></NavLink>
                <NavLink to='/shoppingCart'><i className='iconfont  icon-ft-motorcycle'></i><span>购物车</span></NavLink>
                <NavLink to='/mine' onClick={this.handleClick}><i className='iconfont  icon-personal-copy'></i><span>我的</span></NavLink>
            </div>
        )
    }
};
