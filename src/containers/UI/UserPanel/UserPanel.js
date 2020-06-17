
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Image } from 'semantic-ui-react';

import classes from './UserPanel.module.css';
import firebase from '../../../firebase';
import Modal from '../../../components/UI/Modal/Modal';
import AddChannel from '../../Channels/AddChannel/AddChannel';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import * as actionCreators from '../../../actions/index';

class UserPanel extends Component{

    state = {
        user: null,
        allChannels: [],
        // activeChannelId: null
    }

    selectOptions = () => ([
        {
            key: "user",
            text: <span>Sign in as Bharti</span>,
            disable: 'true'
        },
        {
            key: 'avatar',
            text: <span>Change avatar</span>
        },
        {
            key: 'Sign Out',
            text: <div onClick={this.signOutHandler}>Logout</div>
        }
    ])

    componentDidMount() {
        this.setState({user: this.props.user})
        firebase
            .database()
            .ref('channels')
            .once('child_added', snap => {
                this.props.onChannelClick(snap.val());
            })

        firebase
            .database()
            .ref('channels')
            .on('child_added', snap => {
                this.setState({allChannels: this.state.allChannels.concat(snap.val())});
            })
    }

    componentWillUnmount() {
        firebase.database().ref('channels').off();
    } 

    signOutHandler = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('User signed out');
            })
            .catch(err => {
                console.log(err);
            })
    }

    addChannelHandler = () => {
        this.props.showModalHandler();
    }

    channelClickHandler = (channel) => {
        this.props.onChannelClick(channel);
    }

    render(){
        let userName = null;
        let avatar = null;
        if( this.state.user && this.props.user ){
            userName = this.state.user.displayName
            avatar = this.state.user.photoURL
        }

        let channelList = null;
        if( this.state.allChannels.length > 0 ){
            channelList = (
                this.state.allChannels.map((channel, index) => {
                    const cssClass = [classes.Channel];
                    if(this.props.currentChannel && this.props.currentChannel.id == channel.id){
                        cssClass.push(classes.Active);
                    }
                    return (
                        <div key={index} className={cssClass.join(' ')} onClick={() => this.channelClickHandler(channel)}>{channel.channelName}</div>
                    )
                })
            )
        }

        let modal = null;
        if(this.props.showModal){
            modal = (
                <div>
                    <Backdrop />
                    <Modal>
                        <AddChannel />
                    </Modal>
                </div>
            )
        }
        return(
            <React.Fragment>
                {modal}
                <div className={classes.RootContainer}> 
                    {/* <Icon name='user circle' size='big' /> */}
                    <div>
                        <Image src={avatar} avatar spaced='right'/>
                        <Dropdown 
                            trigger={userName}
                            options={this.selectOptions()} 
                            style={{fontSize: '18px', marginLeft: '8px'}} /> 
                    </div>     
                    <div className={classes.Channels}>
                        <Icon name='exchange'/>
                        <div style={{display: 'inline-block', marginLeft: '8px', marginRight: '20px'}}>CHANNELS</div>
                        <Icon name='add' onClick={this.addChannelHandler}/>
                        <div className={classes.ChannelListContainer}>{channelList}</div>
                    </div>
                   
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('currrent user is', state.user);
    return {
        user: state.user.currentUser,
        showModal: state.userInterface.showModal,
        showBackdrop: state.userInterface.showBackdrop,
        currentChannel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        showModalHandler: () => dispatch(actionCreators.showModal()),
        showBackdropHandler: () => dispatch(actionCreators.showBackdrop()),
        onChannelClick: (channel) => dispatch(actionCreators.setChannel(channel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
// export default UserPanel;