import React,{Component} from 'react';

import './ShoppingCart.less'
import cookie from "./../App/cookie"

import MyHeader from "../../components/MyHeader/MyHeader";
import ToolTip from "./../Details/ToolTip/tooltip"
// import AuthRoute from "./AuthRoute/authRoute"

import { myGet, myDelete } from '../../api/index';



/**
 * 进入用户购物车页面 
 * 1 查看用户是否登录
 *      用户已经登录 获取用户的购物车
 *      用户没有登录 页面跳转至 login 页面
 * 2 获取用户购物车  将用户的购物车数据集保存到 组件的 state 中
 * 3 实现购物车中单个商品的 增 add 删 del 减 minus 
 *      以及 
 *      全选 allSelected 反选 invertSelected  单选 singleSelected 小计 subtotal 总计 total
 */



export default class ShoppingCart extends Component {

    constructor ( props ) {
        super( props);
        this.state = {

            // 用户信息
            userInfo: {
                userId: null
            },

            // 购物车
            /**
             *  name: "豪爵铃木GW250"
             *  num: 10
             *  price: 23880
             *  productId: "3"
             *  typeModel: "冰川白"
             */
            cart: [],

            // 购物车是否拉取成功 默认成功
            cartSuccess: true,

            // 全选
            allSelected: false,

            // 用户是否登录 默认用户已经登录
            isAuth: true,

            checkAry:[]
        };

        this.addHandle = this.addHandle.bind( this );
        this.minusHandle = this.minusHandle.bind( this );
        this.del = this.del.bind( this) ;
        this.handleChange = this.handleChange.bind( this );
    }
    componentDidMount () {
        console.log( JSON.parse( cookie.get( 'USER' ) )  );

        let userid = JSON.parse( cookie.get( 'USER' ) ).userId;

        // 检查用户是否已经登录
        myGet( "/user/" + userid ).then( ( response ) => {
            if ( response.code === 0 && !response.login  ) {
                this.setState( { isAuth: false } );
                return;
            }
        })

        // 将用户 id 保存至 state 
        this.setState( { userInfo: { userId: JSON.parse( cookie.get( 'USER' ) ).userId } } )

        
        console.log( userid );

        // 根据用户 id 获取用户购物车信息
        myGet( "/shoppingCart/" + userid ).then( ( response ) => {
            console.log( response );
            if ( response.code === 0 && response.login ) {
                response.cartInfo.forEach( ( item, index ) => {
                    item.isCheck = false;

                });
                let checkAry=[];
                response.cartInfo.forEach(item=>{
                    checkAry.push(true)
                });
                this.setState( { ...this.state,cart: response.cartInfo,checkAry } );
            } else {
                this.setState( { isAuth: false } );
            }
        })
    }


    addHandle ( id, type ) {
        console.log( id );
        let targetProduct = this.state.cart.filter( ( item ) => {
            return item.productId == id && item.typeModel == type ;
        }) 
        targetProduct = targetProduct[0];

        targetProduct.num += 1;
       
        this.setState( { cart: [ ...this.state.cart, ...targetProduct ] })
        
    }
    minusHandle ( id, type ) {
        console.log( id );
        let targetProduct = this.state.cart.filter( ( item ) => {
            return item.productId == id && item.typeModel == type ;
        }) 
        targetProduct = targetProduct[0];

        if ( targetProduct.num == 1 ) {
            return;
        }
        targetProduct.num -= 1;
       
        this.setState( { cart: [ ...this.state.cart, ...targetProduct ] })
    }

    del ( id, type ) {

        console.log( id );
        let newCart = this.state.cart.filter( ( item ) => {
            return item.productId !== id && item.typeModel !== type;
        }) 
        this.setState( { cart: newCart } )
    }

    handleChange ( v, id, type ) {
        let newCart = this.state.cart.filter( ( p, i ) => {
            return p.productId == item.productId && p.typeModel == item.typeModel 
        })
        newCart = newCart[0];
        newCart.isCheck = v.target.checked;

        this.setState( { cart: [ ...this.state.cart, ...newCart ] });
    }
    handleClick=(index)=>{
        let checkAry=this.state.checkAry;
        checkAry[index]= !checkAry[index];
         this.setState({
             ...this.state,
             checkAry
         })
    };
    handleClickAll=()=>{
        let  flag=this.state.checkAry.some(item=>!item);
        let checkAry=this.state.checkAry.map(item=>flag);
        this.setState({
            ...this.state,
            checkAry
        })
    };
    render(){
        return (
            <div>
                {/* <AuthRoute /> */}
                <MyHeader showBack={true} title="购物车"/>

                { !this.state.isAuth ? <ToolTip msg="登陆后可以查看购物车" /> : null }

                

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
                                                    <input type="checkbox" onChange={ (v ) => console.log( arguments )  } checked={this.state.checkAry[index]} onClick={()=>{this.handleClick(index)}}/>
                                                </div>
                                                <div className="item-img">
                                                    <img src="" alt="这是商品图片 但是暂时没有 以后坑定会有" />
                                                </div>
                                                <div className="item-body-content">
                                                    <p> { item.name } </p>
                                                    <p className="type"> { item.typeModel } </p>
                                                    <div className="counter">
                                                        <button onClick={ () => this.minusHandle( item.productId, item.typeModel ) }>-</button>
                                                        <input type="text" value={ item.num } onChange={ () => {} }/>
                                                        <button onClick={ () => this.addHandle( item.productId, item.typeModel ) }>+</button>
                                                    </div>
                                                    <span className="delete-icon iconfont icon-shanchu" onClick={ () => this.del( item.productId, item.typeModel ) }>删除</span>
                                                </div>
                                            </div>
                                            <div className="item-footer">
                                                <span>小计：<strong>￥ { item.price * item.num } </strong> 元</span>
                                                <span>应付定金：<strong>￥100800</strong> 元</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                            
                        </ul>
                    }
                    
                    <div className="cart-footer">
                        <div className="footer-info">
                            <input type="checkbox" name="all_selected" onChange={ v => this.setState( { allSelected: v.target.checked } ) } checked={!this.state.checkAry.some(item=>!item)} onClick={this.handleClickAll}/>
                            <span>全选</span> 
                            <span>
                                合计：
                                <strong>
                                    {
                                        this.state.cart.filter( (v, i) => {
                                                console.log( v );
                                             return v.isCheck
                                        })
                                    } 
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