
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import classes from './SidePanel.module.css';
import UserPanel from './UserPanel/UserPanel';
import DirectMessages from './DirectMessages/DirectMessages';

class SidePanel extends Component{
    render(){
        return(
            <div className={classes.RootContainer}>
                <div className={classes.ItemsContainer}>
                    <div>
                        <Icon name='wechat' size='huge'/>
                        <span className={classes.SiteName}>Just Talk</span>
                        <hr />
                    </div>    
                    <UserPanel user={this.props.user} channel={this.props.channel}/>  
                    <DirectMessages user={this.props.user} channel={this.props.channel}/> 
                </div>
            </div>
        )
    }
}

export default SidePanel;