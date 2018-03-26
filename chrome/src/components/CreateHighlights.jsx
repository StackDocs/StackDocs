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

export class CreateHighlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      highlightText: 'highlight text to create a comment!',
      highlightObj: {},
      markInstance: ''
    };
  }

  componentWillUnmount() {
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

  // PLEASE DO NOT ERASE THIS - Thanks (Fran)
  // async onHighlightClick(event) {
  //   try {
  //     event.preventDefault();
  //     const highlightObj = createHighlightedObj();
  //     if (this.state.markInstance) this.state.markInstance.unmark();
  //     const markInstance = await new Mark(highlightObj.domPath);
  //     this.setState(
  //       {
  //         highlightObj,
  //         markInstance,
  //         highlightText: highlightObj.newString
  //       },
  //       () => {
  //         markInstance.mark(this.state.highlightObj.newString, {
  //           acrossElements: true,
  //           separateWordSearch: false,
  //           className: "chromelights-highlights"
  //         });
  //       }
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  onSubmit = event => {
    event.preventDefault();
    const { setView } = this.props;
    const { newString, domPath, url } = this.props.highlightObj;
    const submitUrl = urlEncode(url);
    const messageSubmit = this.state.message;
    const newFireHL = {
      newString,
      domPath,
      submitUrl
    };
    console.log('newFireHL', newFireHL);

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
            content: messageSubmit,
            highlightID: highlight.id,
            comments: [],
            user: 'Tom',
            date: new Date(),
            title: 'TBD'
          });
      })
      .then(() => {
        setView('');
      })
      .catch(error => console.log('error: ', error));
    this.state;
  };

  render() {
    return (
      <div>
        <div className="chromelights-highlight-container">
          <h3 className="chromelights-highlight-title">...{this.props.highlightText}...</h3>
        </div>
        <h5>User name, data </h5>
        <div id="message-form">
          <form onSubmit={this.onSubmit}>
            <textarea
              type="text"
              name="message"
              className="chromelights-entry-input"
              onChange={this.handleChange}
              value={this.state.message}
            />
            <input type="submit" value="Submit" />
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

export default connect(MapState, MapDispatch)(CreateHighlights);
