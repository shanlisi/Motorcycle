import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import './index.less';
import {myGet} from '../../../api/index';

export default class Slider extends Component{
    constructor(){
        super();
        this.state={
            swipers:[],
            startSlide :2
        };
    }
    componentDidMount(){
        myGet('/home/swipers').then(res=>{
            //console.log(res);
            if(res.code===0){
                this.setState({
                    ...this.state.swipers,
                    swipers:res.swipers
                })
            }
        })
    }
    render(){
        let swipeOptions={
            continuous:true,
            auto:1000,
            speed:600,
            startSlide :this.state.startSlide ,
            callback:(index)=>{
                this.setState({index})
            }
        };
        return(
            <div className="slider-wrapper">
                {
                         this.state.swipers.length>0?
                         <ReactSwipe className="carousel-slider" swipeOptions={swipeOptions}>
                            {
                                this.state.swipers.map((item,index)=>(
                                <a key={index} href={item.url}>
                                    <div className="slider-content">
                                        <img className="slider-img" src={item.image}/>
                                        <div className="title-bg">
                                            <p className="title-p">{item.title}</p>
                                        </div>
                                    </div>
                                </a>
                                ))
                            }
                            </ReactSwipe>:null

                }

                <div className="slider-dots">
                    {
                        this.state.swipers.map((item,index)=>(
                                <span
                                    key={index}
                                    className={this.state.index==index?'active':''}>
                                </span>
                        ))
                    }
                </div>
            </div>
        )
    }
}