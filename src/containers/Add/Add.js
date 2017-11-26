import React, {Component} from 'react';
import './Add.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPut} from '../../api/index';
import cookie from '../App/cookie'
export default class Add extends Component {
    constructor(){
        super();
        this.state={
            userId:'',
            address:[]
        }
    }

    handleClick=()=>{
        let address={
            man:this.man.value,
            phone:this.phone.value,
            location:this.location.value
        };


        myPut('/user',{
            userId:this.state.userId,
            address:[...this.state.address,address]
        }).then(result=>{
            if(result.code==0){
                this.props.history.push('/map');
            }else{
                console.log('修改失败');
            }
        })
    };

    componentWillMount(){
        if(this.props.userInfo){
            this.setState({
                userId:this.props.userInfo.userId,
                address:this.props.userInfo.address
            })
        }else{
            this.setState({
                userId:JSON.parse( cookie.get( "USER" ) ).userId
            })
        }
    }
    render() {
        return (
            <div className="add-bg">
                <MyHeader showBack={true} title="我的地址"/>
                <div className='my-container'>
                    <div className="add-top">
                        <div>
                            <label>
                                收货人：
                            </label>
                            <input type="text"  placeholder="请输入收货人" ref={i=>this.man=i}/>
                        </div>
                        <div>
                            <label>
                                联系电话：
                            </label>
                            <input type="text" placeholder="请输入联系电话" ref={i=>this.phone=i}/>
                        </div>
                        <div>
                            <label >
                                详细地址：
                            </label>
                            <input type="text" placeholder="请输入详细地址" ref={i=>this.location=i} />
                        </div>
                    </div>
                    <div className="add-btn">
                            <button onClick={this.handleClick}>
                                完成
                            </button>
                    </div>

                </div>
            </div>
        )
    }
}

