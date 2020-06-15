
import { combineReducers } from 'redux';

import userReducer from './user';
import uiReducer from './ui';
import channelReducer from './channel';

const rootReducer = combineReducers({
    user: userReducer,
    userInterface: uiReducer,
    channel: channelReducer
});

export default rootReducer;