import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import actions from './../actions/ActionCreators';
import Repos from './repos';
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8000';

class ChooseWeapon extends Component {
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
      competition_start: new Date()
    };
    // this will add opponent user to database if they don't already exist
    axios.patch(`${ROOT_URL}/api/v1/users/${competitionData.secondary_user_id}`, {
      username: competitionData.secondaryUsername
    })
    // this will add an entry to the users_users table
    .then(() => {
      axios.post(`${ROOT_URL}/api/v1/users/${competitionData.primary_user_id}/friends`, {
        secondaryUserId: competitionData.secondary_user_id,
        secondaryUsername: competitionData.secondaryUsername,
        secondaryUserEmail: null,
        primaryRepoId: competitionData.primary_repo_id,
        competitionStart: competitionData.competition_start
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
    });
  }
  render() {
    return (
      <div className="data-results-container-clear">
        <h2>Choose Your Weapon // Repos</h2>
        <Repos />
        <div className="spacer-10px"></div>
        <div className="block text-centered">
          <input type="submit" value="COMPETE" className="button compete" onClick={this.compete.bind(this)} />
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