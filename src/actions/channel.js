
import * as actionTypes from './actionTypes';

export const setChannel = (channel) => {
    return {
        type: actionTypes.SET_CHANNEL,
        channel: channel
    }
}

export const clearChannel = () => {
    return {
        type: actionTypes.CLEAR_CHANNEL
    }
}