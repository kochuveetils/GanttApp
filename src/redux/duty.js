import * as ActionTypes from './ActionTypes';


export const Duties = (state = {
    isLoading: false,
    errMess: null,
    duties: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DUTY:
            return { ...state, isLoading: false, errMess: null, duties: action.payload };
        case ActionTypes.DUTY_LOADING:
            return { ...state, isLoading: true, errMess: null, duties: [] };
        case ActionTypes.DUTY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, duties: [] };

        default:
            return state;
    }
}