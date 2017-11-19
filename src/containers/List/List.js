import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './List.less'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class List extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="商城"/>
                <div className='my-container'>
                    列表页 <br/>
                    <Link to="/details">商品详情</Link>
                </div>
            </div>
        )
    }
}
