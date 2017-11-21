import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './List.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {myGet} from '../../api/index'

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            productList: [], id: ''
        }
    }
    /**
     * 升序排列
     * @param propertyName
     * @returns {Function}
     */
    upSort = (propertyName) => {
        if ((typeof  this.state.productList[0][propertyName]) != "number") {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                console.log(value1, value2);
                return value1.localeCompare(value2);
            }
        } else {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value2 - value1;
            }
        }
    };
    /**
     * 降序排列
     * @param propertyName
     * @returns {Function}
     */
    downSort = (propertyName) => {
        if ((typeof this.state.productList[0][propertyName]) != "number") {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value2.localeCompare(value1);
            }
        }
        else {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value1 - value2;
            }
        }
    };
    handleClick = () => {
        this.setState({isShow: !this.state.isShow})
    };
    /**
     * 排序
     * @param prop 排序的属性
     * @param isUpSort 是否升序排列
     */
    sort = (prop, isUpSort) => {
        if (isUpSort) {
            this.state.productList.sort(this.upSort(prop));
        } else {
            this.state.productList.sort(this.downSort(prop));
        }

        this.setState({productList: this.state.productList});
    };
    change = () => {
        var offset = 0;
        var limit = 8;
        myGet('/productList/getList?offset=' + offset + '&limit=' + limit).then(res => {
                this.setState({...this.state, productList: res.productList});
            }
        );
    }
    componentDidMount() {
        this.change();
    };
    search = () => {
        myGet('/productList/filterList?value=' + ipt.value).then(res => {
            console.log(res);
            if (res.code == 1) {
                this.setState({...this.state, productList: []});
            } else {
                this.setState({...this.state, productList: res.productList});
            }
        })
    };

    render() {
        //升序
        return (
            <div>
                <MyHeader showBack={true} title="商城"/>
                <div className='my-container'>
                    <div className='list'>
                        <div className='title'>
                            <input type="text" placeholder='搜索商品' id='ipt' onChange={
                                () => {
                                    ipt.value.length == 0;
                                    this.change();
                                }
                            }/>
                            <span className='search-span iconfont icon-search'
                                  onClick={this.search}></span>
                            <div className='sort' onClick={this.handleClick}>
                                {this.state.isShow
                                    ? <span className='close'>&times;</span> : <span className='classify'>销量排序</span>}
                            </div>
                            <TransitionGroup>
                                {this.state.isShow ?
                                    <CSSTransition timeout={1000} classNames='fadeIn'>
                                        <ul>
                                            <li onClick={() => {
                                                this.sort('price', true)
                                            }}>最贵
                                            </li>
                                            <li onClick={() => {
                                                this.sort('price', false)
                                            }}>最便宜
                                            </li>
                                            <li onClick={() => {
                                                this.sort('date', false)
                                            }}>最新上市
                                            </li>
                                            <li onClick={() => {
                                                this.sort('hot', true)
                                            }}>最热门
                                            </li>
                                        </ul>
                                    </CSSTransition> : null}
                            </TransitionGroup>
                        </div>
                        <div className='all-product'>
                            <ul className='main'>
                                {this.state.productList.length > 0 ? this.state.productList.map((item, index) => (
<<<<<<< HEAD
                                    <li key={index}>


                                        {/* 增加查询参数 id  */}
                                        <Link to={"/details/" + item.id }><img src={item.url}></img></Link>
                                        <p className='product-name'>{item.name}</p>

=======
                                    <li key={index} className='mainList'>
                                        <Link to="/details"><img src={item.image}></img></Link>
                                        <p className='product-name'>{item.title}</p>
>>>>>>> shixiaoxiao
                                        <p className='price'>市场均价: ￥{item.price}</p>
                                    </li>
                                )) : <li className='no-fond'>没有搜索到内容</li>
                                }

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
