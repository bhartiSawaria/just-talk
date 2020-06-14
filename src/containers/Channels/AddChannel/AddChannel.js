
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Header, Button } from 'semantic-ui-react';

import classes from './AddChannel.module.css';
import  * as actionCreators from '../../../actions/index';
import firebase from '../../../firebase';

class AddChannel extends Component{

    state = {
        channelName: '',
        channelDescription: '',
        errors: []
    }

    isChannelNameValid = () => {
        const channelName = this.state.channelName;
        if( channelName.trim().length >= 3 ){
            return true;
        }
        else{
            const errors = [{message: "Channel name must atleast be 3 characters long."}];
            this.setState({errors: errors});
            return false;
        }
    }

    isChannelDescriptionValid = () => {
        const channelDescription = this.state.channelDescription;
        if( channelDescription.trim().length >= 5 ){
            return true;
        }
        else{
            const errors = [{message: "Channel description must atleast be 5 characters long."}];
            this.setState({errors: errors});
            return false;
        }
    }

    isFormValid = () => {
        if( this.isChannelNameValid() && this.isChannelDescriptionValid() ){
            return true;
        }
        return false;
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    addChannelProceedHandler = (event) => {
        event.preventDefault()
        if(this.isFormValid()){
            console.log('Form is valid');
            this.setState({errors: []});
            const key = firebase.database().ref('channels').push().key;
            firebase
                .database()
                .ref('channels')
                .child(key)
                .set({
                    channelName: this.state.channelName,
                    channelDescription: this.state.channelDescription,
                    id: key,
                    createdBy: {
                        name: this.props.user.displayName,
                        avatar: this.props.user.photoURL
                    }
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else{
            console.log('Form is invalid.');
            console.log(this.state.errors);
        }
    }

    addChannelCancelHandler = () => {
        this.props.hideBackdrop();
        this.props.hideModal();
    }

    render(){
        let error = null;
        if( this.state.errors.length > 0 ){
            const length = this.state.errors.length;
            error = (
                <p style={{color: 'red'}}>{this.state.errors[0].message}</p>
            )
        }
        return(
                <div className={classes.RootContainer}>
                    <Form>
                        <Header as='h1'>Add Channel</Header>
                        <Form.Input type='text' placeholder='Channel Name' name='channelName' value={this.state.channelName} onChange={(event) => this.inputChangeHandler(event)}/>
                        <Form.Input type='text' placeholder='Channel Description' name='channelDescription' value={this.state.channelDescription} onChange={(event) => this.inputChangeHandler(event)}/>
                        {error}
                        <Button color='green' onClick={this.addChannelProceedHandler}>Add</Button>
                        <Button color='red' onClick={this.addChannelCancelHandler}>Cancel</Button>
                    </Form>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        hideModal: () => dispatch(actionCreators.hideModal()),
        hideBackdrop: () => dispatch(actionCreators.hideBackdrop())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChannel);