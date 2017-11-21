import React,{Component} from 'react';
import './Home.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import Slider from "./Slider/index";

let sliders_mock=[
    "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=110436165,3437039840&fm=173&s=F0531E9C4282F11FF01A8441030070FB&w=218&h=146&img.JPEG", "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3448605246,2806025535&fm=173&s=BA83B1440E062C511E7D011A01001093&w=218&h=146&img.JPEG", "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3559375182,2872124471&fm=173&s=588627D00E600E151A1C68120300E0D2&w=218&h=146&img.JPEG"
]
export default class Home extends Component{
    render(){
        return (
            <div>
                <MyHeader showBack={false} title="资讯"/>
                <div className='my-container'>
                    <Slider sliders={sliders_mock}/>
                </div>
            </div>
        )
    }
}
