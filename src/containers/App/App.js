import React,{Component} from 'react';
import './App.less'
import  {HashRouter as Router,Route} from 'react-router-dom';
import Home from "../Home/Home";
import List from "../List/List";
import Mine from "../Mine/Mine";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Tab from "../../components/Tab/Tab";
import Details from "../Details/Details";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Test from "../Test/Test";

export default class App extends Component{

    render(){
        return (
            <Router>
               <div>
                    <Route path='/' exact component={Home}/>
                    <Route path='/list' component={List}/>
                    <Route path='/shoppingCart' component={ShoppingCart}/>
                    <Route path='/mine' component={Mine}/>
                    <Route path='/details/:id' component={Details}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/test' component={Test}/>
                    <Tab/>
               </div>
            </Router>
        )
    }
}
