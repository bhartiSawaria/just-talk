
import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';

import classes from './SidePanel.module.css';
import UserPanel from '../UserPanel/UserPanel';

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
                    <UserPanel />   
                </div>
            </div>
        )
    }
}

export default SidePanel;