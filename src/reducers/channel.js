
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChannel: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CHANNEL:
            console.log('Channel loaded', action.channel);
            return {
                currentChannel: action.channel
            }
        case actionTypes.CLEAR_CHANNEL:
            return {
                currentChannel: null
            }
        default:
            return state;
    }
}

export default reducer;