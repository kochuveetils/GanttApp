import * as ActionTypes from './ActionTypes';


export const Sectors = (state = {
    isLoading: false,
    errMess: null,
    sectors: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SECTOR:
            return { ...state, isLoading: false, errMess: null, sectors: action.payload };
        case ActionTypes.SECTOR_LOADING:
            return { ...state, isLoading: true, errMess: null, sectors: [] };
        case ActionTypes.SECTOR_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, sectors: [] };

        default:
            return state;
    }
}