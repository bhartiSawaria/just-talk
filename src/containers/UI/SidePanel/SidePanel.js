
import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';

import classes from './SidePanel.module.css';
import UserPanel from '../UserPanel/UserPanel';

class SidePanel extends Component{

    render(){
        return(
            <div className={classes.RootContainer}>
                <Grid>
                    <Grid.Column>
                        <Grid.Row>
                            <Icon name='wechat' size='huge'/>
                            <span className={classes.SiteName}>Just Talk</span>
                            <hr />
                        </Grid.Row>
                        <Grid.Row>
                            <UserPanel />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SidePanel;