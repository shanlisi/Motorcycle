import React, { Component } from 'react';

import './ShoppingCart.less'
import cookie from "./../App/cookie"

import MyHeader from "../../components/MyHeader/MyHeader";
import ToolTip from "./../Details/ToolTip/tooltip"

import { myGet, myDelete, myPost, myPut } from '../../api/index';



/**
 * 进入用户购物车页面 
 * 1 查看用户是否登录
 *      用户已经登录 获取用户的购物车
 *      用户没有登录 页面跳转至 login 页面
 * 2 获取用户购物车  将用户的购物车数据集保存到 组件的 state 中
 * 3 实现购物车中单个商品的 增 add 删 del 减 minus 
 *      以及 
 *      全选 allSelected 反选 invertSelected  单选 singleSelected 小计 subtotal 总计 totalPrice
 */
export default class ShoppingCart extends Component {

    constructor ( props ) {
        super( props);
        this.state = {

            // 用户信息
            userInfo: { userId: null },

            // 购物车
            /**
             *  name: "豪爵铃木GW250"     商品名称
             *  image: ""                商品图片
             *  num: 10                  商品购买数量
             *  price: 23880             商品价格 
             *  productId: "3"           商品 id
             *  typeModel: "冰川白"       商品类型
             *  isChecked: false         商品是否被选中 默认 false 表示没有被选中
             */
            cart: [],

            // 购物车是否拉取成功 默认成功
            cartSuccess: true,

            // 用户是否登录 默认用户已经登录
            isAuth: true,

            // 总价
            totalPrice: 0.00
        };

        this.del = this.del.bind( this) ;
        this.changeChecked = this.changeChecked.bind( this );
        this.switchAllSelected = this.switchAllSelected.bind( this );
        this.changeProductNumber = this.changeProductNumber.bind( this );
    }

    componentDidMount () {
        /**
         * 从 cookie 中获取用户登录信息 
         * 或者 cookie 中不存在 USER 字段 表明用户没有注册或者登录过
         * 存在 USER 字段 则取出用户的 id 
         */
        let userId = null;
        if ( JSON.parse( cookie.get( 'USER' ) )  ) {
            userId = JSON.parse( cookie.get( 'USER' ) ).userId;
        } else {
            this.setState( { isAuth: false } );
            return;
        }
        

        // 检查用户是否已经登录 从 session 中检查用户的登录状态
        myGet( "/user/" + userId ).then( ( response ) => {
            if ( response.code === 0 && !response.login  ) {
                this.setState( { isAuth: false } );
                return;
            }
        })


        // 将用户 id 保存至 state 
        this.setState( { userInfo: { userId: JSON.parse( cookie.get( 'USER' ) ).userId } } )

        
        /**
         * 根据用户 id 获取用户购物车信息
         * 对购物车中的每一条商品添加一个属性 isChecked, 初始为 false
         */
        myGet( "/shoppingCart/" + userId ).then( ( response ) => {

            console.log( response );

            if ( response.code === 0 && response.login ) {
                let initCart = response.cartInfo.map( ( item, index ) => {
                    item.isChecked = false;
                    return item;
                })
                this.setState( { cart: initCart } );
            } else {
                this.setState( { isAuth: false } );
            }
        })
    }

    /**
     * @description: 对商品数量执行 加 或 减 操作
     * @param {Number} id 
     * @param {String} type 
     * @param {String} action 
     */
    changeProductNumber ( id, type, action ) {
        let targetProduct = this.state.cart.filter( ( item ) => {
            return item.productId == id && item.typeModel == type ;
        });
        targetProduct = targetProduct[0];


        if ( action == "add" ) {
            targetProduct.num += 1;
        } else if ( action == "minus" ) {
            targetProduct.num -= 1;
        }  


        let changeNumData = { 
            userId: this.state.userInfo.userId, 
            cartInfo: {
                productId: targetProduct.productId,
                typeModel: targetProduct.typeModel,
                num: targetProduct.num
            }
        };

        myPut( "/shoppingcart", changeNumData ).then( ( response ) => {
            console.log( response );
            if ( response.code === 0 && response.login ) {
                let totalPrice = this.computedTotalPrice( this.state.cart );
                
                this.setState( { cart: [ ...this.state.cart, ...targetProduct ], totalPrice: totalPrice })
            } 
        });
    }


