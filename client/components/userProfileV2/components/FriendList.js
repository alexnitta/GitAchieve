import React from 'react';

export default function FriendList(props) {
  
  /**
   * Displays a list of friends, or a filler message if none exist.
   * 
   * Required props:
   *   `friends`: Array of `friend` objects; each must have an `id`, `avatar_url`, and `username`
   */
  
  const {
    friends,
  } = props;
  
  if (friends.length !== 0) {
    return friends.map(friend => (
      <div key={friend.id} className="competitor-card data-result-container">
        <img src={friend.avatar_url} className="user-avatar-med" />
        <h3 className="font-dark-gray">{friend.username}</h3>
      </div>
    ));
  }
  
  return <h3>To add friends, set up a competition!</h3>
}
