
import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import mime from 'mime-types';
import {v4 as uuidv4} from 'uuid';

import classes from './UploadMedia.module.css';
import firebase from '../../../../firebase';
import ProgressBar from '../../../../components/UI/ProgressBar/ProgressBar';

class UploadMedia extends Component {
    state = {
        file: null,
        errors: [],
        isLoading: false,
        storageRef : firebase.storage().ref(),
        supportedFiles: ['image/jpeg', 'image/png', 'image/jpg'],
        uploadTask: null,
        progress: 0,
        showProgress: false
    }

    isFileTypeSupported = (filename) => {
        console.log(this.state.supportedFiles.includes(mime.lookup(filename)));
        console.log(mime.lookup(filename));
        return this.state.supportedFiles.includes(mime.lookup(filename));
    }

    inputChangeHandler = (event) => {
        const file = event.target.files[0];
        if(file){
            this.setState({file});
        }
        else{
            this.setState({file: null});
        }
    }

    uploadProceedHandler = (event) => {
        const {file, storageRef, errors} = this.state;
        const { channel, isPrivateChannel } = this.props;
        event.preventDefault();
        if(file && this.isFileTypeSupported(file.name)){
            console.log('Proceed to upload');
            const temp = isPrivateChannel ? `private/${channel.id}` : 'public';
            const filePath = `chat/${temp}/${uuidv4()}.jpg`;
            const metaData = {
                contentType: mime.lookup(file.name)
            }
            this.setState({
                uploadTask: storageRef.child(filePath).put(file, metaData),
                isLoading: true,
                showProgress: true
            }, () => {
                this.state.uploadTask.on('state_changed', snapshot => {
                    const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100) ;
                    console.log('Progress: ', progress);
                    this.setState({progress});
                }, err => {
                    this.setState({errors: errors.append(err), isLoading: false})
                }, () => {
                    this.state.uploadTask.snapshot.ref.getDownloadURL().then(url => {
                        this.sendFileMessage(url)
                    })
                })
            })
        }
        else{
            console.log('Cannot proceed');   
        }
    }

    sendFileMessage = (imageUrl) => {
        this.props.messagesRef
            .child(this.props.channel.id)
            .push()
            .set({
                image: imageUrl,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    id: this.props.user.uid,
                    name: this.props.user.displayName,
                    avatar: this.props.user.photoURL
                }
            })
            .then(() => {
                this.setState({file: null, isLoading: false});
                this.props.hideModal();
                this.props.hideBackdrop();
            })
            .catch(err => {
                console.log(err);
                this.setState({file: null, isLoading: false});
            })
            
    }

    uploadCancelHandler = () => {
        this.props.hideModal();
        this.props.hideBackdrop();
    }

    render(){
        let progress = null;
        if( this.state.showProgress ){
            progress = <ProgressBar percent={this.state.progress} />
        }
        return (
            <div className={classes.RootContainer}>
                <form>
                    <Input 
                        fluid
                        type='file'
                        name='file'
                        onChange={(event) => this.inputChangeHandler(event)}/>
                    <Button 
                        inverted
                        color='green'
                        loading={this.state.isLoading}
                        style={{margin: '16px 8px'}} 
                        onClick={(event) => this.uploadProceedHandler(event)}>Upload</Button>
                    <Button 
                        inverted
                        color='red'
                        style={{margin: '16px 8px'}} 
                        onClick={(event) => this.uploadCancelHandler(event)}>Cancel</Button>
                    {progress}
                </form>
            </div>
        );
    }
};

export default UploadMedia;