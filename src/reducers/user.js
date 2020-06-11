
import * as actionTypes from '../actions/actionTypes';

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialUserState, action) => {
    console.log('state', state);
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                currentUser: action.user,
                isLoading: true
            }
        default:
            return state;
    }  
};

export default userReducer;