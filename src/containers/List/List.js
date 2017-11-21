import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './List.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            data: [
                {
                    name: "豪爵铃木",
                    price: 2300,
                    id: 1,
                    date: 1,
                    sell: 25667,
                    url: 'http://img3.newmotor.com.cn/UploadFiles/2017-09/66415/2017090111024575997.jpg'
                },
                {
                    name: "EN125-3F",
                    price: 2400,
                    id: 2,
                    date: 2,
                    sell: 25667,
                    url: 'http://img2.newmotor.com.cn/UploadFiles/2017-05/234/2017052410385294726_S.jpg'
                },
                {
                    name: "铃木GD110",
                    price: 2100,
                    id: 3,
                    date: 3,
                    sell: 25999,
                    url: 'http://img3.newmotor.com.cn/UploadFiles/2017-09/13188/2017092118190467499_S.jpg'
                },
                {
                    name: "GW250S(摩旅)",
                    price: 2200,
                    id: 4,
                    date: 4,
                    sell: 25667,
                    url: 'http://img2.newmotor.com.cn/UploadFiles/2017-08/13188/2017082417075766135_S.jpg'
                }, {
                    name: "豪爵铃木",
                    price: 2300,
                    id: 5,
                    date: 5,
                    sell: 25667,
                    url: 'http://img3.newmotor.com.cn/UploadFiles/2017-09/66415/2017090111024575997.jpg'
                }, {
                    name: "EN125-3F",
                    price: 2400,
                    id: 6,
                    date: 6,
                    sell: 25667,
                    url: 'http://img2.newmotor.com.cn/UploadFiles/2017-05/234/2017052410385294726_S.jpg'
                },
            ]
        }
    }

    /**
     * 升序排列
     * @param propertyName
     * @returns {Function}
     */
    upSort = (propertyName) => {
        if ((typeof this.state.data[0][propertyName]) != "number") {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value1.localeCompare(value2);
            }
        } else {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value2 - value1;
            }
        }
    }

    /**
     * 降序排列
     * @param propertyName
     * @returns {Function}
     */
    downSort = (propertyName) => {
        if ((typeof this.state.data[0][propertyName]) != "number") {
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
    }
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
            this.state.data.sort(this.upSort(prop));
        } else {
            this.state.data.sort(this.downSort(prop));
        }

        this.setState({data: this.state.data});
    };

    /**
     * 搜索
     */
    search = (prop) => {
        prop = "2300";
        let newArry = this.state.data.filter(function (item) {
                let price = item.price.toString();
                return item.name.indexOf(prop) == "-1" ? (
                    price.indexOf(prop) == "-1" ? false : true
                ) : true;
            }
        )
        this.setState({data: newArry});
    };

    render() {
        //升序
        return (
            <div>
                <MyHeader showBack={true} title="商城"/>
                <div className='my-container'>
                    <div className='list'>
                        <div className='title'>
                            <input type="text" placeholder='搜索商品'/>
                            <span className='search-span' onClick={() => {
                                this.search()
                            }}></span>
                            <div className='sort' onClick={this.handleClick}>
                                {this.state.isShow
                                    ? <span className='close'>x</span> : <span className='classify'>销量排序</span>}
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
                                                this.sort('date', true)
                                            }}>最新上市
                                            </li>
                                            <li onClick={() => {
                                                this.sort('sell', true)
                                            }}>最热门
                                            </li>
                                        </ul>
                                    </CSSTransition> : null}
                            </TransitionGroup>
                        </div>
                        <div className='all-product'>
                            <ul className='main'>
                                {this.state.data.map((item, index) => (
                                    <li key={index}>

                                        {/* 增加查询参数 id  */}
                                        <Link to={"/details/" + item.id }><img src={item.url}></img></Link>
                                        <p className='product-name'>{item.name}</p>
                                        <p className='price'>市场均价: ￥{item.price}</p>
                                    </li>
                                ))
                                }

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
