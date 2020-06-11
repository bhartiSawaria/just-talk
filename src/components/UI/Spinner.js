
import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const spinner = (props) => {
    return (
        <Dimmer active>
            <Loader size='huge' content="Preparing chat"/>
        </Dimmer>
    );
}

export default spinner;