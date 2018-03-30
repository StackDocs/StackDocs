import React, { Component } from 'react';

export default class Comment extends Component{
  constructor(props) {
    super(props);

}
render(){

  const { userDisplayName, date, content, cmtUpvote, cmtDonwVote } = this.props;
  console.log('PROPS ON COMMENT', this.props);

  return (
    <div className="chromelights-comment">
      <small>
        {userDisplayName}, {date}
      </small>
      <p>{content}</p>
    </div>
  );
}
}
