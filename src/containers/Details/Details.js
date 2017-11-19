import React,{Component} from 'react';
import './Details.less'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class Details extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={true} title="商品详情"/>
                <div className='my-container'>
                    商品详情
                </div>
            </div>
        )
    }
}
