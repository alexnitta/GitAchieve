import React from 'react';

export default function History(props) {
  
  /**
   * Displays a table of competition history.
   * 
   * Required props:
   *   `history`:
   *   `user`: 
   */
  
  const {
    history,
    user,
  } = props;
  
  if (history.length > 0) {
    return <table className="child history-table">
      <tbody>
      {history.map((comp, ind) =>
        <tr key={ind}>
          <td><img src={comp.competitorAvatar} className="user-avatar-med" /><span className="block">{comp.competitor}</span></td>

          {comp.champion === user.username ?
            <td><img src="../../static/assets/trophy-1-3.png" height="50px" width="44px" className="logo"/></td>
            : <td><img src="../../static/assets/surrender.png" height="50px" width="50px" className="logo"/></td>
          }
          {comp.champion === user.username ?
            <td>You Won!</td> : <td>You Lost</td>
          }
        </tr>
      )}
      </tbody>
    </table>;
  }
  
  return null;
}
