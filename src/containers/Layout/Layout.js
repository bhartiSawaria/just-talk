
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Spinner from '../../components/UI/Spinner';
import SidePanel from '../UI/SidePanel/SidePanel';
import MainPanel from '../UI/MainPanel/MainPanel';

class Layout extends Component{
    render(){
        let layout = (
            <div className={classes.RootContainer}>
                <SidePanel user={this.props.user} channel={this.props.channel} isPrivateChannel={this.props.isPrivateChannel}/>
                <MainPanel user={this.props.user} channel={this.props.channel} isPrivateChannel={this.props.isPrivateChannel}/>
            </div>
        )
        if(this.props.loading){
            layout = <Spinner />
        }
        return(
            <div>
                {layout}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.user.isLoading,
        user: state.user.currentUser,
        channel: state.channel.currentChannel,
        isPrivateChannel: state.channel.isPrivateChannel
    }
}

export default connect(mapStateToProps)(Layout);