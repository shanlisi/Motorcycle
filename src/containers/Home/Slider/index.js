import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import './index.less';
import {myGet} from '../../../api/index';

export default class Slider extends Component{
    constructor(){
        super();
        this.state={
            swipers:[],
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
            callback:(index)=>{
                this.setState({index})
            }
        };
        return(
            <div className="carousel-wrapper">
                {
                         this.state.swipers.length>0?
                         <ReactSwipe className="carousel" swipeOptions={swipeOptions}>
                            {
                                this.state.swipers.map((item,index)=>(
                                <a key={index} href={item.url}>
                                    <div >
                                        <img src={item.image}/>
                                        <div className="title">
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                </a>
                                ))
                            }
                            </ReactSwipe>:null

                }

                <div className="dots">
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