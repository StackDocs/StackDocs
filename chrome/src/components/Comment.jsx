import React from 'react';

export default function Comment(props) {
  const { userDisplayName, date, content, cmtUpvote, cmtDonwVote } = props;
  console.log('PROPS ON COMMENT', props);

  return (
    <div className="comment">
      <small>
<<<<<<< HEAD
        {userDisplayName}, {date}
      </small>
      <p>{content}</p>
=======
        {/*{user}, {date}*/}
      </small>
      {/*<p>This is a hard coded comment. {content}</p>*/}
>>>>>>> master
    </div>
  );
}
