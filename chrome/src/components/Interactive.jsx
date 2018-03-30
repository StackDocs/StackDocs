import React, { Component } from 'react';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
import { Map } from 'fireview';

//React
import CreateComment from './CreateComment';
import { Comment, AllComments } from './index';

//icons
import CommentIcon from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';

let encodedDocUrl = urlEncode(document.location.href);
const Highlights = firestore
  .collection('UrlPages')
  .doc(encodedDocUrl)
  .collection('highlights');

export default class Interactive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      showComments: false,
    }
  }

  upVote = () => {
    const Entries = Highlights.doc(this.props.highlightId).collection(
      'entries'
    );
    try {
      Entries.doc(this.props.entryId)
        .get()
        .then(entry => {
          let newScore = +entry.data().score + 1;
          let newUpvote = +entry.data().upVote + 1;
          return { newScore, newUpvote };
        })
        .then(scores => {
          const { newScore, newUpvote } = scores;
          Entries.doc(this.props.entryId).set(
            {
              upVote: newUpvote,
              score: newScore
            },
            {
              merge: true
            }
          );
        });
    } catch (err) {
      console.error(err);
    }
  };

  downVote = () => {
    const Entries = Highlights.doc(this.props.highlightId).collection(
      'entries'
    );
    try {
      Entries.doc(this.props.entryId)
        .get()
        .then(entry => {
          let newScore = entry.data().score - 1;
          let newDownvote = entry.data().downVote + 1;
          return { newScore, newDownvote };
        })
        .then(scores => {
          const { newScore, newDownvote } = scores;
          Entries.doc(this.props.entryId).set(
            {
              downVote: newDownvote,
              score: newScore
            },
            {
              merge: true
            }
          );
        });
    } catch (err) {
      console.error(err);
    }
  };

  commentCount = (val) => {
    const commentCount = val;
    this.setState({commentCount});
  }

  showComments = () => {
    this.setState({showComments: !this.state.showComments})
  }

  render() {
    const { downVote, upVote, highlightId, entryId, currentUser } = this.props;
    return (
      <div className="chromelights-interactive-all">
        <div className="chromelights-interactive">
          <ThumbsUp onClick={this.upVote} />
          {upVote}
          <ThumbsDown onClick={this.downVote} />
          {downVote}
          <CommentIcon onClick={this.showComments}/>
          {this.state.commentCount}
        </div>
        <div className="chromelights-interactive-showComments">
          <p onClick={this.showComments}>
            {this.state.showComments ? "Hide Comments" : "Show Comments"}
          </p>
        </div>
        <br />
        {/* <button onClick={this.showComments}><small>Show Comments</small></button> */}
        <AllComments highlightId={highlightId} entryId={entryId} commentCount={this.commentCount} showComments={this.state.showComments}/>
        <CreateComment
          currentUser={currentUser}
          highlightId={highlightId}
          entryId={entryId}
        />
      </div>
    );
  }
}
