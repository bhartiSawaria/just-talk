
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import classes from './Layout.module.css';
import Spinner from '../../components/UI/Spinner';
import SidePanel from '../UI/SidePanel/SidePanel';
import MainPanel from '../UI/MainPanel/MainPanel';
import * as actionCreators from '../../actions/index';

class Layout extends Component{

    render(){
        let layout = (
            <div className={classes.RootContainer}>
                <SidePanel />
                <MainPanel />
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
        loading: state.user.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      setUserHandler: (user) => dispatch(actionCreators.setUser(user))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Layout);