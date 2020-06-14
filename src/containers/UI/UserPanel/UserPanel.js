
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Image } from 'semantic-ui-react';

import classes from './UserPanel.module.css';
import firebase from '../../../firebase';

class UserPanel extends Component{

    state = {
        user: null
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

    render(){
        let userName = null;
        let avatar = null;
        if( this.state.user && this.props.user ){
            userName = this.state.user.displayName
            avatar = this.state.user.photoURL
        }
        else{
            console.log('State user', this.state.user);
            console.log('Props user', this.props.user);
        }
        console.log('In render of UserPanel.js');
        return(
            <div className={classes.RootContainer}> 
                {/* <Icon name='user circle' size='big' /> */}
                <Image src={avatar} avatar spaced='right'/>
                <Dropdown 
                    trigger={userName}
                    options={this.selectOptions()} 
                    style={{fontSize: '18px', marginLeft: '8px'}} />      
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('currrent user is', state.user);
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(UserPanel);
// export default UserPanel;