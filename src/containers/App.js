import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Signup from './Auth/Signup/Signup';
import Login from './Auth/Login/Login';
import Layout from './Layout/Layout';
import firebase from '../firebase';
import * as actionCreators from '../actions/index';

class App extends Component{

  componentDidMount(){ 
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.props.setUserHandler(user);
        this.props.history.push('/');
      }
      else{
        this.props.history.push('/signup');
      }
    })
  }

  render(){
    return (
      <Switch>
        <Route path='/signup' render={props => (<Signup />)} />
        <Route path='/login' render={props => (<Login />)} />
        <Route path='/' render={props => (<Layout />)} />
      </Switch>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    setUserHandler: (user) => dispatch(actionCreators.setUser(user))
  }
}

export default connect(null, mapDispatchToProps)( withRouter(App) );
