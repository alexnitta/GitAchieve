import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import actions from './../actions/ActionCreators';
import Repos from './repos';
import axios from 'axios';

require('react-datepicker/dist/react-datepicker.css');

const ROOT_URL = require('../../server/config/config-settings').CALLBACKHOST;

class ChooseWeapon extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(7, 'days'),
      endDate: moment().add(7, 'days')
    };
  }

  handleStartChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndChange(date) {
    this.setState({
      endDate: date
    });
  }

  compete() {
    browserHistory.push('/');
    this.props.actions.addCompetitor({competitor: this.props.chosenSearchResult, myWeapon: this.props.chosenWeapons});
    const primaryRID = this.props.chosenWeapons.id;
    this.props.actions.chooseSearchResult({});
    this.props.actions.chooseWeapon({});
    var competitionData = {
      primary_user_id: this.props.user.id,
      secondary_user_id: this.props.chosenSearchResult.id,
      secondaryUsername: this.props.chosenSearchResult.login,
      primary_repo_id: primaryRID,
      competition_start: this.state.startDate._d,
      competition_end: this.state.endDate._d
    };
    // this will add opponent user to database if they don't already exist
    axios.patch(`${ROOT_URL}/api/v1/users/${competitionData.secondary_user_id}`, {
      username: this.props.user.username,
      competitorUsername: competitionData.secondaryUsername
    })
    // this will add an entry to the users_users table
    .then((res) => {
      axios.post(`${ROOT_URL}/api/v1/users/${competitionData.primary_user_id}/friends`, {
        secondaryUserId: res.data.id,
        secondaryUsername: res.data.username,
        secondaryUserEmail: res.data.email,
        primaryRepoId: competitionData.primary_repo_id,
        competitionStart: competitionData.competition_start,
        competitionEnd: competitionData.competition_end
      })
      .then(response => {
        axios.get(`${ROOT_URL}/api/v1/users/${this.props.user.id}/requestedmatches`)
        .then((res) => {
           this.props.actions.sentFriendRequests(res.data);
        })
      })
      .then(() => {
        // connect to socket
        const socket = io.connect(window.location.origin);
        socket.emit('Compete Request', {
          user1: this.props.user.username,
          user2: competitionData.secondaryUsername
        });
      })
      .then(() => {
        axios.get(`${ROOT_URL}/send-email?user=${this.props.user.username}&competitor=${competitionData.secondaryUsername}&competitor_id=${competitionData.secondary_user_id}`);
      })
    })
    .catch((err) => {
      console.log('error', err);
    });
  }

  render() {
    return (
      <div className="data-results-container">
        <div className="data-results-container-clear">
          <h2 className="font-white bottom-border">Compete</h2>
          <div className="data-results-container-clear text-centered">
            <img src={this.props.user.avatar_url} className="user-avatar-1 border-1px-white" />
            <img src="/static/assets/sword-vs-1-1.png" className="vs-swords" />
            <img src={this.props.chosenSearchResult.avatar_url} className="user-avatar-1 border-1px-white" />
          </div>
          <div className="data-results-container-flex-clear flex-center">
            <span className="font-white">{this.props.user.username} <span className="font-dark-gray">vs</span> {this.props.chosenSearchResult.login}</span>
          </div>
          <div className="spacer-10px" />
          <h3 className="font-dark-gray">Choose Your Weapon // Repos</h3>
          <div className="spacer-5px" />
          <div className="data-result-container full-width">
            <Repos />
          </div>
          <h3 className="font-dark-gray">Pick a start Date</h3>
          <div className="spacer-5px" />
          <div className="data-result-container full-width">
            <DatePicker
              // maxDate={moment().subtract(1, 'day')}
              selected={this.state.startDate}
              onChange={this.handleStartChange.bind(this)}
            />
          </div>
          <h3 className="font-dark-gray">Pick an end Date</h3>
          <div className="spacer-5px" />
          <div className="data-result-container full-width">
            <DatePicker
              // minDate={moment().add(1, 'day')}
              selected={this.state.endDate}
              onChange={this.handleEndChange.bind(this)}
            />
          </div>
          <div className="spacer-10px"></div>
          <div className="block text-centered">
            <input type="submit" value="Compete" className="button compete" onClick={this.compete.bind(this)} />
          </div>
          <div className="spacer-5px"/>
          <div className="text-centered">
            <i className="font-medium-gray font-size-regular">If competitor is not on GitAchieve, pressing 'Compete' will email an invite to compete with you!</i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWeapon);
