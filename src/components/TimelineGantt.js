import '../App.css';
import React from 'react';
import Chart from "react-google-charts";
import { options, datatablerows, datatablecols, illegalcolor, dutytypemap } from '../baseUrl';
// import { Row, Col } from 'reactstrap';
import { Loading } from './LoadingComponent';
import {
    Col, Row
} from 'reactstrap';

import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Table
} from 'reactstrap';





// const chartEvents = [
//     {
//         eventName: 'select',
//         callback: ({ chartWrapper }) => {
//             console.log("Chart is selected")
//             const chart = chartWrapper.getChart()
//             const selection = chart.getSelection()
//             if (selection.length === 1) {
//                 const [selectedItem] = selection
//                 const dataTable = chartWrapper.getDataTable()
//                 console.log(dataTable);
//                 const { row } = selectedItem
//                 this.toggleDutyModal();
//                 // alert(
//                 //     'You selected : ' +
//                 //     JSON.stringify(
//                 //         {
//                 //             value: dataTable.getValue(row, 3),
//                 //         }
//                 //     ),
//                 //     null,
//                 //     2,
//                 // )
//             }
//         },
//     },
//     {
//         eventName: 'error',
//         callback: ({ chartWrapper }) => {
//             alert('Error');
//         },
//     },
//     {
//         eventName: 'ready',
//         callback: ({ chartWrapper }) => {
//             alert('Chart is ready');
//         },
//     },
// ];

// const datarows = datatablerows.map(
//     // const datarows = this.props.duties.duties.map(
//     (duty) => (
//         [
//             duty.staff,
//             duty.seriesnum,
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

class Timeline extends React.Component {
    state = {
        isDutyOpen: false,
        isSectorOpen: false,
        dutydetails: {}
    };

    componentDidMount() {
        console.log('componentDidMount TIMELINE');
    }


    // componentDidMount() {
    //     this.props.fetchDuties();
    //     // this.interval = setInterval(this.getTimeline, 10000); // <- time in ms
    // }

    // stopInterval = () => {
    //     clearInterval(this.interval);
    // }

    // componentWillUnmount() {
    //     this.stopInterval();
    // }

    // incrementWidth = () => {
    //     console.log('Inside incrementWidth' + this.state.widthParam)
    //     this.setState({
    //         widthParam: this.state.widthParam + 1
    //     });

    //     if (this.state.widthParam % 2 == 0) {
    //         console.log('Increment' + this.state.widthParam + ' is EVEN');
    //         this.setState({
    //             datatable1rows: datatable1rows
    //         });
    //     }
    //     else {
    //         console.log('Increment' + this.state.widthParam + ' is ODD');
    //         this.setState({
    //             datatable1rows: datatable1rows
    //         });
    //     }
    // }

    // getTimeline = () => {
    //     console.log('Inside getTimeline' + this.state.widthParam)
    //     if (this.state.widthParam === 10) {
    //         console.log('Stoping Interval at ' + this.state.widthParam);
    //         this.stopInterval();
    //     }
    //     else {
    //         this.incrementWidth();
    //     }
    // }
    // getChart = (widthpar) => {
    //     console.log('inside getchart')
    //     return (<Chart
    //         width={'90%'}
    //         height={'200px'}
    //         chartType="Timeline"
    //         loader={<div>Loading Chart</div>}
    //         data={this.state.datatable}
    //         rootProps={{ 'data-testid': '3' }}
    //         options={options}
    //         chartEvents={chartEvents}
    //     />)
    // }

