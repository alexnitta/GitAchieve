import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import actions from './../actions/ActionCreators';
import axios from 'axios';

import FriendList from './userProfileComponents/FriendList';
import History from './userProfileComponents/History';
import Events from './userProfileComponents/Events';


const ROOT_URL = require('../../server/config/config-settings').CALLBACKHOST;

class UserProfile extends Component {
  
  /**
   * Displays a user's profile, which includes their competition history, friends (opponents from
   * past competitions), and a list of GitHub push and pull request events.
   * 
   * Required props:
   *   `user`: object of current user. Provided by Redux store.
   *   `pastCompetitions`: array of arrays, each one representing a past competition. Provided by 
   *     Redux store.
   *   `actions`: object of bound action creators, provided by the imported `actions`.
   */
  
  constructor(props) {

    super(props);
    
    this.state = {
      history: [],
      friends: [],
      userEvents: [],
      options: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': this.props.user.username,
          'Authorization': `token ${localStorage.token}`
        }
      }
    };
  }
  
  componentWillUnmount() {
    
    this.props.actions.searchUserEvents([]);
  }

  componentWillMount() {
    
    this.fetchFriends();
    this.fetchEvents();
    this.fetchHistory();
  }

  fetchHistory = () => {
    
    /**
     * GET a list of competition history from the API.
     */
    
    var competitions = this.props.pastCompetitions[0].map(comp => {
      var competitor, champion;
      if (comp.primary_user_id === this.props.user.id) {
        competitor = comp.secondary_user_id;
      } else {
        competitor = comp.primary_user_id;
      }
      if (comp.winner === 1) {
        champion = 'Tie';
      } else if (comp.winner === this.props.user.id) {
        champion = this.props.user.username;
      } else {
        champion = comp.secondary_user_id;
      }
      return {
        competitionEnd: comp.competition_end,
        competitor,
        champion
      };
    });
    
    var result = [];
    var length = competitions.length;
    
    competitions.sort((a, b) => (new Date(a.competitionEnd) > new Date(b.competitionEnd)))
      .forEach((comp) => {
        axios.get(`${ROOT_URL}/api/v1/users/${comp.competitor}`)
          .then((res, index) => {
            var champion = (res.data.id === comp.champion) ? res.data.username : comp.champion;
            result.push({champion, competitor: res.data.username, competitorAvatar: res.data.avatar_url});
            if (result.length === length) {
              this.setState({history: result});
            }
          });
      });
  };

  fetchFriends = () => {
    
    /**
     * GET a list of friends from the API.
     */
    
    axios.get(`${ROOT_URL}/api/v1/users/${this.props.user.id}/friends`)
      .then(data => this.setState({friends: data.data}))
  };

  fetchEvents = () => {
    
    /**
     * GET a list of events for this user from GitHub.
     */
    
    if (window.location.pathname.includes(this.props.user.username)) {
    
      axios.get(`https://api.github.com/users/${this.props.user.username}/events`, this.state.options.headers)
        .then(response => this.setState({userEvents: response.data}))
    
    } else {
    
      let slicedName = window.location.pathname.slice(1);
      let username = slicedName.slice(0, slicedName.indexOf('/'));
    
      axios.get(`https://api.github.com/users/${username}/events`, this.state.options.headers)
        .then(response => this.setState({userEvents: response.data}))
    }
  };

  render() {
    
    const {
      user,
      searchUserEvents,
    } = this.props;
    
    const {
      history,
      friends,
      userEvents,
    } = this.state;
    
    return (
      <div className="data-results-container">
        <div className="data-result-container">
          <h2>Competition History</h2>
          <div>
            <div className="comp-result-container history-img">
              <img src={user.avatar_url} className="user-avatar-med2 border-1px-white" />
              <h3>{user.username}</h3>
            </div>
            <div className="comp-result-container comp-history">
              <History
                history={history}
                user={user}
              />
            </div>
          </div>
        </div>
        <div className="data-result-container">
          <h2>Friends</h2>
          <FriendList
            friends={friends}
          />
        </div>
        <div className="comp-result-container full-width">
          <Events
            searchUserEvents={searchUserEvents}
            userEvents={userEvents}
          />
        </div>
      </div>
    )
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  pastCompetitions: PropTypes.arrayOf(PropTypes.array).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
