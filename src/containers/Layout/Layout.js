
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Spinner from '../../components/UI/Spinner';
import SidePanel from '../UI/SidePanel/SidePanel';
import MessagePanel from '../UI/MessagePanel/MessagePanel';
import * as actionCreators from '../../actions/index';


class Layout extends Component{

    render(){
        console.log('In render of Layout.js');
        let layout = <Grid>
                        <Grid.Column width={4}>
                            <SidePanel />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <MessagePanel />
                        </Grid.Column>
                    </Grid>;
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
        loading: state.user.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      setUserHandler: (user) => dispatch(actionCreators.setUser(user))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Layout);