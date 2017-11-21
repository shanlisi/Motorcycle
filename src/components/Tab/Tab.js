import React,{Component} from 'react';
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
                <NavLink to='/' exact>资讯</NavLink>
                <NavLink to='/list'>商城</NavLink>
                <NavLink to='/shoppingCart'>购物车</NavLink>
                <NavLink to='/mine' onClick={this.handleClick}>我的</NavLink>
            </div>
        )
    }
}
