import React, { Component } from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';

//icons
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';
import CommentIcon from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';

export default class Interactive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false
    };
    this.toggleComments = this.toggleComments.bind(this);
  }
  toggleComments() {
    console.log('show comments');
    this.setState({ showComments: !this.state.showComments });
  }

  render() {
    const { downVote, upVote, comments } = this.props;
    return (
      <div>
        <ThumbsUp onClick={() => console.log('thumbs up!')} />
        {upVote}
        <ThumbsDown onClick={() => console.log('thumbs down !')} />
        {downVote}
        <CommentIcon onClick={this.toggleComments} />
        {comments.length}
        {this.state.showComments && (
          <div>
            <h3>Comments</h3>
            {comments.map((cmt) => {
              return <Comment comment={cmt} />
            })}
            <CreateComment />
          </div>
        )}
      </div>
    );
  }
}
