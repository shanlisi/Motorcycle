import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

import "./slider.less"


export default class Slider extends Component {
    constructor () {
        super();
        this.state = { index: 0 };
    }
    render () {
        const options = {
            continuous: true,
            auto: 2000,
            callback: ( index ) => {
                this.setState({ index })
            }
        };
        return (
            <div className="carousel-wrapper">
                {
                    this.props.sliders.length > 0
                    ?   <ReactSwipe className="carousel" swipeOptions={options}>
                            {
                                this.props.sliders.map( ( item, index ) => {
                                    return <div key={index}> <img src={ item } /></div>
                                })
                            }
                        </ReactSwipe>
                    :   null
                }
                <div className="dots">
                    {
                        this.props.sliders.map( ( item, index ) => {
                            return ( 
                                <span
                                    key={index} 
                                    className={ index === this.state.index ? "active": ""}
                                ></span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}