    chartEvents = [
        {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
                console.log("TIMELINE:Chart is selected")
                const chart = chartWrapper.getChart()
                const selection = chart.getSelection()
                if (selection.length === 1) {
                    const [selectedItem] = selection
                    const dataTable = chartWrapper.getDataTable()
                    console.log(dataTable);
                    const { row } = selectedItem

                    this.setModelValues({
                        staff: dataTable.getValue(row, 0),
                        seriesnum: dataTable.getValue(row, 1),
                        color: dataTable.getValue(row, 2),
                        fdp: dataTable.getValue(row, 3),
                        signonbne: dataTable.getValue(row, 5),
                        signoffbne: dataTable.getValue(row, 6)
                        // schedsectorenddt: duties.schedsectorenddt,
                        // schedsectorduration: duties.schedsectorduration.toFixed(2),
                        // actsectorduration: duties.actsectorduration.toFixed(2),
                        // seriesnum: duties.seriesnum,
                        // rosternum: duties.rosternum,
                        // arlncd: duties.arlncd,
                        // fltnum: duties.fltnum,
                        // dutycd: duties.dutycd,
                        // credit: duties.credit.toFixed(2),
                        // rosterdutycd: duties.rosterdutycd,
                        // dutyseqnum: duties.dutyseqnum,
                        // itemseqnum: duties.itemseqnum,
                        // tripstrdt: duties.tripstrdt,
                        // tripenddt: duties.tripenddt,
                        // signon: duties.signon,
                        // signoff: duties.signoff,
                        // crewtype: 'CC'
                    });

                    this.toggleDutyModal();
                    // alert(
                    //     'You selected : ' +
                    //     JSON.stringify(
                    //         {
                    //             value: dataTable.getValue(row, 3),
                    //         }
                    //     ),
                    //     null,
                    //     2,
                    // )
                }
            },
        },
        {
            eventName: 'error',
            callback: ({ chartWrapper }) => {
                alert('Error');
            },
        },
        {
            eventName: 'ready',
            callback: ({ chartWrapper }) => {
                // alert('Chart is ready');
            },
        },
    ];

    toggleDutyModal = () => {
        this.setState({
            isDutyOpen: !this.state.isDutyOpen,
            isSectorOpen: false
        });
    }

    setModelValues = (dutyval) => {
        console.log('TIMELINE:Inside Toggle setModelValues Details');
        this.setState({
            dutydetails: dutyval
        });
    }

    toggleSector = (series, dutyseq) => {
        this.setState({
            isSectorOpen: !this.state.isSectorOpen
        });
        if (!this.state.isSectorOpen)
            this.props.fetchSectors({ seriesnum: series, dutyseqnum: dutyseq });
    }

    showDuties = (sectors) => {
        if (sectors.isLoading) {
            return (
                <Loading />
            );
        }
        else if (sectors.errMess) {
            return (
                <tr>
                    <td>{sectors.errMess}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }
        else if (sectors.sectors.length > 0) {
            return (
                sectors.sectors.map((sectors) => {
                    return (
                        <tr key={sectors.dutyseqnum}>
                            <td className="sectordetail">{sectors.sectorstart}</td>
                            <td className="sectordetail">{sectors.sectorend}</td>
                            <td className="sectordetail">{sectors.flight}</td>
                            <td className="sectordetail">{sectors.dutycd}</td>
                            <td className="sectordetail">{sectors.sector}</td>
                        </tr>
                    )
                })
            );
        }
        else {
            return (
                <tr>
                    <td>Trip:No data found</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }

    }

    createCustomHTMLContent = (signon, actfdp, maxfdp, sector) => {
        var sday = new Intl.DateTimeFormat("en-GB", {
            // year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }).format(Date.parse(signon));
        var son = new Intl.DateTimeFormat("en-GB", {
            // year: "numeric",
            // month: "short",
            // day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }).format(Date.parse(signon));

        return '<div style="padding:5px 0px 5px 0px;">' +
            '<table class="medals_layout">'
            + '<tr>'
            + '<td><b>Sign: </b>' + sday + '</td>'
            + '</tr>'
            // + '<tr>'
            // + '<td><b>Sign: </b>' + son + '</td>'
            // + '</tr>'
            + '<tr>'
            + '<td><b>Duty: </b>' + sector + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td><b>FDP: </b>' + actfdp + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td><b>Max: </b>' + maxfdp + '</td>'
            + '</tr>'
            + '</table>'
            + '</div>';
    }


    renderChart = ({ isLoading, errMess, duties }) => {
        console.log('TIMELINE:Inside renderChart')
        if (isLoading) {
            return (
                <Loading />
            );
        }
        else if (errMess) {
            return (
                <h4>{errMess}</h4>
            );
        }
        else {
            // alert(this.props.duties.duties.length)
            // alert(duties.length)
            const datarowsarray = duties.map(
                (duty) => (
                    [
                        // duty.staff + '-' + duty.firstname,
                        duty.staff + '-' + duty.firstname + '-' + duty.base + duty.rank,
                        duty.acclmstatus,
                        // duty.seriesnum + '-' + duty.dutycategory,
                        // null,
                        // duty.dutycategory,
                        // dutytypemap.filter((dutymap) => (dutymap.dutytype === duty.dutytype))[0].color,
                        (duty.legal === 'L') ? (
                            dutytypemap.filter((dutymap) => (dutymap.dutytype === duty.dutytype))[0].color
                        ) : illegalcolor,
                        // (duty.legal === 'L') ? legalcolor : illegalcolor,                        
                        duty.maxfdp + (duty.dutyattribute ? duty.dutyattribute : '') + '_' + duty.actfdp + '_' + duty.restbef + '_' + duty.legal + '_' + duty.acclmstatus + '_' + duty.lastacclport + '_' + duty.sectorcount + '_' + duty.sector + '_' + duty.seriesnum + '_' + duty.dutyseqnum,
                        this.createCustomHTMLContent(duty.signonbne, duty.actfdp, duty.maxfdp + (duty.dutyattribute ? duty.dutyattribute : ''), duty.sector),
                        new Date(Date.parse(duty.signonbne)),
                        new Date(Date.parse(duty.signoffbne))
                    ]

                )
            );

            console.log('TIMELINE:Rendering Duties...');
            console.log(duties);
            // alert(duties);
            // console.log(this.props.duties.duties);
            return (
                <div>
                    <Chart
                        width={'99.5%'}
                        height={'800px'}
                        chartType="Timeline"
                        loader={<div>Loading Chart</div>}
                        // data={datatable}
                        columns={datatablecols}
                        rows={datarowsarray}
                        // rows={duties}
                        // rows={this.props.duties.duties}
                        // rows={datarows}
                        // columns={datatablecols1}                    
                        // rows={datatablerows1}
                        rootProps={{ 'data-testid': '3' }}
                        options={options}
                        chartEvents={this.chartEvents}
                    />

                    <Modal isOpen={this.state.isDutyOpen} toggle={this.toggleDutyModal}>
                        <ModalHeader className="bg-secondary text-white" toggle={this.toggleDutyModal}>
                            Duty Details
                               <Button style={{ marginLeft: "20px" }} color={"warning"} onClick={() => this.toggleSector(this.state.dutydetails.fdp.split('_')[8], this.state.dutydetails.fdp.split('_')[9])}>
                                {this.state.isSectorOpen ? 'Hide Duty Details' : 'Show Duty Details'}</Button>


                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.toggleDutyModal}>
                                <dl className="row p-1">
                                    <dt className="col-6">Staff</dt>
                                    <dd className="col-6">{this.state.dutydetails.staff}</dd>
                                    <dt className="col-6">Series</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[8] + ' D:' + this.state.dutydetails.fdp.split('_')[9] : ''}</dd>
                                    <dt className="col-6">Duty Start</dt>
                                    {/* <dd className="col-6">{Date.parse(this.state.dutydetails.signonbne)}</dd> */}
                                    <dd className="col-6">{new Intl.DateTimeFormat("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }).format(this.state.dutydetails.signonbne)} </dd>
                                    <dt className="col-6">Duty End</dt>
                                    <dd className="col-6">{new Intl.DateTimeFormat("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }).format(this.state.dutydetails.signoffbne)} </dd>
                                    {/* new Date(Date.parse(duty.signonbne))
                                    <dd className="col-6">{Date.parse(this.state.dutydetails.signonbne)} </dd>
                                    {/* new Date(Date.parse(this.state.dutydetails.signonbne)) */}
                                    {/* <dt className="col-6">Duty End</dt>
                                    <dd className="col-6">{new Intl.DateTimeFormat("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }).format(this.state.dutydetails.signoffbne)} </dd> */}
                                    {/* <dd className="col-6">{Date.parse(this.state.dutydetails.signoffbne)}</dd> */}
                                    <dt className="col-6">Duty</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[7] : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">Acclimaitsed</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? ((this.state.dutydetails.fdp.split('_')[4] === 'A') ? 'ACCLMATISED' : 'UNKNOWN') : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">Last Accl Port</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[5] : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">Rest Before</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[2] : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">Sectors</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[6] : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">Max FDP</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[0] : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">Actual FDP</dt>
                                    <dd className="col-6">{this.state.dutydetails.fdp ? this.state.dutydetails.fdp.split('_')[1] : this.state.dutydetails.fdp}</dd>
                                    <dt className="col-6">FDP Legal</dt>
                                    <dd className="col-6" style={{ color: this.state.dutydetails.fdp ? (this.state.dutydetails.fdp.split('_')[3] === 'L') ? 'blue' : 'red' : 'black' }}>{this.state.dutydetails.fdp ? ((this.state.dutydetails.fdp.split('_')[3] === 'L') ? 'LEGAL' : 'ILLEGAL') : this.state.dutydetails.fdp}</dd>
                                </dl>

                                {(this.state.isSectorOpen) ?
                                    <Table responsive striped bordered size="sm">
                                        <thead>
                                            <tr className="bg-secondary text-white">
                                                <th>Start</th>
                                                <th>End</th>
                                                <th>Flight</th>
                                                <th>Duty</th>
                                                <th>Sector</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.showDuties(this.props.sectors)}

                                        </tbody>
                                    </Table>
                                    : <div></div>
                                }

                            </Form>
                        </ModalBody>
                    </Modal>

                </div>
            )
        }

    };


    render() {
        console.log('Render TIMELINE');
        return (
            <div className="App">

                {/* {console.log(this.props.duties)} */}
                {this.renderChart(this.props.duties)}

            </div>
        );
    }
}

export default Timeline;