import React, {Component} from 'react';
import './Add.less'
import {Link} from 'react-router-dom'
import MyHeader from "../../components/MyHeader/MyHeader";
import {myPut} from '../../api/index';
export default class Add extends Component {
    constructor(){
        super();
        this.state={
            userId:'',
            address:[]
        }
    }

    handleClick=()=>{
        myPut('/user',{
            userId:this.state.userId,
            address:this.state.address,
        }).then(result=>{
            if(result.code==0){
                console.log('修改成功');
            }else{
                console.log('修改失败');
            }
            console.log(result);
        })
    };
    componentDidMount(){
        let add={};
        if(this.props.location.params){
            add=this.props.location.params.useradd;
        }else{
            return;
        }
        this.setState({
            userId:add.userId,
            address:add.address
        });
        console.log(this.props);
    }


    render() {
        return (
            <div className="add-bg">
                <MyHeader showBack={true} title="我的地址"/>
                <div className='my-container'>
                    {/*{*/}
                        {/*this.props.children.map((item,index)=> ( */}
                            {/*<div className="add-top">*/}
                            {/*<div>*/}
                                {/*<label htmlFor="">*/}
                                    {/*收货人*/}
                                {/*</label>*/}
                                {/*<input type="text"  placeholder="请输入收货人" value={item.name} key={0}*/}
                                       {/*onChange={(e)=>this.setState({item.name:e.target.value})}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                                {/*<label htmlFor="">*/}
                                    {/*联系电话*/}
                                {/*</label>*/}
                                {/*<input type="text" placeholder="请输入联系电话" value={this.state.address[1]} key={1}*/}
                                       {/*onChange={(e)=>this.setState({address:e.target.value})}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                                {/*<label >*/}
                                    {/*详细地址*/}
                                {/*</label>*/}
                                {/*<input type="text" placeholder="请输入详细地址"  value={this.state.address[2]} key={2}*/}
                                       {/*onChange={(e)=>{this.setState({address:e.target.value})}}/>*/}
                            {/*</div>*/}
                        {/*</div>)*/}
                           {/**/}
                        {/*)*/}
                    {/*}*/}
                    <div className="add-top">
                        <div>
                            <label htmlFor="">
                                收货人
                            </label>
                            <input type="text"  placeholder="请输入收货人" value={this.state.address[0] } key={0}
                                   onChange={(e)=>this.setState({address:e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="">
                                联系电话
                            </label>
                            <input type="text" placeholder="请输入联系电话" value={this.state.address[1]} key={1}
                                   onChange={(e)=>this.setState({address:e.target.value})}/>
                        </div>
                        <div>
                            <label >
                                详细地址
                            </label>
                            <input type="text" placeholder="请输入详细地址"  value={this.state.address[2]} key={2}
                                   onChange={(e)=>{this.setState({address:e.target.value})}}/>
                        </div>
                    </div>
                    <div className="add-btn">
                        <Link to="/Map">
                            <button onClick={this.handleClick}>
                                完成
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

