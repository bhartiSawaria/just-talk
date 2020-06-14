
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
        showModal: false
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
        console.log('In componentDidMount of UserPanel.js');
        this.setState({user: this.props.user})
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

    render(){
        let userName = null;
        let avatar = null;
        if( this.state.user && this.props.user ){
            userName = this.state.user.displayName
            avatar = this.state.user.photoURL
        }

        let modal = null;
        console.log('the value of showmodal is: ', this.props.showModal);
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
                    <div className={classes.Channel}>
                        <Icon name='exchange'/>
                        <div style={{display: 'inline-block', marginLeft: '8px', marginRight: '20px'}}>CHANNELS</div>
                        <Icon name='add' onClick={this.addChannelHandler}/>
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
        showBackdrop: state.userInterface.showBackdrop
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        showModalHandler: () => dispatch(actionCreators.showModal()),
        showBackdropHandler: () => dispatch(actionCreators.showBackdrop())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
// export default UserPanel;