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

export const fetchDuties = (dutyfilter) => (dispatch) => {
    console.log('Duty filter in fetchDuties');
    console.log(dutyfilter);


    console.log(dutyfilter?.contract)
    dispatch(dutiesLoading(true));
    console.log('Before fetching gantt are');
    var reqstring = ''
    if (dutyfilter?.staffnum) {
        reqstring = baseUrl + 'gantt?staff=' + dutyfilter?.staffnum + '&legality=' + dutyfilter?.legality;
    }
    else {
        reqstring = baseUrl + 'gantt?enddate=' + dutyfilter?.enddate + '&strdate=' + dutyfilter?.strdate + '&contract_cd=' + dutyfilter?.contract + '&base=' + dutyfilter?.base + '&rank_cd=' + dutyfilter?.rank + '&legality=' + dutyfilter?.legality;
    }


    // ?enddate=' + dutyfilter.enddate
    // return fetch(baseUrl + 'gantt?enddate=' + dutyfilter?.enddate + '&strdate=' + dutyfilter?.strdate + '&contract_cd=' + dutyfilter?.contract + '&base=' + dutyfilter?.base + '&rank_cd=' + dutyfilter?.rank + '&legality=' + dutyfilter?.legality)
    return fetch(reqstring)
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
            console.log(dutyfilter)
            if (dutyfilter === undefined) {
                localStorage.removeItem('rundates');
                console.log('Empty Duty Filter')
                localStorage.setItem('rundates', JSON.stringify({
                    runstrdate: (duties.length === 0) ? '' : duties[0].runstrdate,
                    runenddate: (duties.length === 0) ? '' : duties[0].runenddate
                }));
            }

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