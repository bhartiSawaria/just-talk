
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChannel: null,
    isPrivateChannel: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CHANNEL:
            return {
                currentChannel: action.channel,
                isPrivateChannel: false
            }
        case actionTypes.CLEAR_CHANNEL:
            return {
                currentChannel: null,
                isPrivateChannel: false
            }
        case actionTypes.SET_PRIVATE_CHANNEL:
            return {
                currentChannel: action.channel,
                isPrivateChannel: true
            }
        default:
            return state;
    }
}

export default reducer;