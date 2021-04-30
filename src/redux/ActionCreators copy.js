import * as ActionTypes from './ActionTypes';
// import { baseUrl } from '../baseUrl';
import { baseUrl, illegalcolor, dutytypemap } from '../baseUrl';

export const dutiesLoading = () => ({
    type: ActionTypes.DUTY_LOADING
});

export const dutiesFailed = (errmess) => ({
    type: ActionTypes.DUTY_FAILED,
    payload: errmess
});

export const addDuties = (duties) => ({
    type: ActionTypes.ADD_DUTY,
    payload: duties
});

export const fetchDuties = () => (dispatch) => {
    dispatch(dutiesLoading(true));
    console.log('Before fetching gantt are');
    return fetch(baseUrl + 'gantt')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(duties => {
            console.log('Gantt duties are');
            console.log(duties);

            // const datarowsarray = duties.map(
            //     (duty) => (
            //         [
            //             duty.staff,
            //             duty.seriesnum + '-' + duty.dutycategory,
            //             // null,
            //             // duty.dutycategory,
            //             // dutytypemap.filter((dutymap) => (dutymap.dutytype === duty.dutytype))[0].color,
            //             (duty.legal === 'L') ? (
            //                 dutytypemap.filter((dutymap) => (dutymap.dutytype === duty.dutytype))[0].color
            //             ) : illegalcolor,
            //             // (duty.legal === 'L') ? legalcolor : illegalcolor,                        
            //             'Max:' + duty.maxfdp + ' Act:' + duty.actfdp,
            //             new Date(Date.parse(duty.signonbne)),
            //             new Date(Date.parse(duty.signoffbne))
            //         ]
            //     )
            // );
            // console.log('duties fetched from');
            // console.log(duties);
            return duties;

            // dispatch(addDuties(datarowsarray));
        })
        .then(duties => dispatch(addDuties(duties)))
        .catch(error => dispatch(dutiesFailed(error.message)));
};