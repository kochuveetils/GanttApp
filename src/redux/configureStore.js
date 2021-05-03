import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Duties } from './duty';
import { Sectors } from './sector';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { InitialFeedback } from './forms';
// import { Headlines } from './headlines';
// import { Weather } from './weather';
// import { Fortnights } from './fortnights';
// import { Payperiods } from './payperiods';

export default function configureStore() {
    const store = createStore(
        combineReducers({
            duties: Duties,
            sectors: Sectors,
            // credits: Credits,
            // headlines: Headlines,
            // weather: Weather,
            // fortnights: Fortnights,
            // payperiods: Payperiods,
            // feedbacks: Feedbacks,
            // users: Users,
            // auth: Auth
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}