import React, { Component } from 'react';

import "./tooltip.less"

/**
 * 消息短语提示
 */

class ToolTip extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            isShow: true
        }
    }
    componentDidMount () {
        this.timer = setTimeout( () => {
            this.setState( { isShow: false } )
        }, 1500);
    }
    render () {
        return (
            <div className={ this.state.isShow ? "tool-tip-on" : "tool-tip-off" }>
                <span>
                    { this.props.msg }
                </span>
            </div>
        )
    }
}

export default ToolTip;