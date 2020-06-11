
import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../firebase';
import Spinner from '../../components/UI/Spinner';

class Layout extends Component{

    componentDidMount(){
        console.log(this.props);
    }

    render(){
        let layout = <div>Layout</div>;
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

export default connect(mapStateToProps)(Layout);