import React, { Component } from 'react';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
import { Map } from 'fireview';

//React
import CreateComment from './CreateComment';
import { Comment } from './index';

//icons
import CommentIcon from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';

let encodedDocUrl = urlEncode(document.location.href);
console.log(encodedDocUrl,"this should be fine")
const Highlights = firestore
  .collection('UrlPages')
  .doc(encodedDocUrl)
  .collection('highlights');

export default class Interactive extends Component {
  constructor(props) {
    super(props);
  }

  upVote = () => {
    const Entries = Highlights.doc(this.props.hlPropsId).collection('entries');
    console.log('hit upvote', this.props);
    try {
      Entries.doc(this.props.entryId)
        .get() //Change to onSnapshot
        .then(entry => {
          console.log('oldvote', entry.data().upVote);
          let newScore = +entry.data().score + 1;
          let newUpvote = +entry.data().upVote + 1;
          return { newScore, newUpvote };
        })
        .then(scores => {
          const { newScore, newUpvote } = scores;
          Entries.doc(this.props.entryId)
            .set({
              upVote: newUpvote,
              score: newScore
            }, {
                merge: true
              });
        })
      // .then(_ => {
      //   console.log('fetch new entries', this.props.fetch);
      //   this.props.fetch();
      // })
    } catch (err) {
      console.error(err);
    }
  }

  downVote = () => {
    const Entries = Highlights.doc(this.props.hlPropsId).collection('entries');
    console.log('hit downvote');
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
          Entries.doc(this.props.entryId)
            .set({
              downVote: newDownvote,
              score: newScore
            }, {
                merge: true
              });
        })
      // .then(_ => {
      //   console.log('fetch new entries', this.props.fetch);
      //   this.props.fetch();
      // })
    } catch (err) {
      console.error(err);
    }
  };

  allComments = () =>{

  }

  render() {
    const {
      downVote,
      upVote,
      highlightId,
      entryId,
      currentUser
    } = this.props;
    
    console.log(encodedDocUrl, highlightId, entryId, "this is everything that is killing me")
    return (
      <div>
        <ThumbsUp onClick={this.upVote} />
        {upVote}
        <ThumbsDown onClick={this.downVote} />
        {downVote}
        <CommentIcon />
        {/*{Comments.length}*/}
       <AllComments entryId={entryId} highlightId={highlightId}/>
        {/* <CreateComment
          currentUser={currentUser}
          //comments={comments}
          highlightId={highlightId}
          entryId={entryId}
        /> */}
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



    //   <Map 
    //   each
    //   from={
    //     // firestore.collection('UrlPages')
    //     // .doc('hackernoon.com%%%waymos-all-electric-jaguar-will-rule-the-self-driving-fleets-of-the-future-425406ac4d40')
    //     // .collection('highlights')
    //     // .doc('JGLZGsHnRvMR3st7DvT8')
    //     // .collection('entries')
    //     // .doc('uzs5TfBA1JECgAYn9FyN')
    //     // .collection('comments')
    //     Highlights.doc(`${highlightId}/entries/${entryId}/comments`)
    //   }
    //   Loading={() => <h3>Comments are loading!</h3>}
    //   Empty={() => <h3>There are no comments!</h3>}
    //   Render={({ 
    //     content, userDisplayName, cmtUpVote, cmtDownVote, date, score, userId
    //    }) => (
    //     <div>
    //       {console.log(content, "content")}<h1>{content}</h1>
    //       </div>
    //   )}
    // /> 