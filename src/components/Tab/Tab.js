import React,{Component} from 'react';
import './Tab.less';
import {NavLink} from 'react-router-dom'
import cookie from '../../containers/App/cookie';
export default class Tab extends Component{
    render(){
        return (
            <div className='my-tab'>
                <NavLink to='/' exact>  <i className='iconfont  icon-createtask_fill'></i>  <span>资讯</span> </NavLink>
                <NavLink to='/list'>  <i className='iconfont  icon-gouwuche'></i><span>商城</span></NavLink>
                <NavLink to='/shoppingCart'><i className='iconfont  icon-ft-motorcycle'></i><span>购物车</span></NavLink>
                <NavLink to='/mine'><i className='iconfont  icon-personal-copy'></i><span>我的</span></NavLink>
            </div>
        )
    }
}
