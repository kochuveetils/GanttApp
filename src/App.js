import './App.css';
import React from 'react';
import Timeline from './components/TimelineGantt';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDuties } from './redux/ActionCreators';

const mapStateToProps = state => {
  return {
    duties: state.duties
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDuties: (dutyfilter) => { dispatch(fetchDuties(dutyfilter)) }
});

class App extends React.Component {

  componentDidMount() {
    console.log('componentDidMount APP')
    localStorage.removeItem('rundates');
    this.props.fetchDuties();
    // this.interval = setInterval(this.getTimeline, 10000); // <- time in ms
  }
  render() {
    console.log('Render APP')
    return (
      <div>
        <Header
          duties={this.props.duties}
          fetchDuties={this.props.fetchDuties} />
        <Timeline duties={this.props.duties} fetchDuties={this.props.fetchDuties} />
        {/* <Footer /> */}
      </div>
    );
  }
}

// export default App;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
