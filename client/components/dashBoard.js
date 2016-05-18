//@TODO: initially populate graph with logged-in user's 'contributions in last year' data
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import actions from './../actions/ActionCreators';
import d3 from 'd3';
import utils from './../utils/utils';
import { Repos, Search, CompetitorsMiniView, CumulativeChart, DailyChart, SentRequest, Request } from './index';


class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // On initial dashboard render, display text (until competitor selected)
    var svg = d3.select('svg');
    if (svg) {

      svg.append('text')
        .text('make more commits to win')
        .classed('commit-to-win', true)
        .attr('x', 100)
        .attr('y', 50)
        .style('font-size', '21px');

      var text = [];
      text.push('');
      text.push('how to create a new challenge...');
      text.push('');
      text.push('1:      search your competitor');
      text.push('2:      choose your weapon (repo)');
      text.push('3:      select start and end dates');
      text.push('4:      compete to invite by email');

      var group = svg.append('g')
      for (var i = 0; i < text.length; i++) {
        group.append('text')
          .text(text[i])
          .attr('x', 70)
          .attr('y', 80 + 20 * i)
          .style('font-size', '11px');
      }
    }
  }
  componentDidUpdate() {
    if (this.props.auth.authenticated && this.props.userContributions[0] === 0) {
      this.getUserContribs();
    }
    if (this.props.competitorsData.length > 0){
      CumulativeChart(this.props.competitorsData);
    }
    if (this.props.dailyCompetitorsData.length > 0) {
      DailyChart(this.props.dailyCompetitorsData, 'additional chart');
    }
  }
  getUserContribs() {
    async function getContribs() {
      var numContribs = await utils.fetchLastYearGHContribs(this.props.user.username);
      this.props.actions.getUserContribs(numContribs);
    }
    getContribs.call(this);
  }
  makeMainChart() {
      console.log('makeMainChart called');
    if (this.props.competitorsData.length > 0){
      CumulativeChart(this.props.competitorsData);
    }
  }
  makeDailyChart() {
    if (this.props.dailyCompetitorsData.length > 0) {
      DailyChart(this.props.dailyCompetitorsData, 'same chart');
    }
  }
  addDailyChart() {
    if (this.props.dailyCompetitorsData.length > 0) {
      DailyChart(this.props.dailyCompetitorsData, 'additional chart');
    }
  }
  renderContributions(contribs) {
    if (contribs === 0 || contribs === undefined) {
      return (<span className="font-active">0</span>);
    } else if (contribs.length < 10) {
       return (<span className="font-active">{this.props.userContributions}</span>);
    } else {
      return (<span className="font-active">'Couldn\'t get your contributions. Try again in a few seconds'</span>);
    }
  }


  render() {
    const { actions } = this.props;

    if (this.props.auth.authenticated) {
      return (
        <div className="dashboard">
          <div className="main-search">
            <div className="dash-header-text text-centered">
              <h1 className="logo">GitAchieve</h1>
              <h1 className="font-white">Search your Git opponent</h1>
              <div className="spacer-5px" />
              <span className="font-white">Your public contributions: </span>
              {this.renderContributions(this.props.userContributions[0])}
            </div>
            <div className="search-container text-centered">
              <div className="block text-centered">
                <Search />
              </div>
            </div>
            <div className="spacer-125px"></div>
            <CompetitorsMiniView />
          </div>
          <div className="data-results-container-clear">
            <h2 className="font-white">Achievement Chart</h2>
            <div className="data-results-container full-width">

              <div id="commit-charts">
                <svg width={540} height={360}>
                </svg>

                <div id="optional-extra-chart">
                </div>

              </div>

              <button onClick={this.addDailyChart.bind(this)} className="button"> See daily breakdown </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

// <image xLinkHref="static/assets/trophy.png" x="100" y="100"></image>
// svg.append('image')
//   .attr('xlink:href', 'static/assets/trophy.png' )
//   .attr('x', () => xScale(users[placeOfWinner_x])-11 + barWidth/2)
//   .attr('y', () => yScale(placeOfWinner_y) - 25)
//   .attr('height', '25')
//   .attr('width', '22');
// x="100" y="100" width="22" height="25"
// svg.append('image')
//   .attr('xlink:href', 'static/assets/trophy.png' )
//   .attr('x', () => xScale(users[placeOfWinner_x])-11 + barWidth/2)
//   .attr('y', () => yScale(placeOfWinner_y) - 25)
//   .attr('height', '25')
//   .attr('width', '22');
// <text x="10" y="54" text-anchor="middle">Hello!</text>

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
