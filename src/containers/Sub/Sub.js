import React, {Component} from 'react';
import './Sub.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPut} from '../../api/index';
export default class Sub extends Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            orderForms: '',
        }
    }

    componentDidMount() {
        let info = {};
        if (this.props.location.params) {
            info = this.props.location.params.userinfo;
        } else {
            return;
        }
        this.setState({
            userId: info.userId,
            orderForms: info.orderForms
        });
    }

    // [{"productId":1,"name":"商品名","price":9800,"num":3,"typeModel":"白色"}];
    render() {
        return (
            <div className="sub-bg">
                <MyHeader showBack={true} title="我的订单"/>
                <div className='my-container'>

                    <div className="sub-add">
                        {this.state.orderForms && this.state.orderForms.length !== 0 ?
                            <div className="sub-ind">
                                <div className="sub-left">
                                    <img src="" alt=""/>
                                </div>
                                <div className="sub-cen">
                                    {this.state.orderForms[0].name}
                                </div>
                                <div className="sub-right">
                                    <span>${this.state.orderForms[0].price}</span>
                                    <span>{this.state.orderForms[0].typeModel}</span>
                                    <span>x{this.state.orderForms[0].num}</span>
                                </div>
                            </div>
                            // this.state.orderForm.map((item,index)=>(
                            //     <div className="sub-ind">
                            //         <div className="sub-left">
                            //             <img src="" alt=""/>
                            //         </div>
                            //         <div className="sub-cen">
                            //             {item.name}
                            //         </div>
                            //         <div className="sub-right">
                            //             <span>${item.price}</span>
                            //             <span>{item.typeModel}</span>
                            //             <span>x{item.num}</span>
                            //         </div>
                            //     </div>
                            // ))
                            :
                            <div className="sub-n">

                                <p className="sub-ind-t">没有订单，快去购买吧~</p>
                                <Link to='/list'>
                                    <div className="sub-ind-b">购买</div>
                                </Link>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

