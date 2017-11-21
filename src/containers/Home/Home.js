import React,{Component} from 'react';
import './Home.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import Slider from "./Slider/index";


export default class Home extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={false} title="资讯"/>
                <div className='my-container'>
                    <Slider/>
                </div>
            </div>
        )
    }
}
