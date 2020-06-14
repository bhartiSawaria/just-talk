import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showModal: false,
    showBackdrop: false
}

const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SHOW_MODAL:
            return{
                ...state,
                showModal: true
            }
        case actionTypes.HIDE_MODAL:
            return{
                ...state,
                showModal: false
            }
        case actionTypes.SHOW_BACKDROP:
            return{
                ...state,
                showBackdrop: true
            }
        case actionTypes.HIDE_BACKDROP:
            return{
                ...state,
                showBackdrop: false
            }
        default:
            return state; 
    }
}

export default uiReducer;