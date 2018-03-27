import React from 'react';

export default function CreateComment(props) {
  return (
    <form className="comment-form">
      <textarea placeholder="Reply or comment!" />
      <input onClick={() => console.log('Submitted comment!')}type="button" value="submit"  />
    </form>
  );
}
