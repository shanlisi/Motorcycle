import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

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
            this.setState( { isShow: false } );

            if( this.props.redirectTo ){
                this.props.history.push('/login')
            }

        }, 2000);
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
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

export default withRouter( ToolTip );
