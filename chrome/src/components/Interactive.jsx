import React, { Component } from 'react';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
import { Map } from 'fireview';
import Comment from './Comment';
import CreateComment from './CreateComment';

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
  }

  upVote = () => {
    const { highlightId, entryId } = this.props;
    console.log('hit downvote');
    try {
      Highlights.doc(highlightId)
        .collection('entries')
        .doc(entryId)
        .get() //Change to onSnapshot
        .then(entry => {
          console.log('oldvote', entry.data().upVote);
          let newScore = +entry.data().score + 1;
          let newUpvote = +entry.data().upVote + 1;
          return { newScore, newUpvote };
        })
        .then(scores => {
          const { newScore, newUpvote } = scores;
          Highlights.doc(highlightId)
            .collection('entries')
            .doc(entryId)
            .set(
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
    const highlightPathId = this.props.highlightId;
    console.log('hit downvote');
    try {
      Highlights.doc(highlightPathId)
        .collection('entries')
        .doc(this.props.entryId)
        .get()
        .then(entry => {
          let newScore = entry.data().score - 1;
          let newDownvote = entry.data().downVote + 1;
          return { newScore, newDownvote };
        })
        .then(scores => {
          const { newScore, newDownvote } = scores;
          Highlights.doc(highlightPathId)
            .collection('entries')
            .doc(this.props.entryId)
            .set(
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

  render() {
    const {
      downVote,
      upVote,
      highlightId,
      entryId,
      currentUser
    } = this.props;
    let encodedUrl = urlEncode(document.location.href);
    console.log(encodedUrl, highlightId, entryId, "this is everything that is killing me")
    return (
      <div>
        <ThumbsUp onClick={this.upVote} />
        {upVote}
        <ThumbsDown onClick={this.downVote} />
        {downVote}
        <CommentIcon />
        {/*{Comments.length}*/}
        <Map each
          from={firestore.collection('UrlPages')
            .doc(encodedUrl)
            .collection('highlights')
            .doc(highlightId)
            .collection('entries')
            .doc(entryId)
            .collection('comments')}
          Loading={() => <p>Comments are loading!</p>}
          Empty={() => <p>There are no comments!</p>}
          Render={({ content }) => (
            <div><h1>{content}</h1></div>)}
        />
        <CreateComment
          currentUser={currentUser}
          // comments={comments}
          highlightId={highlightId}
          entryId={entryId}
        />
      </div>
    );
  }
}


      // {/* <Comment
      //         content={content}
      //         userDisplayName={userDisplayName}
      //         cmtUpVote={cmtUpVote}
      //         cmtDownVote={cmtDownVote}
      //         date={date}
      //      />*/}
      // , userDisplayName, cmtUpVote, cmtDownVote, date