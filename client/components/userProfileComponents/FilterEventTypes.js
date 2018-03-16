import React from 'react';

export default function FilterEventTypes(props) {
  
  /**
   * Given a single GitHub event, returns the markup for `PushEvent`s and `PullRequestEvent`s only.
   */
  
  const {
    event,
  } = props;
  
  switch (event.type) {
    case 'PushEvent':
      return <div className="data-result-container event-commits">
        <img src="./../static/assets/circle-star-1-1.svg" height="15px" width="15px"/>
        <h3 className="event-title">
          You pushed {event.payload.commits.length} commits to {event.repo.name}
        </h3>
      </div>;
    case 'PullRequestEvent':
      return <div className="data-result-container">
        <img src="./../static/assets/git-pull-request-1-2.png" />
        <h3>You {event.payload.action} a pull request</h3>
        <p>number of commits: {event.payload.pull_request.commits}</p>
        <p>number of changed files: {event.payload.pull_request.changed_files}</p>
        <p>number of additions: {event.payload.pull_request.additions}</p>
        <p>number of deletions: {event.payload.pull_request.deletions}</p>
      </div>;
    default:
      return <div />;
  }
}
