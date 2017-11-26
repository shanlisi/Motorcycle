import React, {Component} from 'react';
import './App.less'
import  {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "../Home/Home";
import List from "../List/List";
import Mine from "../Mine/Mine";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Tab from "../../components/Tab/Tab";
import Details from "../Details/Details";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Test from "../Test/Test";
import Profile from "../Profile/Profile";
import Map from "../Map/Map";
import Add from "../Add/Add";
import Sub from "../Sub/Sub";

export default class App extends Component {

    render() {
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
                    <Route path='/profile' component={Profile}/>
                    <Route path='/map' component={Map}/>
                    <Route path='/Add' component={Add}/>
                    <Route path='/Sub' component={Sub}/>
                    <Tab/>
                </div>
            </Router>
        )
    }
}
