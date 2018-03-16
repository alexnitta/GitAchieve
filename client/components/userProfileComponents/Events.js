import React from 'react';
import moment from 'moment';

import FilterEventTypes from './FilterEventTypes';

export default function Events(props) {
  
  /**
   * Displays a list of GitHub events.
   * 
   * Required props:
   *   `searchUserEvents`:
   *   `userEvents`: 
   */
  
  const {
    searchUserEvents,
    userEvents,
  } = props;
  
  if (searchUserEvents.length > 0) {
    return <div>
      {searchUserEvents.map((event, index) => {
        if (event.type === 'PushEvent' || event.type === 'PullRequestEvent') {
          return <div key={index} className="search-result-container" >
            <h3 className="event-title">{event.type}</h3>
            <span className="event-title"> at </span>
            <h3 className="event-title">{event.repo.name}</h3>
            <span>{event.created_at}</span>
            <FilterEventTypes
              event={event}
            />
          </div>;
        }
      })}
    </div>;
  } 

  return <div>
    {userEvents.map((event, index) => {
      if (event.type === 'PushEvent' || event.type === 'PullRequestEvent') {
        return <div key={index} className="search-result-container" >
          <span className="font-medium-gray font-weight-light fonts-size-regular">
            {moment(new Date(event.created_at)).fromNow()}
          </span>
          <div className="spacer-5px"/>
          <FilterEventTypes
              event={event}
            />
        </div>;
      }
    })}
  </div>;
}
