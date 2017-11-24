import React,{Component} from 'react';
import './Home.less'
import MyHeader from "../../components/MyHeader/MyHeader";
import Slider from "./Slider/index";
import ArticleList from "./ArticleList/index";

import upMore from './UpMore';
import downRefresh from './DownRefresh';
import {myGet} from '../../api/index';


export default class Home extends Component{
    constructor(){
        super();
        this.state={
            is:true,
            articleList:[]
        }
    }
    loadMore=()=>{
        var offset=0,
            limit=5;
        return()=>{
            offset += limit ;
            myGet('/home/articleList?offset='+offset+'&limit='+limit).then(res=>{

                if( res.code === 1 ){
                    upMore(this.homeContainer, this.loadMore(), false)
                }
                this.setState({
                    ...this.state,
                    articleList:[...this.state.articleList,...res.articleList]
                });
            })
        }
    };
    refresh=()=>{
        var offset=0,
            limit=5;
        return()=>{
            offset += limit ;
            myGet('/home/articleList?offset='+offset+'&limit='+limit).then(res=>{
                if(res.code===1){
                    downRefresh(this.homeContainer, this.refresh(), false)
                }
                this.setState({
                    ...this.state.articleList,
                    articleList:res.articleList
                })
            })
        }
    };

    componentDidMount(){

        this.loadMore()();
        this.refresh()();

        //上拉加载
        upMore(this.homeContainer, this.loadMore(), this.state.is);
        //下拉刷新
        downRefresh(this.homeContainer,this.refresh())
    }
    render(){
        return (
            <div>
                <MyHeader showBack={false} title="资讯"/>
                <div className="home-refresh"></div>
                <div className='my-container' ref={ el => this.homeContainer = el }>
                        <Slider/>
                        <ArticleList articleList={ this.state.articleList }/>
                </div>
            </div>
        )
    }
}
