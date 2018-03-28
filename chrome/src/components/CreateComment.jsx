import React, { Component } from 'react';
import { firestore } from '~/fire';
import { urlEncode } from '../highlighting';

export class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conent: '',
    };
  }

  handleChange = (event) => {
    let content = event.target.value;
    this.setState({ content })
  }

  onSubmit = event => {
    event.preventDefault();
    let url = urlEncode(document.location.href)
    const { entry, highlight, user } = this.props;
    const content = this.state.content;
    const newDate = new Date()
    const newComment = {
      content,
      user: user.displayName,
      downVote: 0,
      upVote: 0,
      score: 0,
      date: newDate.toString().slice(0,15)
    };
    console.log('newComment', newComment);

    UrlPages.doc(url)
      .collection('highlights')
      .doc(highlight.id)
      .collection('entries')
      .doc(entry.entryId)
      .update({
        comments: [...entry.comments, newComment]
      })
      .catch(error => console.log('error: ', error));
  };

  render() {
    return (
      <div>
        <form className="comment-form">
          <textarea placeholder="Reply or comment!" />
          <button onSubmit={this.onSubmit} type="button" value="submit" />
        </form>
      </div>
    );
  }

}
