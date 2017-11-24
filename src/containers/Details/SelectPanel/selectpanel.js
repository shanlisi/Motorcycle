import React, { Component, SelectHTMLAttributes } from 'react';

import ToolTip from "./../ToolTip/tooltip"

import "./selectpanel.less"

class SelectPanel extends Component {
    constructor ( props ) {
        super( props );
        this.state = {

            // 购买数量
            buyAmount: 1,

            // 选中的商品类型
            selectedType: "",

            // 购买数量是否大于库存
            isBuyAmountGreaterThanInventory: false,

            // 购买数量是否小于 1 
            isBuyAmountLessThanOne: false,

            // 添加购物车是否成功
            isAddSuccess: false,

            // 是否选择了类型 默认表示选中了一个类型 且有且只能选择一种类型   false 没有选中任何类型
            hasSelected: true
        };

        this.addBuyAmount = this.addBuyAmount.bind( this );
        this.minusBuyAmount = this.minusBuyAmount.bind( this );
        this.add = this.add.bind( this );
        this.selectHandle = this.selectHandle.bind( this );
    }

    // 增加购买数量
    addBuyAmount () {
        if ( this.state.buyAmount > this.props.inventory ) {
            this.setState( { isBuyAmountGreaterThanInventory: true } );
            return;
        }
        this.setState({ buyAmount: this.state.buyAmount + 1 } )
    }

    // 减少购买数量
    minusBuyAmount () {
        if ( this.state.buyAmount <= 1 ) {
            this.setState( { isBuyAmountLessThanOne: true } );
            return;
        }
        this.setState( { buyAmount: this.state.buyAmount - 1 } )
    }

    // 添加商品到购物车
    add () {
        if ( !this.state.selectedType ) {
            this.setState( { hasSelected: false }  );
            return;
        }
        this.props.addProductToCart( this.state.selectedType, this.state.buyAmount )
    }

    // 选择类型
    selectHandle () {
        let selectedBtn = Array.prototype.slice.call( this.btnGroup.getElementsByTagName( "input" ) ).filter( ( item, index ) => {
            return item.name === "color" && item.checked;
        });
        selectedBtn = selectedBtn[0];


        this.setState( { selectedType: selectedBtn.value  } );


        let colorBtns = selectedBtn.parentNode.parentNode.getElementsByClassName( "color-btn");

        Array.prototype.slice.call( colorBtns ).forEach( v => v.style.backgroundColor = "" );

        selectedBtn.parentNode.style.backgroundColor = "orange";
    }


    render () {
        
        return (
            <div className="select-panel">
                <div className="color-area">
                    <strong> 颜色 </strong>
                    <div className="color-btn-group" ref={ el => this.btnGroup = el }>
                        {
                            this.props.colors.map( ( item, index ) => {
                                return (
                                    <div className="color-btn" key={ index }>
                                        <span> { item } </span>
                                        <input type="radio" name="color" value={ item } onClick={ this.selectHandle }  />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="buy-amount">
                    <span>购买数量</span>
                    <div>
                        <button onClick={ this.minusBuyAmount }>-</button>
                        <input type="text" value={ this.state.buyAmount } onChange={ () => {} }/>
                        <button onClick={ this.addBuyAmount }>+</button>
                    </div>
                </div>
                <button className="confirm-btn" onClick={ this.add }> 确定 </button>
                {
                    !this.state.hasSelected ? <ToolTip msg="请选择一种类型" /> : null
                }
                {
                    this.state.isBuyAmountGreaterThanInventory ? <ToolTip msg="商品购买数量大于库存" /> : null
                }
                {
                    this.state.isBuyAmountLessThanOne ? <ToolTip msg="购买的商品数量不能小于1" /> : null
                }
            </div>
        )
    }
}

export default SelectPanel;