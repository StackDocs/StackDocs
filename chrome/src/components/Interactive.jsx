import React, { Component } from 'react';
import Comment from './Comment';

//icons
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';
import CommentIcon from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';

export default class Interactive extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { downVote, upVote, comments } = this.props;
    return (
      <div>
        <ThumbsUp onClick={() => console.log('thumbs up!')}/>
        {upVote}
        <ThumbsDown onClick={() => console.log('thumbs down !')}/>
        {downVote}
        <CommentIcon />
        {comments.length}
        <Comment comments={comments} />
      </div>
    );
  }
}

