
import React, { Component } from 'react';
import moment from 'moment';

import classes from './Message.module.css';

class Message extends Component{
    render(){
        return (
            <div className={classes.RootContainer}>
                <div className={classes.AvatarContainer}>
                    <img className={classes.UserAvatar} src={this.props.msg.user.avatar}/>
                </div>
                <div className={classes.MessageInfoContainer}>
                    <h1>{this.props.msg.user.name}</h1>
                    <span>{moment(this.props.msg.timestamp).fromNow()}</span>
                    <p>{this.props.msg.content}</p>
                </div>
            </div>
        )
    }
};

export default Message;