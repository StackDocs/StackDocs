import React, { Component } from 'react';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
import Comment from './Comment';

//icons
import CommentIcon from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';

let encodedDocUrl = urlEncode(document.location.href);
const Highlights = firestore.collection('UrlPages').doc(encodedDocUrl).collection('highlights');
export default class Interactive extends Component {
  constructor(props) {
    super(props);
  }

  upVote = () => {
    const highlightPathId = this.props.hlPropsId;
    console.log('hit downvote')
    try {
      Highlights.doc(highlightPathId)
      .collection('entries')
      .doc(this.props.entryId)
      .get() //Change to onSnapshot
      .then(entry => {
        console.log('oldvote', entry.data().upVote);
        let newScore = +entry.data().score + 1;
        let newUpvote = +entry.data().upVote + 1;
        return {newScore, newUpvote};
      })
      .then(scores => {
        const { newScore, newUpvote } = scores;
        Highlights.doc(highlightPathId)
        .collection('entries')
        .doc(this.props.entryId)
        .set({
          upVote: newUpvote,
          score: newScore
        }, {
          merge: true
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
  downVote = () => {
    const highlightPathId = this.props.hlPropsId;
    console.log('hit downvote')
    try {
      Highlights.doc(highlightPathId)
      .collection('entries')
      .doc(this.props.entryId)
      .get()
      .then(entry => {
        let newScore = entry.data().score - 1;
        let newDownvote = entry.data().downVote + 1;
        return {newScore, newDownvote};
      })
      .then(scores => {
        const { newScore, newDownvote } = scores;
        Highlights.doc(highlightPathId)
        .collection('entries')
        .doc(this.props.entryId)
        .set({
          downVote: newDownvote,
          score: newScore
        }, {
          merge: true
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const { downVote, upVote, comments } = this.props;
    return (
      <div>
        <div className="chromelights-interactive">
          <ThumbsUp onClick={this.upVote} />
          {upVote}
          <ThumbsDown onClick={this.downVote} />
          {downVote}
          <CommentIcon />
          {comments.length}
        </div>
        <br />
        <Comment comments={comments} />
      </div>
    );
  }
}
