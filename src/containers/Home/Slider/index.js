import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import './index.less';

export default class Slider extends Component{
    constructor(){
        super();
        this.state={index:0};
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
                    this.props.sliders.length>0?
                        <ReactSwipe className="carousel" swipeOptions={swipeOptions}>
                            {
                                this.props.sliders.map((item,index)=>(
                                    <div key={index}>
                                        <img src={item}/>
                                    </div>
                                ))
                            }
                        </ReactSwipe>:null
                }
                <div className="dots">
                    {
                        this.props.sliders.map((item,index)=>(
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