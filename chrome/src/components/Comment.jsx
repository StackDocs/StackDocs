import React from 'react';

export default function Comment(props) {
  const { user, date, content } = props;
  // console.log('PROPS ON COMMENT', props);

  return (
    <div className="comment">
      <small>
        {user}, {date}
      </small>
      <p>This is a hard coded comment. {content}</p>
    </div>
  );
}
