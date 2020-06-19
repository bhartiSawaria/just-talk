
import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';

import classes from './MessagePanel.module.css';
import firebase from '../../../firebase';
import Message from './Message/Message';
import Spinner from '../../../components/UI/Spinner';
import ModalComponent from '../../../components/UI/Modal/Modal';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import UploadMedia from './UploadMedia/UploadMedia';

class MessagePanel extends Component{
    state = {
        message: '',
        isLoading: true,
        allMessages: [],
        publicMessagesRef: firebase.database().ref('publicMessages'),
        privateMessagesRef: firebase.database().ref('privateMessages'),
        showModal: false,
        showBackdrop: false,
        searchKeyword: ''
    }

    componentDidMount() {
        const { channel, user } = this.props;
    
        if (channel && user) {
          this.showMessagesListener(channel.id);
        }   
    }

    componentWillUnmount(){
        const ref = this.getMessagesRef();
        ref.off();
    }

    getMessagesRef = () => {
        if( this.props.isPrivateChannel ){
            return this.state.privateMessagesRef;
        }
        return this.state.publicMessagesRef;
    }

    showModalHandler = () => this.setState({showModal: true});

    hideModalHandler = () => this.setState({showModal: false});

    showBackdropHandler = () => this.setState({showBackdrop: true});

    hideBackdropHandler = () => this.setState({showBackdrop: false});
    
    showMessagesListener = channelId => {
        this.setState({ isLoading: true});
        const ref = this.getMessagesRef();
        ref.child(channelId).on("value", snap => {
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
        const ref = this.getMessagesRef();
        ref.child(this.props.channel.id)
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

    uploadMediaHandler = () => {
        this.showModalHandler();
        this.showBackdropHandler();
    }

    backdropClickHandler = () => {
        this.hideBackdropHandler()
        this.hideModalHandler();
    }

    searchKeywordChangeHandler = (event) => {
        const typedValue = event.target.value
        this.setState({searchKeyword: typedValue});
        const regrex = new RegExp(typedValue, 'gi');
        const displayedMessages = [...this.state.allMessages];
        const searchResults = displayedMessages.reduce((acc, msg) => {
            if( msg.content && msg.content.match(regrex)){
                acc.push(msg);
            }
            return acc;
        }, []);
        this.setState({allMessages: searchResults});
    }

    render(){
        let channelName = '...';
        if(this.props.channel && this.props.channel.channelName){
            channelName = this.props.channel.channelName;
        }
        let messages = null;
        messages = this.state.allMessages.map(message => {
            return <Message key={message.timestamp} msg={message} />
        });

        if(this.state.isLoading){
            messages = <Spinner />
        }

        let modal = null;
        if( this.state.showModal ){
            modal = (
                <div className={classes.ModalContainer}>
                    <Backdrop backdropClick={this.backdropClickHandler}/>
                    <ModalComponent>
                        <UploadMedia 
                                hideBackdrop={this.hideBackdropHandler} 
                                hideModal={this.hideModalHandler}
                                channel={this.props.channel}
                                isPrivateChannel={this.props.isPrivateChannel}
                                user={this.props.user}
                                messagesRef={this.getMessagesRef()}/>
                    </ModalComponent>
                </div>
            )
        }

        return(
            <React.Fragment>
                {modal}
                <div className={classes.RootContainer}>
                    <div className={classes.MessagesHeader}>
                        <h1>{channelName}</h1>
                        <Input
                            icon='search'
                            type='text'
                            name='searchMessage'
                            placeholder='Search Message'
                            value={this.state.searchKeyword}
                            onChange={this.searchKeywordChangeHandler}/>
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
                            <Button 
                                style={{width: "50%"}}
                                onClick={this.uploadMediaHandler}>Upload Media</Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MessagePanel;

