
import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import classes from './Signup.module.css';
import sideImage from '../../../assets/Images/pic4.png';
import firebase from '../../../firebase';
import md5 from 'md5';

const GRAVATAR_BASEURL = 'https://www.gravatar.com/avatar/';

class Signup extends Component{

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        loading: false
    }

    isFormEmpty = ({name, email, password, confirmPassword}) => {
        return name.trim().length < 1 || email.trim().length < 1 || password.trim().length < 1 || confirmPassword.trim().length < 1;
    }

    isNameValid = () => {
        return this.state.name.trim().length >= 3;
    }

    isPasswordValid = ({password, confirmPassword}) => {
        const errors = [];
        if( password.trim().length < 6 ){
            errors.push({message: "Password should atleast be 6 characters long."});
            this.setState({errors: errors});
            return false;
        }
        else if( password !== confirmPassword ){
            errors.push({message: "Password do not match."});
            this.setState({errors: errors});
            return false; 
        }
        else{
            return true;
        }
    }

    isFormValid = () => {
        const errors = [];
        if(this.isFormEmpty(this.state)){
            errors.push({message: "Fill in all fields."});
            this.setState({errors: errors});
            return false;
        }
        else if(!this.isNameValid()){
            errors.push({message: "Username should atleast be 3 characters long."});
            this.setState({errors: errors});
            return false;
        }
        else if(!this.isPasswordValid(this.state)){
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
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    return createdUser.user.updateProfile({
                        displayName: this.state.name,
                        photoURL: GRAVATAR_BASEURL + md5(this.state.email) + "?d=identicon"
                    })
                })
                .then(() => {
                    const currentUser = firebase.auth().currentUser;
                    return firebase.database().ref('users').child(currentUser.uid).set({
                        name: currentUser.displayName,
                        avatar: currentUser.photoURL
                    })
                })
                .then(() => {
                    this.setState({loading:false});
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
                    <Form className={classes.SignupForm} onSubmit={this.formSubmitHandler}>
                        <Header as='h1'>Sign Up</Header>
                        <Form.Input 
                            fluid 
                            className={this.getErrorClass('username')}
                            name='name' 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Username' 
                            type='text' 
                            value={this.state.name} 
                            onChange={this.inputChangeHandler}/>
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
                        <Form.Input 
                            fluid 
                            className={this.getErrorClass('match')}
                            name='confirmPassword' 
                            icon='repeat' 
                            iconPosition='left' 
                            placeholder='Confirm Password' 
                            type='password' 
                            value={this.state.confirmPassword} 
                            onChange={this.inputChangeHandler}/>
                        {this.state.errors.length > 0 && this.state.errors.map((err, i) => <p key={i} style={{color: "red"}}>{err.message}</p>)}
                        <Button 
                            fluid 
                            color='green'
                            className={this.state.loading ? 'loading' : ''}
                            disabled={this.state.loading} 
                            style={{marginTop: '26px'}}>Sign Up</Button>
                            
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                    </Form>
                </div>
            </div>
        )
    }
};

export default Signup;
