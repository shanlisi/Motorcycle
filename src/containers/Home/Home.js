import React, {Component} from 'react';
import './Home.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import Slider from "./Slider/index";
import ArticleList from "./ArticleList/index";

import upMore from './UpMore';
import downRefresh from './DownRefresh';
import {myGet} from '../../api/index';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            is: true,
            articleList: [],
            timerId: null,
            offset: 0,
            limit: 5,
            hasMore: true,
            loading: false
        }
    }

    loadMore = () => {
        if (!this.state.hasMore) {
            return
        }
        this.setState({loading: true});
        myGet('/home/articleList?offset=' + this.state.offset + '&limit=' + this.state.limit).then(res => {

            if (res.code === 1) {
                this.setState({
                    loading: false
                });
            }

            this.setState({
                articleList: [...this.state.articleList, ...res.articleList],
                offset: this.state.offset + this.state.limit,
                hasMore: res.hasMore || false,
                loading: false
            });
        })

    };
    refresh = () => {
        var offset = 0,
            limit = 5;
        return () => {
            offset += limit;
            if(offset>30){offset=0}
            myGet('/home/articleList?offset=' + offset + '&limit=' + limit).then(res => {
                if (res.code === 1) {
                    downRefresh(this.homeContainer, this.refresh(), false)
                }
                this.setState({
                    ...this.state.articleList,
                    articleList: res.articleList
                })
            })
        }
    };

    componentDidMount() {
        this.loadMore();
        //下拉刷新
        downRefresh(this.homeContainer, this.refresh())
    }

    //上拉加载
    handleScroll = (event) => {
        if (this.state.timerId) clearTimeout(this.state.timerId);
        if (!this.state.hasMore || this.state.loading) {
            return
        }
        let that = event.target;
        this.state.timerId = setTimeout(() => {

            let scrollTop = that.scrollTop;//向上卷去的高度

            let clientHeight = that.clientHeight;//可视区高度

            let scrollHeight = that.scrollHeight;//内容高度


            if (scrollTop + clientHeight + 10 >= scrollHeight) {
                this.loadMore()
            }
        }, 100)
    };

    render() {
        return (
            <div>
                <MyHeader showBack={false} title="资讯"/>
                <div className="home-refresh"> </div>
                <div className='my-container' ref={el => this.homeContainer = el} onScroll={this.handleScroll}>
                    <Slider/>
                    <ArticleList articleList={this.state.articleList}/>
                    {!this.state.hasMore ?
                        <p style={{lineHeight: '.75rem', textAlign: 'center'}}>别扯了~我是有底线的~~~</p> : null}
                    {this.state.loading ? <div style={{position: 'relative', height: '1rem'}}>
                        <div className="loader">Loading...</div>
                    </div> : null}
                </div>
            </div>
        )
    }
}
