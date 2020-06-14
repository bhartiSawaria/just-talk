
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import classes from './Login.module.css';
import sideImage from '../../../assets/Images/pic4.png';
import firebase from '../../../firebase';
import * as actionCreators from '../../../actions/index'; 

class Login extends Component{

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        loading: false
    }

    isFormEmpty = ({ email, password }) => {
        return email.trim().length < 1 || password.trim().length < 1;
    }

    isFormValid = () => {
        if(this.isFormEmpty(this.state)){
            this.setState({errors: [{message: "Fill in all fields."}]});
            return false;
        }
        else{
            return true;
        }
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value, errors: []});
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        if(this.isFormValid()){
            this.setState({errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    this.setState({loading: false });
                    this.props.clearUser();
                    this.props.history.push('/');
                })
                .catch(err => {
                    console.log(err);
                    this.setState({loading: false, errors: new Array( {message: err.message} )});
                })
        }
    }

    getErrorClass = (fieldName) => {
        if( this.state.errors.length > 0 && this.state.errors[0].message.toLowerCase().includes(fieldName)){
            // return "error";
            return classes.Error;
        }
        return "";
    }

    render(){
        return (
            <div className={classes.RootContainer}>
                <div className={classes.ImageContainer}>
                    <img src={sideImage} alt='sideImage' />
                </div>
                <div className={classes.FormContainer}>
                    <Form className={classes.LoginForm} onSubmit={this.formSubmitHandler}>
                        <Header as='h1'>Login</Header>
                        <Form.Input 
                            fluid 
                            className={this.getErrorClass('email')}
                            name='email' 
                            icon='mail' 
                            iconPosition='left' 
                            placeholder='E-mail' 
                            type='email' 
                            value={this.state.email} 
                            onChange={this.inputChangeHandler}/>
                        <Form.Input 
                            fluid 
                            className={this.getErrorClass('password')}
                            name='password' 
                            icon='lock' 
                            iconPosition='left' 
                            placeholder='Password' 
                            type='password' 
                            value={this.state.password} 
                            onChange={this.inputChangeHandler}/>
                        {this.state.errors.length > 0 && this.state.errors.map((err, i) => <p key={i} style={{color: "red"}}>{err.message}</p>)}
                        <Button 
                            fluid 
                            color='green'
                            className={this.state.loading ? 'loading' : ''}
                            disabled={this.state.loading} 
                            style={{marginTop: '26px'}}>Login</Button>
                            
                        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    </Form>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return{
        clearUser: () => dispatch(actionCreators.clearUser())
    }
}

export default connect(null, mapDispatchToProps)(Login);