    // 删除商品
    del ( id, type ) {

        // 获取要删除的商品 在 cart 数组中的数组 继而使用 splice 来删除
        let delProductIndex = this.state.cart.findIndex( ( item, index ) => {
            return item.productId == id && item.typeModel == type;
        });

        let _newCart = this.state.cart;

        let delProduct = _newCart[delProductIndex];

        let delData = { userId: this.state.userInfo.userId, cartInfo: { productId: delProduct.productId, typeModel: delProduct.typeModel } };
        
        myDelete( "/shoppingCart", delData ).then( ( response ) => {

            if ( response.code === 0 && response.login ) {
                _newCart.splice( delProductIndex, 1 );
                
                let totalPrice = this.computedTotalPrice( _newCart );
                
                this.setState( { cart: _newCart, totalPrice: totalPrice } )
            }
        });
    }

    // 改变单个商品的选中状态 对商品的 isChecked 取反
    // 商品id 商品类型 商品在数组中对应索引
    changeChecked ( id, type, index ) {

        let _cart = this.state.cart;
        let _newCart = _cart.map( ( item, index ) => {
            if ( item.productId == id && item.typeModel == type ) {
                item.isChecked = !item.isChecked;
            }
            return item;
        });
         
        let totalPrice = this.computedTotalPrice( _newCart );
        this.setState( { cart: _newCart, totalPrice: totalPrice } );
    }
     

    // 切换全选 和 全不选
    switchAllSelected ( event ) {
        
        let _cart = this.state.cart;
        let _newCart = _cart.map( ( item, index ) => {
            item.isChecked = event.target.checked;
            return item;
        });
        
        let totalPrice = this.computedTotalPrice( _newCart );
        this.setState( { cart: _newCart, totalPrice: totalPrice } );
    }

    // 计算总价
    computedTotalPrice ( cart ) {
        // 取得购物车中商品 isChecked 为 true 的项
        let productsHasSelected = cart.filter( ( item, index ) => {
            return item.isChecked;
        });

        let totalPrice = 0;

        productsHasSelected.forEach( ( item ) => {
            totalPrice += ( item.num * item.price )
        })
        return totalPrice;
    }

    render(){
        return (
            <div>
                 
                <MyHeader showBack={true} title="购物车"/>

                { !this.state.isAuth ? <ToolTip msg="登陆后可以查看购物车" /> : null }

                { this.state.cart.length == 0 ? <ToolTip msg="购物车是空的 -_-" /> : null }

                <div className='my-container shop-cart-container'>
                    {
                        <ul className="shop-cart">
                            {
                                this.state.cart.map( ( item, index ) => {
                                    return (
                                        <li className="cart-item" key={ index }>
                                            <h4 className="item-name"> 牛魔王官方旗舰店 </h4>
                                            <div className="item-body">
                                                <div className="selected">

                                                    <input type="checkbox" 
                                                        onChange={ () => this.changeChecked( item.productId, item.typeModel, index ) } 
                                                        checked={ item.isChecked }
                                                    />

                                                </div>

                                                <div className="item-img">
                                                    <img src={ item.image } alt="这是商品图片 但是暂时没有 以后坑定会有" title={ item.name } />
                                                </div>

                                                <div className="item-body-content">
                                                    <p> { item.name } </p>
                                                    <p className="type"> { item.typeModel } </p>
                                                    <div className="counter">
                                                        <button onClick={ () => this.changeProductNumber( item.productId, item.typeModel, "minus" ) }>-</button>
                                                        <input type="text" value={ item.num } onChange={ () => {} }/>
                                                        <button onClick={ () => this.changeProductNumber( item.productId, item.typeModel, "add" ) }>+</button>
                                                    </div>

                                                    <span 
                                                        className="delete-icon iconfont icon-shanchu" 
                                                        onClick={ () => this.del( item.productId, item.typeModel ) }
                                                    >
                                                         
                                                    </span>

                                                </div>
                                            </div>
                                            <div className="item-footer">
                                                <span>小计：<strong>￥ { item.price * item.num } </strong> 元</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }                        
                        </ul>
                    }
                    
                    <div className="cart-footer">
                        <div className="footer-info">
                            <input 
                            type="checkbox" 
                                name="all_selected" 
                                checked={ this.state.cart.every( item => item.isChecked ) }
                                onChange={ ( event ) => this.switchAllSelected( event ) }
                            />
                            <span>全选</span> 
                            <span>
                                合计：￥
                                <strong>    
                                    { this.state.totalPrice }
                                </strong>
                            </span>
                        </div>  
                        <div className="pay-btn">
                            去结算
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 
