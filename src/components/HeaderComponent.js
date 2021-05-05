import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Col, Row
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { refreshinterval, refresh } from '../baseUrl';

// import ErrorBoundary from './ErrorBoundary';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            strdate: '',
            enddate: '',
            contract: 'ALL',
            rank: 'ALL',
            base: 'ALL',
            legality: false,
            staffnum: '',
            refreshcounter: 0,
            refreshstatus: true,
            time: {},
            seconds: refreshinterval,
            timer: 0
        };
        this.timer = 0;
    }

    componentDidMount() {
        console.log('componentDidMount HEADER');
        // this.interval = setInterval(this.getTimeline, 10000); // <- time in ms

        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
        // this.props.fetchDuties({
        //     strdate: this.state.strdate,
        //     enddate: this.state.enddate,
        //     contract: this.state.contract,
        //     base: this.state.base,
        //     rank: this.state.rank,
        //     legality: this.state.legality
        // });
    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        // console.log(obj)
        return obj;
    }

    startTimer = () => {
        // alert(this.state.timer)
        // alert(this.state.seconds)
        if (refresh) {
            if (this.state.timer == 0 && this.state.seconds > 0) {
                this.timer = setInterval(this.countDown, 1000);
            }
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if (seconds == 0) {
            // this.timer = 0;
            this.props.fetchDuties({
                strdate: this.state.strdate,
                enddate: this.state.enddate,
                contract: this.state.contract,
                base: this.state.base,
                rank: this.state.rank,
                legality: this.state.legality
            });
            let seconds = refreshinterval;
            let timer = 0;
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
                timer: timer
            });
        }

        // Check if we're at zero.
        if (!this.state.refreshstatus) {
            // if (seconds == 0) {
            // clearInterval(this.timer);
            this.stopInterval();

            // this.props.fetchDuties({
            //     strdate: this.state.strdate,
            //     enddate: this.state.enddate,
            //     contract: this.state.contract,
            //     base: this.state.base,
            //     rank: this.state.rank,
            //     legality: this.state.legality
            // });

        }
    }

    startInterval = () => {
        this.setState({
            refreshstatus: true
        });
        this.startTimer();
        // this.interval = setInterval(this.getTimeline, 10000); // <- time in ms
    }

    getTimeline = () => {
        console.log('Inside getTimeline' + this.state.refreshcounter)
        if (this.state.refreshcounter === 5) {
            console.log('Stoping Interval at ' + this.state.refreshcounter);
            this.stopInterval();
        }
        else {
            this.setState({
                refreshcounter: this.state.refreshcounter + 1
            });
            console.log('Refresh Counter ' + this.state.refreshcounter)
            // this.props.fetchDuties({
            //     strdate: this.state.strdate,
            //     enddate: this.state.enddate,
            //     contract: this.state.contract,
            //     base: this.state.base,
            //     rank: this.state.rank,
            //     legality: this.state.legality
            // });
        }
    }

    stopInterval = () => {
        this.setState({
            refreshstatus: false
        });
        console.log('Stoping Refresh interval at ' + this.state.refreshcounter);
        console.log('Refresh Status at ' + this.state.refreshstatus);
        // clearInterval(this.interval);
        clearInterval(this.timer);
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal = () => {
        console.log('Toggle Filter Modal isModalOpen: ' + this.state.isModalOpen);
        // this.setDateFilter();
        this.setState({
            // isModalOpen: !this.state.isModalOpen
            isModalOpen: !this.state.isModalOpen
            // strdate: (this.props.duties.duties.length === 0) ? this.state.strdate : this.props.duties.duties[0].runstrdate,
            // enddate: (this.props.duties.duties.length === 0) ? this.state.enddate : this.props.duties.duties[0].runenddate
        });
        // this.props.toggleLogin(!this.props.isLoginOpen);
        console.log('Toggle Filter Modal After isModalOpen: ' + this.state.isModalOpen);
    }

    handleFilter = (event) => {
        console.log('Inside handleFilter');
        var refreshgant = true;
        if (this.state.staffnum) {
            if (refreshgant) {
                // alert('Str' + this.state.strdate)
                // alert('End' + this.state.enddate)
                this.props.fetchDuties({
                    staffnum: this.state.staffnum,
                    legality: this.state.legality
                });
                this.toggleModal();
            }

        }
        else {
            var runstrdatemsec = Date.parse(JSON.parse(localStorage.getItem('rundates')).runstrdate);
            // var runstrdatemsec = Date.parse((this.props.duties.duties.length === 0) ? this.state.strdate : this.props.duties.duties[0].runstrdate);
            console.log(runstrdatemsec);
            var strdatemsec = Date.parse(this.state.strdate);
            console.log(strdatemsec);
            var runenddatemsec = Date.parse(JSON.parse(localStorage.getItem('rundates')).runenddate);
            // var runenddatemsec = Date.parse((this.props.duties.duties.length === 0) ? this.state.enddate : this.props.duties.duties[0].runenddate);
            console.log(runenddatemsec);
            var enddatemsec = Date.parse(this.state.enddate);
            console.log(enddatemsec);
            console.log('State Str Date :')
            console.log(this.state.strdate);
            console.log('State End Date :')
            console.log(this.state.enddate);
            console.log(this.state.contract);
            console.log(this.state.legality);
            console.log(this.state.legality);
            if (this.state.strdate !== '') {
                console.log('State Str Date Not null :' + this.state.strdate)
                console.log('getitem runstrdatemsec :' + JSON.parse(localStorage.getItem('rundates')).runstrdate)
                console.log('getitem runenddatemsec :' + JSON.parse(localStorage.getItem('rundates')).runenddate)
                console.log('runstrdatemsec :' + runstrdatemsec)
                console.log('runenddatemsec :' + runenddatemsec)
                console.log('runstrdatemsec :' + runstrdatemsec)
                console.log('runenddatemsec :' + runenddatemsec)
                console.log('strdatemsec :' + strdatemsec)
                if (strdatemsec < runstrdatemsec
                    || strdatemsec > runenddatemsec
                ) {
                    alert('Selected Start date out of range:' + JSON.parse(localStorage.getItem('rundates')).runstrdate + ' to ' + JSON.parse(localStorage.getItem('rundates')).runenddate);
                    refreshgant = false;
                }
            }

            if (this.state.enddate !== '') {
                console.log('State End Date Not null :' + this.state.enddate)
                console.log('getitem runstrdatemsec :' + JSON.parse(localStorage.getItem('rundates')).runstrdate)
                console.log('getitem runenddatemsec :' + JSON.parse(localStorage.getItem('rundates')).runenddate)
                console.log('runstrdatemsec :' + runstrdatemsec)
                console.log('runenddatemsec :' + runenddatemsec)
                console.log('enddatemsec :' + enddatemsec)

                if (enddatemsec < runstrdatemsec
                    || enddatemsec > runenddatemsec
                ) {
                    alert('Selected End date out of range:' + JSON.parse(localStorage.getItem('rundates')).runstrdate + ' to ' + JSON.parse(localStorage.getItem('rundates')).runenddate);
                    refreshgant = false;
                }
            }

            if (refreshgant) {
                // alert('Str' + this.state.strdate)
                // alert('End' + this.state.enddate)
                this.props.fetchDuties({
                    strdate: this.state.strdate,
                    enddate: this.state.enddate,
                    contract: this.state.contract,
                    base: this.state.base,
                    rank: this.state.rank,
                    legality: this.state.legality
                });
                this.toggleModal();
            }
        }

        // if ((this.props.duties.duties.length === 0) ? this.state.strdate : this.props.duties.duties[0].runstrdate > this.state.strdate
        //     & (this.props.duties.duties.length === 0) ? this.state.enddate : this.props.duties.duties[0].runenddate < this.state.strdate
        // ) {
        //     alert('Selected Start date out of range:' + this.props.duties.duties[0].runstrdate + ' to ' + this.props.duties.duties[0].runenddate);
        // }
        // else if ((this.props.duties.duties.length === 0) ? this.state.enddate : this.props.duties.duties[0].runenddate < this.state.enddate
        //     & (this.props.duties.duties.length === 0) ? this.state.strdate : this.props.duties.duties[0].runstrdate > this.state.enddate
        // ) {
        //     alert('Selected End date out of range:' + this.props.duties.duties[0].runstrdate + ' to ' + this.props.duties.duties[0].runenddate);
        // }
        // else {
        //     this.props.fetchDuties({ strdate: this.state.strdate, enddate: this.state.enddate, contract: this.state.contract, legality: this.state.legality });
        //     this.toggleModal();
        // }

        // this.props.fetchDuties({ strdate: this.strdate.value, enddate: this.enddate.value, contract: this.contract.value, legality: this.state.legality });

        // this.props.loginUser({ username: this.username.value, password: this.password.value });
        // setTimeout(() =>
        //     this.toggleModal(), 3000);
        // setTimeout(() => this.props.auth.isAuthenticated ? this.toggleModal() : console.log('Not Authenticated'), 2000);
        event.preventDefault();
    }

    clearFilter = (event) => {
        console.log('Inside clearFilter');
        this.setState({
            staffnum: '',
            strdate: '',
            enddate: '',
            contract: 'ALL',
            rank: 'ALL',
            base: 'ALL',
            legality: false
        });

        // this.state.staffnum = '';
        // this.state.strdate = '';
        // this.state.enddate = '';
        // this.state.contract = 'ALL';
        // this.state.rank = 'ALL';
        // this.state.base = 'ALL';
        // this.state.legality = false;
        // console.log(this.enddate.value);
        // console.log(this.contract.value);
        // console.log(this.state.legality);
        this.props.fetchDuties({});
        this.toggleModal();
        // this.props.loginUser({ username: this.username.value, password: this.password.value });
        // setTimeout(() =>
        //     this.toggleModal(), 3000);
        // setTimeout(() => this.props.auth.isAuthenticated ? this.toggleModal() : console.log('Not Authenticated'), 2000);
        // event.preventDefault();
    }

    handleInputChange = (event) => {
        console.log('INSIDE HANDLE INPUT');
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name);
        if (name === 'legality') {
            console.log('Inside Legality Switch . Current legality ' + this.state.legality);
            this.setState({
                legality: this.legal.checked
            });
        }
        else {
            this.setState({
                [name]: value
            });
        }


    }

    setStartValues = ({ isLoading, errMess, duties }) => {
        // console.log('HEADER:Inside setStartValues ' + this.state.strdate)
        if (isLoading) {
            return (<>
                <span>Start: </span><span>{this.state.strdate}</span></>
            );
        }
        else if (errMess) {
            return (
                <h4>{errMess}</h4>
            );
        }
        else {
            if (this.state.strdate) {
                return (<>
                    <span>Start: </span><span>{this.state.strdate}</span></>
                )
            }
            else {
                // console.log(duties.length)
                return (
                    (duties.length === 0) ? <><span className="nav-text">Start: </span><span className="nav-display">{this.state.strdate}</span></> : <><span className="nav-text">Start: </span><span className="nav-display">{duties[0].runstrdate}</span></>
                )
            }

        }
    }

    setEndValues = ({ isLoading, errMess, duties }) => {
        // console.log('Inside setEndValues')
        if (isLoading) {
            return (<>
                <span>End: </span><span>{this.state.enddate}</span></>
            );
        }
        else if (errMess) {
            return (
                <h4>{errMess}</h4>
            );
        }
        else {

            if (this.state.enddate) {
                return (<>
                    <span>End: </span><span>{this.state.enddate}</span></>
                )
            }
            else {
                // console.log(duties.length)
                return (
                    (duties.length === 0) ? <><span className="nav-text">End: </span><span className="nav-display">{this.state.enddate}</span></> : <><span className="nav-text">End: </span><span className="nav-display">{duties[0].runenddate}</span></>
                )
            }
        }
    }

    setDateFilter = () => {
        console.log('Inside setDateFilter ' + this.props.duties.duties.length)
        this.setState({
            strdate: (this.props.duties.duties.length === 0) ? this.state.strdate : this.props.duties.duties[0].runstrdate,
            enddate: (this.props.duties.duties.length === 0) ? this.state.enddate : this.props.duties.duties[0].runenddate
        });
    }

    showdate = (ddate) => {
        var dddate = new Date(ddate);
        return dddate.getHours() + ':' + dddate.getMinutes()
    }

    render() {
        // console.log('Render HEADER ' + this.props.duties.duties.length);
        return (
            <React.Fragment>

                <Navbar dark expand="md">
                    <div className="container-fluid">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="40" width="41"
                                alt="Virgin Australia" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    {/* <h3>FDP Gantt</h3> */}
                                    <h5 className="title-gantt">FLIGHT CREW FDP GANTT</h5>
                                    {/* <h4>Flight Crew FDP Gantt</h4> */}
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem> */}
                                {/* <NavItem>
                                    <NavLink className="nav-link" to="/fortnight">
                                        <span className="fa fa-coffee fa-lg"></span> Fortnight Allowances
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/roster">
                                        <span className="fa fa-trophy fa-lg"></span> Roster Allowances
                                    </NavLink>
                                </NavItem> */}
                                {/* <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem> */}
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <span style={{ color: (this.state.legality) ? 'yellow' : 'red' }}>{this.state.legality ? 'Showing All Duties' : 'Showing Illegal Duties'}</span>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {this.setStartValues(this.props.duties)}
                                    {/* <span>Start: {this.state.strdate}</span> */}
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem >
                                    {this.setEndValues(this.props.duties)}
                                    {/* <span>End: {this.state.enddate}</span> */}
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem >
                                    <span className="nav-text">Contract: </span><span className="nav-display">{this.state.contract}</span>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem >
                                    <span className="nav-text">Base: </span><span className="nav-display">{this.state.base}</span>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <span className="nav-text">Rank: </span><span className="nav-display">{this.state.rank}</span>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>

                                <NavItem className="nav-button">
                                    <Button className="button-header" color="primary" onClick={this.toggleModal} > <span className="fa fa-search fa-lg"></span> Filter Gantt</Button>

                                </NavItem>
                                <NavItem className="nav-button">
                                    <Button className="button-header" onClick={() => this.clearFilter()} color="warning">Clear Filter</Button>
                                </NavItem>
                                {refresh ?
                                    <NavItem className="nav-button">
                                        {this.state.refreshstatus ?
                                            <Button className="button-header" onClick={() => this.stopInterval()} color="danger">Stop Refresh</Button>
                                            :
                                            <Button className="button-header" onClick={() => this.startInterval()} color="info">Start Refresh</Button>
                                        }
                                    </NavItem>
                                    : <></>}


                                <NavItem className="nav-refresh">
                                    {refresh ?
                                        <span style={{ color: (this.state.seconds < 15) ? (this.state.seconds % 2) ? 'red' : 'yellow' : '#b2fa2d' }}>Refresh {this.state.time.m}m {this.state.time.s}s</span>
                                        : <></>}
                                    <div style={{ color: '#c1dbdb' }}>Updated as {(this.props.duties.duties.length > 0) ?
                                        this.showdate(this.props.duties.duties[0].runtime)
                                        : ''}</div>
                                </NavItem>

                                {/* <NavItem className="nav-text">
                                    <span style={{ color: 'yellow' }}>Last Refresh {(this.props.duties.duties.length > 0) ?
                                        this.showdate(this.props.duties.duties[0].runtime)
                                        : ''}</span>
                                </NavItem> */}
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                {/* <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <p></p>
                                <h1>Flight Crew FDP Gantt</h1>
                            </div>
                            <div className="ml-auto">
                                <a href="http://www.virginaustralia.com/"><img src="assets/images/logo.png" height="150" width="180"
                                    alt="Virgin Australia" /></a>
                            </div>
                        </div>
                    </div>
                </Jumbotron> */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Gantt Filter</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleFilter}>
                            <FormGroup>
                                <Label htmlFor="staffnum">Staff Num</Label>
                                <Input type="text" id="staffnum" name="staffnum" placeholder="Enter Staff Num"
                                    onChange={this.handleInputChange}
                                    value={this.state.staffnum}
                                    innerRef={(input) => this.staffnum = input} />
                            </FormGroup>
                            {/* <hr style={{ color: 'red' }} /> */}
                            <Col md={{ size: 4, offset: 4 }}>
                                <hr style={{
                                    borderColor: 'blue'
                                }} />
                            </Col>
                            <FormGroup>
                                <Label htmlFor="strdate">Start date</Label>
                                <Input type="date" id="strdate" name="strdate" placeholder="Enter Start Date"
                                    onChange={this.handleInputChange}
                                    value={this.state.strdate}
                                    innerRef={(input) => this.strdate = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="enddate">End date</Label>
                                <Input type="date" id="enddate" name="enddate" placeholder="Enter End Date"
                                    onChange={this.handleInputChange}
                                    value={this.state.enddate}
                                    innerRef={(input) => this.enddate = input} />
                            </FormGroup>

                            {/* <FormGroup>
                                <Label htmlFor="contract">Contract</Label>
                                <Input type="select" bsSize="md" id="contract" name="contract" placeholder="Contract" value={this.state.contract}
                                    onChange={this.handleInputChange}
                                    innerRef={(input) => this.contract = input}>
                                    <option>PAGG</option>
                                    <option>PA50</option>
                                    <option>PA75</option>
                                    <option>ALL</option>
                                </Input>
                            </FormGroup> */}
                            <Row className="form-group">
                                <Col md={4}>
                                    <FormGroup>
                                        <Label htmlFor="contract">Contract</Label>
                                        <Input type="select" bsSize="md" id="contract" name="contract" placeholder="Contract" value={this.state.contract}
                                            onChange={this.handleInputChange}
                                            innerRef={(input) => this.contract = input}>
                                            <option>ALL</option>
                                            <option>PAGG</option>
                                            <option>PA50</option>
                                            <option>PA75</option>
                                        </Input>

                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label htmlFor="base">Base</Label>
                                        <Input type="select" bsSize="md" id="base" name="base" placeholder="Base" value={this.state.base}
                                            onChange={this.handleInputChange}
                                            innerRef={(input) => this.base = input}>
                                            <option>ALL</option>
                                            <option>BNE</option>
                                            <option>SYD</option>
                                            <option>MEL</option>
                                            <option>PER</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label htmlFor="rank">Rank</Label>
                                        <Input type="select" bsSize="md" id="rank" name="rank" placeholder="Rank" value={this.state.rank}
                                            onChange={this.handleInputChange}
                                            innerRef={(input) => this.rank = input}>
                                            <option>ALL</option>
                                            <option>CPT</option>
                                            <option>FO</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Col md={{ size: 4, offset: 4 }}>
                                <hr style={{
                                    borderColor: 'blue'
                                }} />
                            </Col>
                            <Row className="form-group">
                                <Col md={6}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="legality" id="legality"
                                                onChange={this.handleInputChange}
                                                checked={this.state.legality}
                                                innerRef={(input) => this.legal = input}
                                            />
                                            {/* {this.state.legality ? 'Display Only Illegal Duties' : 'Display All Duties'} */}
                                            Display All Duties
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {/* <Row className="form-group">
                                <FormGroup>
                                    <Label>Contract</Label>
                                    <span>{this.state.legality ? 'Now: Showing All Duties' : 'Now: Showing Illegal Duties'}</span>
                                </FormGroup>
                            </Row> */}
                            <Row className="form-group">
                                <Col md={6}>

                                    <FormGroup>
                                        <Button type="submit" value="submit" color="primary">Apply Filter</Button>
                                        <span> </span>
                                        <Button onClick={() => this.clearFilter()} color="warning">Clear Filter</Button>
                                    </FormGroup>
                                </Col>
                                {/* <Col md={4}>

                                    <FormGroup>
                                        <Button type="submit" value="submit" color="warning">Clear Filter</Button>
                                    </FormGroup>
                                </Col> */}
                                <Col md={6}>

                                    <FormGroup>
                                        <span>{this.state.legality ? 'Shows All Duties' : 'Shows Only Illegal Duties'}</span>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment >
        );
    }
}

export default Header;