import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import actions from './../actions/ActionCreators';
import utils from '../utils/utils.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }
  
  submitHandler(e) {
    let searchQuery = this.state.searchInput;
    e.preventDefault();
    this.props.actions.inputSearch(searchQuery);
    fetch(`https://api.github.com/search/users?q=${searchQuery}`)
      .then((res) => res.json())
      .then((users) => this.props.actions.querySearch(users));
    browserHistory.push(`/search-results`);
  }

  typeSearch(e) {
    this.setState({searchInput: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.submitHandler.bind(this)} className="search-form">
        <input type="search" placeholder="search" onChange={this.typeSearch.bind(this)} className="search-input"/>
        <input type="submit" className="search-submit-button"/>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
