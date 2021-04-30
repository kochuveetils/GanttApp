import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Loading } from './LoadingComponent';
// import ErrorBoundary from './ErrorBoundary';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };

    }


    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }


    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41"
                                alt="Virgin Australia" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/fortnight">
                                        <span className="fa fa-coffee fa-lg"></span> Fortnight Allowances
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/roster">
                                        <span className="fa fa-trophy fa-lg"></span> Roster Allowances
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <span>FDP</span>
                                </NavItem>
                            </Nav>
                            {/* <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            {this.props.auth.crew.admin ?
                                                <div className="navbar-text mr-3">{this.props.auth.crew.staffnum} {this.props.auth.crew.firstname} {this.props.auth.crew.lastname} ADMIN {this.props.auth.crew.iscrew ? this.props.auth.crew.crewtype : 'MASTER'}   </div>
                                                :
                                                this.props.auth.crew.isapproved ?
                                                    <div className="navbar-text mr-3">{this.props.auth.crew.staffnum} {this.props.auth.crew.firstname} {this.props.auth.crew.lastname} {this.props.auth.crew.base} {this.props.auth.crew.fleet} {this.props.auth.crew.rank}</div>
                                                    : <div className="navbar-text mr-3">{this.props.auth.crew.staffnum} {this.props.auth.crew.firstname} {this.props.auth.crew.lastname} RESTRICTED ACCESS</div>
                                            }
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav> */}
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

            </React.Fragment >
        );
    }
}

export default Header;