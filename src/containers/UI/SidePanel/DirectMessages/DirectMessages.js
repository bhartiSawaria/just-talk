
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import classes from './DirectMessages.module.css';
import firebase from '../../../../firebase';
import * as actionCreators from '../../../../actions/index';

class DirectMessages extends Component{

    state = {
        allUsers: [],
        usersRef: firebase.database().ref('users'),
        channelRef: firebase.database().ref('channels')
    }

    componentDidMount(){
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap => {
            if(snap.key !== this.props.user.uid){
                const user = snap.val();
                user['id'] = snap.key;
                loadedUsers.push(user);
                this.setState({allUsers: loadedUsers})
            }
        })
    }

    getPrivateChannelId = (userId) => {
        if( this.props.user.uid > userId ){
            return `${userId}/${this.props.user.uid}`;
        }
        return `${this.props.user.uid}/${userId}`;
    }

    clickUserNameHandler = (user) => {
        const channelId = this.getPrivateChannelId(user.id);
        const privateChannel = {
            channelName: user.name,
            id: channelId
        }
        this.props.setPrivateChannel(privateChannel)
    }

    render(){
        let users = null;
        if(this.state.allUsers.length > 0){
            users = this.state.allUsers.map((user, index) => {
                return <div 
                    key={index} 
                    className={classes.User} 
                    onClick={() => this.clickUserNameHandler(user)}>{user.name}</div>
            })
        }
        return(
            <div className={classes.RootContainer}>
                <Icon name='mail'/>
                <div style={{display: 'inline-block', marginLeft: '8px', marginRight: '20px', color:'white'}}>DIRECT MESSAGES</div>
                <div className={classes.UsersContainer}>
                    {users}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPrivateChannel: (channel) => dispatch(actionCreators.setPrivateChannel(channel))
    }
}

export default connect(null, mapDispatchToProps)(DirectMessages);