import React,{Component} from 'react';
import './Tab.less';
import {NavLink} from 'react-router-dom'
export default class Tab extends Component{
    render(){
        return (
            <div className='my-tab'>
                <NavLink to='/' exact>资讯</NavLink>
                <NavLink to='/list'>商城</NavLink>
                <NavLink to='/shoppingCart'>购物车</NavLink>
                <NavLink to='/mine'>我的</NavLink>
            </div>
        )
    }
}
