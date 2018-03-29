import React from 'react';

export default function Comment(props) {
  const { userDisplayName, date, content, cmtUpvote, cmtDonwVote } = props;
  console.log('PROPS ON COMMENT', props);

  return (
    <div className="comment">
      <small>
        {userDisplayName}, {date}
      </small>
      <p>{content}</p>
    </div>
  );
}
