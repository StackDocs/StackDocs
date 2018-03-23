import React from 'react';

export default function Comment(props) {
  const { user, date, content } = props;
  console.log('PROPS', props);

  return (
    <div className="comment">
      <small>
        {user}, {date}
      </small>
      <p>{content}</p>
    </div>
  );
}
