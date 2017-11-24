import React, {Component} from 'react';
import './index.less';
// import {myGet} from '../../../api/index';
import Lazyload from 'react-lazyload';

export default class ArticleList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         articleList: []
    //     }
    // }
    //
    // componentDidMount() {
    //     myGet('/home/articleList').then(res => {
    //         //console.log(res);
    //         if (res.code === 0) {
    //             this.setState({
    //                 ...this.state.articleList,
    //                 articleList: res.articleList
    //             })
    //         }
    //     })
    // }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.articleList.length > 0?
                            this.props.articleList.map((item, index) =>(
                                <li key={index}  className="articleList">
                                    {/*<Lazyload></Lazyload>*/}
                                    <img src={item.image}/>
                                    <div>
                                        <a href={item.url}><p className="title">{item.title}</p></a>
                                        <div className="content">
                                            <span className="flag">{item.flag}</span>
                                            <span className="time">{item.date}</span>
                                            <i className="iconfont icon-xinxi"></i>
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