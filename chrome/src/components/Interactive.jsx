import React, { Component } from 'react';

//icons
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';
import Comment from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';

export default class Interactive extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { downVote, upVote, comments, entryId } = this.props;
    console.log(entryId,"Entry id")
    return (
      <div>
        <ThumbsUp onClick={() => console.log('thumbs up!')}/>
        {upVote}
        <ThumbsDown onClick={() => console.log('thumbs down !')}/>
        {downVote}
        <Comment />
        {comments.length}
      </div>
    );
  }
}

