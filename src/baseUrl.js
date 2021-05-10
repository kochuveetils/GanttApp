export const baseUrl = 'http://localhost:3000/';
export const refresh = true;
export const refreshinterval = 90;

export const options = {
    timeline: {
        rowLabelStyle: {
            fontName: 'Helvetica',
            fontSize: 15,
            color: '#603913'
        }
    },
    hAxis: {
        // format: 'dMMM',
        // format: 'M/d/yy',
        // gridlines: {
        //     count: -1,
        //     units: {
        //         days: { format: ['ddMM'] },
        //         hours: { format: ['HH:mm', 'ha'] },
        //     }
        // }
    },
    // gridlines: {
    //     count: -1,
    //     units: {
    //         days: { format: ['MMM dd'] },
    //         hours: { format: ['HH:mm', 'ha'] },
    //     }
    // },
    // allowHtml: false,
    tooltip: {
        isHtml: true,
        trigger: 'focus'
    },
    backgroundColor: '#e8e7e3',
    // backgroundColor: '#ffd',

    // barLabelStyle: { fontName: 'Garamond', fontSize: 14 },
};

export const legalcolor = 'green';
// export const illegalcolor = '#F82B46';
export const illegalcolor = 'red';
export const illegalbundercolor = '#f78395';

export const dutytypemap = [
    { color: '#00cefc', dutytype: 'FLY' },
    { color: '#F435B9 ', dutytype: 'TVL' },
    { color: '#fca400', dutytype: 'GRD' },
    { color: '#1FAB42 ', dutytype: 'SBY' },
    { color: '#F8F22B ', dutytype: 'LVE' },
    { color: '#2BF88B', dutytype: 'DDO' }
];

export const datatablecols =
    [
        { type: 'string', id: 'Position' },
        // { type: 'string', id: 'dummy bar label' },
        { type: 'string', id: 'Name' },
        { type: 'string', role: 'style' },
        { type: 'string', role: 'fdp' },
        { type: 'string', role: 'tooltip', 'p': { 'html': true } },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' }
    ];

export const datatablecols1 =
    [
        { type: 'string', id: 'Position' },
        { type: 'string', id: 'Name' },
        { type: 'string', role: 'tooltip' },
        { type: 'string', role: 'style' },
        { type: 'string', role: 'fdp' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' }
    ];


export const timeconvmmss = (minutes) => {
    var sign = minutes < 0 ? "-" : "";
    var min = Math.floor(Math.abs(minutes));
    var sec = Math.round((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}



