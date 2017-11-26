import React,{Component} from 'react';
import { Link }  from "react-router-dom"

import cookie from "./../App/cookie"
import { myGet, myPost } from "./../../api/index"
import MyHeader from "../../components/MyHeader/MyHeader";
import Slider from "./slider/slider"
import ToolTip from "./ToolTip/tooltip"
import SelectedPanel from "./SelectPanel/selectpanel";

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
            },

            // 默认用户已经登录
            isAuth: true,

            // 商品添加到购物车 成功 默认不成功 true 表示添加成功
            addedSuccess: false,

            // 商品添加到购物车失败 默认不失败 true 表示添加失败
            addedFailed: false,

            // 是否显示商品类型选择面板
            isSelectPanelShow: false,

        };
        this.addProductToCart = this.addProductToCart.bind( this );
        this.displaySelectPanel = this.displaySelectPanel.bind( this );
        this.closeSelectPanel = this.closeSelectPanel.bind( this );
    }

    closeSelectPanel ( event ) {
        if ( event.target.className === "cover" ) {
            this.setState( { isSelectPanelShow: !this.state.isSelectPanelShow } );
            this.container.style.overflowY = "scroll";
        }
    }
    
    // 显示商品类型选择面板
    displaySelectPanel () {
        this.setState( { isSelectPanelShow: !this.state.isSelectPanelShow } );
        this.container.style.overflowY = "hidden";
    }
    
    // 将当前展示的商品添加到当前登录用户的购物车
    addProductToCart ( type, amount ) {
        
        
        // 检查用户是否登录 cookie 不存在 或者 cookie 中登录状态为假
        if ( !JSON.parse( cookie.get( "USER" ) ) || JSON.parse( cookie.get( "USER" ) ).code !== 0 ) {
            console.log( "您还没有登录，请先登录" );

            // 用户认证为 false 表明用户没有登录
            this.setState( { isAuth: false } );
            return;
        }

        // 获取当前登录用户的购物车 数组
        let cart = this.getCartOfUser();
        let userId = JSON.parse( cookie.get( "USER" ) ).userId;

        // 添加至购物车的单条商品数据信息
        let data = { userId: userId, cartInfo: {
            productId: this.state.productDetail.id, 
            name: this.state.productDetail.name, 
            price: this.state.productDetail.price, 
            num: amount, 
            typeModel: type
        }}

        // 将当前商品添加到用户的购物车
        myPost( "/shoppingCart", data ).then( ( response ) => {

            console.log( response );

            // 商品添加成功 并且用户已经登录
            if ( response.code === 0 && response.login ) {
                this.setState( { addedSuccess: !this.state.addedSuccess, isSelectPanelShow: !this.state.isSelectPanelShow } )
            } 

            // 用户未登录
            else if ( response.code === 0 && !response.login ) {
                this.setState( { isAuth: false } );
            }
            else {
                this.setState( { addedFailed: !this.state.addedFailed, isSelectPanelShow: !this.state.isSelectPanelShow } )
            } 
        })
    }

    //  获取用户的购物车
    getCartOfUser () {
        let cart = [];
        myGet( "/shoppingCart/" + 4 ).then( ( response ) => {
            if ( response.code === 0 ) {
                cart = response.cartInfo 
            }
        })
        return cart;
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

                        <div className='my-container product-detail' ref={ el => this.container = el } >

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
                                <Link to="/shoppingCart" className="cart-icon">
                                    <i className="iconfont icon-gouwuche"></i>
                                    <span> 购物车 </span>
                                </Link>
                                <div className="add-cart-btn" onClick={ this.displaySelectPanel }>加入购物车</div>
                                <div className="buy-btn">立即购买</div>
                            </div>
                            {
                                this.state.isSelectPanelShow 
                                    ?   
                                        <div className="cover" onClick={ this.closeSelectPanel }>
                                            <SelectedPanel 
                                              colors={ this.state.productDetail.typeModel.color } 
                                                inventory={ this.state.productDetail.inventory } 
                                                addProductToCart={ this.addProductToCart }
                                            />
                                        </div>
                                    :   null
                            }
                            


                            { !this.state.isAuth ? <ToolTip msg="您还没有登录，请先登录" /> : null }

                            { this.state.addedSuccess ? <ToolTip msg="商品已经添加到购物车" /> : null }
                            {/* <ToolTip  msg="测试文字测试文字测试文字" /> */}
                        </div>
                    </div>
                )
    }
}

export default Details;