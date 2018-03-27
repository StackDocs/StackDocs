import React, { Component } from 'react';
//icons
import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';
import Comment from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
let encodedDocUrl = urlEncode(document.location.href);
const UrlPages = firestore.collection('UrlPages');
export default class Interactive extends Component {
  constructor(props) {
    super(props);
    // const entry = UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.props.highlightId)
    // .collection('entries')
    // .doc(this.props.entryId)
  }
  upVote = () => {
    //Can this be made DRY-er by making 'entry'
    console.log('hit upVote', this.props);
    try {
      UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.props.highlightId)
      .collection('entries')
      .doc(this.props.entryId)
      .get()
      .then(entry => {
        // console.log('entry inside interactive', entry)
        console.log('oldvote', entry.data().upVote);
        let newScore = +entry.data().score + 1;
        let newUpvote = +entry.data().upVote + 1;
        return {newScore, newUpvote};
      })
      .then(scores => {
        console.log('scores in upVote ', scores)
        const { newScore, newUpvote } = scores;
        UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.props.highlightId)
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
    console.log('hit downVote');
    try {
      UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.props.highlightId)
      .collection('entries')
      .doc(this.props.entryId)
      .get()
      .then(entry => {
        let newScore = entry.data().score--;
        let newDownvote = entry.data().downVote++;
        return {newScore, newDownvote};
      })
      .then(scores => {
        const { newScore, newDownvote } = scores;
        UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.props.highlightId)
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
        <ThumbsUp onClick={this.upVote} />
        {upVote}
        <ThumbsDown onClick={this.downVote} />
        {downVote}
        <Comment />
        {comments.length}
      </div>
    );
  }
}






// import React, { Component } from 'react';

// //icons
// import ThumbsUp from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/thumbs-up.svg';
// import ThumbsDown from 'svg-react-loader?name=ThumbsDown!~/chrome/src/icons/thumbs-down.svg';
// import Comment from 'svg-react-loader?name=ThumbsUp!~/chrome/src/icons/comment.svg';

// export default class Interactive extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { downVote, upVote, comments } = this.props;
//     return (
//       <div>
//         <ThumbsUp onClick={() => console.log('thumbs up!')}/>
//         {upVote}
//         <ThumbsDown onClick={() => console.log('thumbs down !')}/>
//         {downVote}
//         <Comment />
//         {comments.length}
//       </div>
//     );
//   }
// }

