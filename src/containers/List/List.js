import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './List.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {myGet} from '../../api/index';
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            productList: [],
            id: '',
            offset:0,
            limit:6,
            hasMore:true,
            loading:false,
            searching:false
        }
    }

    /**
     * 升序排列
     * @param propertyName
     * @returns {Function}
     */
    upSort = (propertyName) => {
        if ((typeof this.state.productList[0][propertyName]) != "number") {
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
        if (this.state.productList.length == 0) {
            return
        }
        if (isUpSort) {
            this.state.productList.sort(this.upSort(prop));
        } else {
            this.state.productList.sort(this.downSort(prop));
        }
        this.setState({productList: this.state.productList});
    };

    change = (restart) => {
            this.setState({loading:true});
            if(restart){
                myGet('/productList/getList?offset=0&limit=' + this.state.limit).then(res => {
                        if(res.code==1){
                            this.setState({loading:false});
                            return;
                        }
                            this.setState({productList: res.productList,offset:this.state.limit,hasMore:res.hasMore,loading:false});
                    }
                );
            }else{
                myGet('/productList/getList?offset=' + this.state.offset + '&limit=' + this.state.limit).then(res => {
                        if(res.code==1) {
                            this.setState({loading: false});
                            return;
                        }
                            this.setState({productList: [...this.state.productList,...res.productList],offset:this.state.offset+this.state.limit,hasMore:res.hasMore,loading:false});


                    }
                );
            }

    };

    componentDidMount() {
        this.change();
    };

    search = () => {
        this.setState({searching:true});
        myGet('/productList/filterList?value=' + ipt.value).then(res => {
            if (res.code == 1) {
                this.setState({...this.state, productList: []});
            } else {
                this.setState({...this.state, productList: res.productList});
            }
        })
    };
//上拉加载
    handleScroll = (event) => {
        if(!this.state.hasMore ||this.state.searching){return}
        if (this.state.timerId) clearTimeout(this.state.timerId);
        let that = event.target;
        this.state.timerId = setTimeout(() => {

            let scrollTop = that.scrollTop;//向上卷去的高度

            let clientHeight = that.clientHeight;//可视区高度

            let scrollHeight = that.scrollHeight;//内容高度


            if (scrollTop + clientHeight + 10 >= scrollHeight) {
                this.change()
            }
        }, 100)
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
                                (e) => {
                                    if(e.target.value.length == 0){
                                        this.setState({searching:false,productList: []});
                                        this.change(true);
                                    }

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
                                        <ul onClick={()=>{this.setState({...this.state,isShow:false})}}>
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
                        <div className='all-product' onScroll={this.handleScroll}>
                            <ul className='main clearfix'>
                                {this.state.productList.length > 0 ? this.state.productList.map((item, index) => (
                                    <li key={index} className="mainList">
                                        {/* 增加查询参数 id  */}
                                        <Link to={"/details/" + item.id}><img src={item.image}></img></Link>
                                        <p className='product-name'>{item.title}</p>
                                        <p className='price'>市场均价: ￥{item.price}</p>
                                    </li>
                                )) : (this.state.loading?null:<li className='no-fond'>木有内容~</li>)
                                }
                            </ul>
                            {this.state.hasMore?null:<p style={{textAlign:'center',lineHeight:'.75rem'}}>别扯了，我是有底线的~~~</p>}
                            {this.state.loading ? <div style={{position: 'relative', height: '1rem'}}>
                                <div className="loader">Loading...</div>
                            </div> : null}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}