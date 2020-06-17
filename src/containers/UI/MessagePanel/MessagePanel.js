
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Search, Input } from 'semantic-ui-react';

import classes from './MessagePanel.module.css';
import firebase from '../../../firebase';
import Message from './Message/Message';
import Spinner from '../../../components/UI/Spinner';

class MessagePanel extends Component{
    state = {
        message: '',
        isLoading: true,
        allMessages: [],
        messagesRef: firebase.database().ref('messages'),
        prevChannel: null
    }

    componentDidMount() {
        const { channel, user } = this.props;
    
        if (channel && user) {
          this.showMessagesListener(channel.id);
        }
        
    }

    componentWillUnmount(){
        this.state.messagesRef.off();
    }
    
    showMessagesListener = channelId => {
        this.setState({prevChannel: this.props.channel, isLoading: true});
        this.state.messagesRef.child(channelId).on("value", snap => {
            let loadedMessages = [];
            if (snap.exists()){
                snap.forEach(s => {
                    loadedMessages.push(s.val());
                })
                this.setState({
                    allMessages: loadedMessages,
                    isLoading: false
                });
            }
            else{
                console.log('Does not exist');
                this.setState({
                    allMessages: [],
                    isLoading: false
                })
            }
        });
    }

    inputChangeHandler = (event) => {
        this.setState({message: event.target.value});
    }

    sendMessageHandler = () => {
        this.setState({isLoading: true});
        this.state.messagesRef
            .child(this.props.channel.id)
            .push()
            .set({
                content: this.state.message,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    id: this.props.user.uid,
                    name: this.props.user.displayName,
                    avatar: this.props.user.photoURL
                }
            })
            .then(() => {
                this.setState({message: '', isLoading: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({message: '', isLoading: false});
            })
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('In getDerivedStateFromProps ');
    //     console.log('props', props, 'state', state)
    //     return state;
    // }

    render(){
        if( this.state.prevChannel != this.props.channel ){
            this.showMessagesListener(this.props.channel.id);
        };
        let channelName = '...';
        let messages = null;
        if(this.props.channel && this.props.channel.channelName){
            channelName = this.props.channel.channelName;
            
            messages = this.state.allMessages.map(message => {
                return <Message key={message.timestamp} msg={message} />
            });
        }

        if(this.state.isLoading){
            messages = <Spinner />
        }

        return(
            <div className={classes.RootContainer}>
                <div className={classes.MessagesHeader}>
                    <h1>{channelName}</h1>
                    <Search placeholder='Search Messages'/>
                </div>
                <div className={classes.MessagesBody}>
                    {messages}
                </div>
                <div className={classes.SendOptionsContainer}>
                    <Input 
                        fluid 
                        type='text' 
                        name='message' 
                        placeholder='Type Message' 
                        label='+'  
                        value={this.state.message}
                        onChange={(event) => this.inputChangeHandler(event)}/>
                    <div className={classes.ButtonsContainer}>
                        <Button 
                            style={{width: "50%"}} 
                            disabled={this.state.message.trim().length === 0}
                            onClick={this.sendMessageHandler}
                            loading={this.state.isLoading}>Send Message</Button>
                        <Button style={{width: "50%"}}>Upload Media</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(MessagePanel);

