import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { firestore } from '~/fire';
import Mark from 'mark.js';
import { createHighlightedObj, urlEncode } from '../highlighting';

//Firestore
const Annotations = firestore.collection('Annotations');
const UrlPages = firestore.collection('UrlPages');
const Entries = firestore.collection('Entries');

export class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      highlightText: 'highlight text to create a comment!',
      highlightObj: {},
      markInstance: ''
    };
  }

  componentWillUnmount = () => {
    this.setState({
      message: '',
      highlightText: 'highlight text to create a comment!',
      highlightObj: {},
      markInstance: ''
    });
  }

  handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { setView } = this.props;
    const { newString, domPath, url, isAddingEntry, activeId } = this.props.highlightObj;
    const submitUrl = urlEncode(url);
    const messageSubmit = this.state.message;
    const newFireHL = {
      newString,
      domPath,
      submitUrl
    };
    console.log('newFireHL', newFireHL);
    isAddingEntry ?

    UrlPages.doc(submitUrl)
    .collection('highlights')
    .doc(activeId)
    .collection('entries')
    .add({
      isQuestion: this.props.isQuestion,
      upVote: 0,
      downVote: 0,
      score: 0,
      content: messageSubmit,
      highlightID: activeId,
      comments: [],
      user: this.props.user.displayName,
      userId: this.props.user.uid,
      date: new Date(),
      title: this.state.title
    })
    .then(entry => {
            UrlPages.doc(submitUrl)
            .collection('highlights')
            .doc(activeId)
            .collection('entries')
            .doc(entry.id)
            .update({
              entryId: entry.id,
            })
          .catch(error => console.log('error: ', error));
      })
      .then(_ => setView('singleHL'))
      .catch(error => console.log('error: ', error)) :

    UrlPages.doc(submitUrl)
      .collection('highlights')
      .add(newFireHL)
      .then(highlight => {
        UrlPages.doc(submitUrl)
          .collection('highlights')
          .doc(highlight.id)
          .collection('entries')
          .add({
            isQuestion: this.props.isQuestion,
            upVote: 0,
            downVote: 0,
            score: 0,
            content: messageSubmit,
            highlightID: highlight.id,
            comments: [],
            user: this.props.user.displayName,
            userId: this.props.user.uid,
            date: new Date(),
            title: this.state.title
          })
          .then(entry => {
            UrlPages.doc(submitUrl)
            .collection('highlights')
            .doc(highlight.id)
            .collection('entries')
            .doc(entry.id)
            .update({
              entryId: entry.id,
            })
            .catch(error => console.log('error: ', error));
          })
          .catch(error => console.log('error: ', error));
      })
      .then(_ => setView(''))
      .catch(error => console.log('error: ', error));
  };

  render() {
    return (
      <div>
        <div className="chromelights-highlight-container">
          <h3 className="chromelights-highlight-title">...{this.props.highlightText}...</h3>
        </div>
        <div id="message-form">
          <form onSubmit={this.onSubmit} className="chromelights-entry-form">
            <div>
            <label>Title: </label>
            <input
              type="text"
              name="title"
              className="chromelights-entry-title"
              onChange={this.handleChange}
              value={this.state.title}
              required
            />
            </div>
            <br />
            <label>Add Question/Annotation: </label>
            <textarea
              type="text"
              name="message"
              className="chromelights-entry-input"
              onChange={this.handleChange}
              value={this.state.message}
              required
            />
            <br />
            <input
              type="submit"
              value="Submit"
              className="chromelights-btn"
              required
            />
          </form>
        </div>
      </div>
    );
  }
}

const MapState = ({ highlight }) => {
  const highlightObj = highlight.highlightObj;
  const highlightText = highlight.highlightText;
  return { highlightObj, highlightText };
};

const MapDispatch = null;

export default connect(MapState, MapDispatch)(CreateEntry);
