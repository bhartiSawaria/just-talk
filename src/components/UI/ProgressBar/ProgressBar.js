
import React from 'react';
import { Progress } from 'semantic-ui-react';

const progressBar = (props) => {
    // console.log('percent ', props.percent);
    return (
        <Progress percent={props.percent} size='tiny' color='green'/>
    )
};

export default progressBar;