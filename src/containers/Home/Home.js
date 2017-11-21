import React,{Component} from 'react';
import './Home.less'
import MyHeader from "../../components/MyHeader/MyHeader";
export default class Home extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={false} title="资讯"/>
                <div className='my-container'>
                    首页
                </div>
            </div>
        )
    }
}
