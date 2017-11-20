import React,{Component} from 'react';
import axios from "axios";

import MyHeader from "../../components/MyHeader/MyHeader";


import data from "./../../util/mock"
import './Details.less'


class Details extends Component { 
    constructor ( props ) {
        super( props );
        this.state = {
            id: 0,
            productName: "",
            productPrice: 0,
            selledAmount: 0,
            addTime: "",
            pictures: "",
            desc: "",
            seller: "",
            typeModel: [],
            inventory: 0,
            sellerAddress: ""
        }
    }   
    
    componentDidMount () {
        axios.get( "http://g.cn" ).then( ( response ) => {
            console.log( response.data );
            if ( response.status === 200 ) {
                this.setState({
                    id: response.data.id,
                    productName:response.data.productName,
                    productPrice: response.data.productPrice,
                    selledAmount: response.data.selledAmount,
                    addTime: response.data.addTime,
                    pictures: response.data.pictures,
                    desc: response.data.desc,
                    seller: response.data.seller,
                    typeModel: response.data.typeModel,
                    inventory: response.data.inventory,
                    sellerAddress: response.data.sellerAddress
                })
            }
        })
    }

    render(){
        return (
            <div>
                <MyHeader showBack={true} title="商品详情"/>
                <div className='my-container product-detail'>
                    <div className="product-img">
                        <img src={ this.state.pictures } alt="商品图片"/>
                    </div>
                    <div className="product-info">
                        <h4 className="product-name"> { this.state.productName } </h4>
                        <p className="product-price"> ￥{ this.state.productPrice } </p>
                        <p className="selled-amount"> 已售 { this.state.selledAmount } </p>
                        <p className="add-time"> <i>上架时间：</i> { this.state.addTime } </p>
                        <p className="notice"> <i>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：</i> 在线支付定金或全款由牛魔王担保 </p>
                    </div>
                    <div className="seller-area">
                        <div className="seller-info">
                            <h4 className="seller-name"> { this.state.seller } <span className="">好评率：100%</span>  </h4>
                            <p className="seller-address"> { this.state.sellerAddress } </p>
                        </div>
                        <div className="btn-group">
                            <button className="contact">联系卖家</button>
                            <button className="enter-shop">进入店铺</button>
                        </div>
                    </div>
                    <div className="pruduct-desc">
                        { this.state.desc }
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;