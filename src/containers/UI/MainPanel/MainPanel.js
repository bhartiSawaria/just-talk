
import React, { Component } from 'react';

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
                    <MessagePanel 
                        key={this.props.channel && this.props.channel.id} 
                        channel={this.props.channel} 
                        isPrivateChannel={this.props.isPrivateChannel}
                        user={this.props.user}/>
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


export default MainPanel;