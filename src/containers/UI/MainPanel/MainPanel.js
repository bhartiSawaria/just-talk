
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MainPanel.module.css';
import MessagePanel from '../MessagePanel/MessagePanel';
import MetaPanel from '../MetaPanel/MetaPanel';
import Spinner from '../../../components/UI/Spinner';

class MainPanel extends Component {

    render(){
        let contents = <Spinner />;
        if(this.props.channel){
            contents = (
                <div className={classes.RootContainer}>
                    <MessagePanel channel={this.props.channel}/>
                    <MetaPanel />
                </div>
            )
        }
        return (
            <React.Fragment>
                {contents}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(MainPanel);