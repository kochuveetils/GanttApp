import * as ActionTypes from './ActionTypes';
// import { baseUrl } from '../baseUrl';
import { baseUrl } from '../baseUrl';

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
    console.log('Buffer UNDER ' + dutyfilter?.bufferunder);
    if (dutyfilter?.bufferunder) {
        console.log('BUFFER DEFINED')
    }
    else {
        console.log('BUFFER UNNNNDEFINED')
    }
    dispatch(dutiesLoading(true));
    console.log('Before fetching gantt are');
    var reqstring = ''
    if (dutyfilter?.staffnum && Number(dutyfilter.bufferunder) !== 0) {
        if (dutyfilter?.bufferunder) {
            console.log('BUFFER DEFINED')
            reqstring = baseUrl + 'gantt?staff=' + dutyfilter?.staffnum + '&legality=' + 'true';
        }
        else {
            console.log('BUFFER UNNNNDEFINED')
            reqstring = baseUrl + 'gantt?staff=' + dutyfilter?.staffnum + '&legality=' + dutyfilter?.legality;
        }

        // reqstring = baseUrl + 'gantt?staff=' + dutyfilter?.staffnum + '&legality=' + dutyfilter?.legality;
    }
    else {

        if (dutyfilter?.bufferunder && Number(dutyfilter.bufferunder) !== 0) {
            console.log('BUFFER DEFINED')
            reqstring = baseUrl + 'gantt?enddate=' + dutyfilter?.enddate + '&strdate=' + dutyfilter?.strdate + '&contract_cd=' + dutyfilter?.contract + '&base=' + dutyfilter?.base + '&rank_cd=' + dutyfilter?.rank + '&legality=' + 'true';
        }
        else {
            console.log('BUFFER UNNNNDEFINED')
            reqstring = baseUrl + 'gantt?enddate=' + dutyfilter?.enddate + '&strdate=' + dutyfilter?.strdate + '&contract_cd=' + dutyfilter?.contract + '&base=' + dutyfilter?.base + '&rank_cd=' + dutyfilter?.rank + '&legality=' + dutyfilter?.legality;
        }

        // reqstring = baseUrl + 'gantt?enddate=' + dutyfilter?.enddate + '&strdate=' + dutyfilter?.strdate + '&contract_cd=' + dutyfilter?.contract + '&base=' + dutyfilter?.base + '&rank_cd=' + dutyfilter?.rank + '&legality=' + dutyfilter?.legality;
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
            var dutyarray = [];
            if (dutyfilter?.bufferunder && Number(dutyfilter.bufferunder) !== 0) {
                console.log('BUFFER, Checking with buffer on duties');
                dutyarray = duties.map((duty) => {

                    if (duty.maxfdp !== '9999') {
                        duty.fdpbufferunder = (duty.maxfdp * ((100 - dutyfilter.bufferunder) / 100)).toFixed(2);
                        if (duty.maxfdp * ((100 - dutyfilter.bufferunder) / 100) < duty.actfdp) {
                            if (duty.legal !== 'I')
                                duty.buffer = 'U';
                            duty.legal = 'I';
                        }
                    }
                    else
                        duty.fdpbufferunder = duty.maxfdp;

                    // if (duty.maxfdp * ((100 - dutyfilter.bufferunder) / 100) < duty.actfdp) {
                    //     duty.fdpbufferunder = (duty.maxfdp * ((100 - dutyfilter.bufferunder) / 100)).toFixed(2);
                    //     duty.legal = 'I';
                    // }
                    // else {
                    //     // duty.bufferunder = dutyfilter.bufferunder;
                    //     if (duty.maxfdp != '9999')
                    //         duty.fdpbufferunder = (duty.maxfdp * ((100 - dutyfilter.bufferunder) / 100)).toFixed(2);
                    //     else
                    //         duty.fdpbufferunder = duty.maxfdp;
                    // }
                    return duty;
                }
                )
            }
            else {
                console.log('No BUFFER, passing duties');
                dutyarray = duties;
            }

            if (dutyfilter?.bufferunder && Number(dutyfilter.bufferunder) !== 0) {
                if (dutyfilter?.legality) {
                    return dutyarray;
                }
                else {
                    var dutyarrayillegal = dutyarray.filter((duty) => (duty.legal === 'I' || duty.legal === 'E'));
                    console.log('dutyarrayillegal')
                    console.log(dutyarrayillegal)
                    const dutyunique = [];
                    const map = new Map();
                    for (const item of dutyarrayillegal) {
                        if (!map.has(item.staff)) {
                            map.set(item.staff, true);    // set any value to Map
                            dutyunique.push(item.staff);
                        }
                    }
                    console.log('Unique')
                    console.log(dutyunique);

                    return dutyarray.filter((duty) => (dutyunique.includes(duty.staff)));
                    // return dutyarrayillegal;

                }
            }
            else {
                return dutyarray;
            }
            // return duties;

            // dispatch(addDuties(datarowsarray));
        })
        .then(duties => dispatch(addDuties(duties)))
        .catch(error => dispatch(dutiesFailed(error.message)));
};

export const sectorsLoading = () => ({
    type: ActionTypes.SECTOR_LOADING
});

export const sectorsFailed = (errmess) => ({
    type: ActionTypes.SECTOR_FAILED,
    payload: errmess
});

export const addSectors = (sectors) => ({
    type: ActionTypes.ADD_SECTOR,
    payload: sectors
});

export const fetchSectors = (sectorfilter) => (dispatch) => {
    console.log('Sector filter in fetchSectors');
    console.log(sectorfilter);


    dispatch(sectorsLoading(true));
    console.log('Before fetching Sector are');
    var reqstring = baseUrl + 'duty?seriesnum=' + sectorfilter?.seriesnum + '&dutyseqnum=' + sectorfilter?.dutyseqnum;

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
        .then(sectors => {
            console.log('Gantt Sectors are');
            console.log(sectors);
            return sectors;

            // dispatch(addDuties(datarowsarray));
        })
        .then(sectors => dispatch(addSectors(sectors)))
        .catch(error => dispatch(sectorsFailed(error.message)));
};