import immutable from 'immutable'
import recoderHandle from '../util/recorderHandle.js'

import { 
    SET_LEFT_MANAGER, 
    SET_RIGHT_MANAGER,
    SET_LOADING_STATE,
    PUSH_SNACKBAR,
    SHIFT_SNACKBAR,
    MESSAGE_CONTAINER_SCROLL,
} from '../constants/pageUI.js'
import browers from '../util/browers.js'

let defaultState = immutable.fromJS({
    leftManagerState: {isShow: false},
    rightManagerState: {isShow: true, state: 'invite'},
    language: browers.language,
    loadingState: {isShow: false, text: ''},
    isSupportRecorder: recoderHandle.isSupport,
    snackbars: [],
    msgContainerScroll: {needScroll: true, _id: Date.now()}
});

export default function reducer(state = defaultState,action) {
    switch (action.type) {
        case SET_LEFT_MANAGER: {
            return state.set('leftManagerState',immutable.fromJS(action.payload));
        }
        case SET_RIGHT_MANAGER: {
            return state.set('rightManagerState',immutable.fromJS(action.payload));
        }
        case SET_LOADING_STATE: {
            return state.set('loadingState',immutable.fromJS(action.payload));
        }
        case PUSH_SNACKBAR: {
            let snackbars = state.get('snackbars').push(action.payload);
            return state.set('snackbars',snackbars);
        }
        case SHIFT_SNACKBAR: {
            let snackbars = state.get('snackbars');
            return state.set('snackbars',snackbars.slice(1,4));
        }
        case MESSAGE_CONTAINER_SCROLL: {
            return state.set('msgContainerScroll',immutable.fromJS({needScroll: action.payload, _id: Date.now()}))
        }
        default: {
            return state;
        }
    }
}