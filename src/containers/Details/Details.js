import React,{Component} from 'react';

import { myGet } from "./../../api/index"
import MyHeader from "../../components/MyHeader/MyHeader";
import Slider from "./slider/slider"

import './Details.less'


class Details extends Component { 
    constructor ( props ) {
        super( props );
        this.state = {
            productDetail: {
                id: "",
                name: "",
                price: 0,
                soldNum: 0,
                date: "",
                swiperImages: [],
                descImages: [],
                seller: {
                    name: "",
                    location: "",
                    favorableRate: ""
                },
                typeModel: {
                    color: []
                },
                inventory: 0,
            }
            
        }
    }
    
    componentDidMount () {
    	let productId = this.props.match.params.id;
        myGet( "/productDetail/" + productId ).then( ( response ) => {
            if ( response.code === 0 ) {
                this.setState({
                    ...this.state,
                    productDetail: response.product
                })
            }
        })
    }

    render(){

        return   (    
                    <div>

                        <MyHeader showBack={true} title="商品详情"/>

                        <div className='my-container product-detail'>

                            <div className="product-img">

                                {/* 商品详情页轮播图  */}
                                <Slider sliders={ this.state.productDetail.swiperImages } />
                            </div>

                            <div className="product-info">
                                <h4 className="product-name"> { this.state.productDetail.name } </h4>
                                <p className="product-price"> ￥{ this.state.productDetail.price } </p>
                                <p className="selled-amount"> 已售 { this.state.productDetail.soldNum } </p>
                                <p className="add-time"> <i>上架时间：</i> { this.state.productDetail.date } </p>
                                <p className="notice"> <i>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示：</i> 在线支付定金或全款由牛魔王担保 </p>
                            </div>

                            <div className="seller-area">
                                <div className="seller-info">
                                    <h4 className="seller-name"> { this.state.productDetail.seller.name } <span className="">好评率：<i> { this.state.productDetail.seller.favorableRate } </i></span>  </h4>
                                    <p className="seller-address"> 所在地：{ this.state.productDetail.seller.location } </p>
                                </div>
                                <div className="btn-group">
                                    <button type="button"  className="contact">联系卖家</button>
                                    <button type="button" className="enter-shop">进入店铺</button>
                                </div>
                            </div>
                            
                            <div className="pruduct-desc">
                                <h4 className="desc-title">商品详情</h4>
                                <div className="desc-content">
                                    { 
                                        this.state.productDetail.descImages.map( ( item, index ) => {
                                            return (
                                                <img key={ index } src={ item }/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            
                            <div className="footer-tab">
                                <div className="cart-icon">
                                    
                                </div>
                                <div className="add-cart-btn">加入购物车</div>
                                <div className="buy-btn">立即购买</div>
                            </div>
                        </div>
                    </div>
                )
    }
}

export default Details;