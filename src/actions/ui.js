
import * as actionTypes from './actionTypes';

export const showModal = () => {
    return {
        type: actionTypes.SHOW_MODAL
    }
}

export const hideModal = () => {
    return {
        type: actionTypes.HIDE_MODAL
    }
}

export const showBackdrop = () => {
    return {
        type: actionTypes.SHOW_BACKDROP
    }
}

export const hideBackdrop = () => {
    return {
        type: actionTypes.HIDE_BACKDROP
    }
}