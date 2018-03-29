import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestore } from '~/fire';
import { urlEncode } from '../highlighting';

//Firestore
const UrlPages = firestore.collection('UrlPages');

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
    const newDate = new Date();
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
      user: this.props.user.displayName,
      userId: this.props.user.uid,
      date: newDate.toString().slice(0, 15),
      title: this.state.title,
      highlightText: newString
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
            date: newDate.toString().slice(0, 15),
            title: this.state.title,
            highlightText: newString
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
        return highlight;
      })
      .then(highlight => {
        const newHL = document.getElementsByClassName(newFireHL.newString)[0];
        const classStr = newFireHL.newString.split(' ').join('').trim();
        newHL.classList.remove(classStr);
        newHL.classList.add(highlight.id.toString());
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
            <label className="chromelights-form-header">
              Title:
            </label>
            <br />
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
            <label  className="chromelights-form-header">
              Add Question/Annotation:
            </label>
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
