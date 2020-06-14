
import * as actionTypes from '../actions/actionTypes';

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialUserState, action) => {
    // console.log('state', state);
    switch(action.type){
        case actionTypes.SET_USER:
            let newState = {
                currentUser: action.user,
                isLoading: false
            }
            return newState
        case actionTypes.CLEAR_USER_DATA:
            return {
                currentUser: null,
                isLoading: true
            }
        default:
            return state;
    }  
};

export default userReducer;