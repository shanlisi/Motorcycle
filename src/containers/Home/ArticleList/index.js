import React, {Component} from 'react';
import './index.less';
import {myGet} from '../../../api/index';

export default class ArticleList extends Component {
    constructor() {
        super();
        this.state = {
            hsaMore: false,
            articleList: []
        }
    }

    componentDidMount() {
        myGet('/home/articleList').then(res => {
            console.log(res);
            if (res.code === 0) {
                this.setState({
                    ...this.state.articleList,
                    articleList: res.articleList
                })
            }
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.articleList.length > 0?
                            this.state.articleList.map((item, index) =>(
                                <li key={index}  className="articleList">
                                    <img src={item.image}/>
                                    <div>
                                        <p className="title">{item.title}</p>
                                        <div className="content">
                                            <span className="flag">{item.flag}</span>
                                            <span className="time">{item.date}</span>
                                            <i className="iconfont">+</i>
                                            <span className="num">{item.num}</span>
                                        </div>
                                    </div>
                                </li>
                            )): null
                    }
                </ul>
            </div>
        )
    }
}