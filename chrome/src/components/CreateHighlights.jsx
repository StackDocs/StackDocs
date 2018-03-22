import React, { Component } from "react";
import { firestore } from "~/fire";
import ReactDOM from "react-dom";
import {
  createHighlightedObj,
  urlEncode
} from "../highlighting";

//Firestore
const Highlights = firestore.collection("Highlights");
const Annotations = firestore.collection("Annotations");
const Websites = firestore.collection("Websites");

export default class CreateHighlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      highlightText: document.getSelection().toString()
    };
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

    const { newString, domPath } = createHighlightedObj();

    const submitUrl = urlEncode(document.URL);

    const userId = 'TBD';

    // console.log("asdfjhao;sfj", submitUrl);

    let { value } = event.target;
    let newFireHL = {
      newString,
      domPath,
      userId
    };

    Websites.doc(submitUrl).set({
      content: wholeDoc
    });

    Highlights.add(newHighlightEntry)
      .then(newDoc => {
        console.log("added highlight:", newDoc.id, newDoc);
        return newDoc.id;
      })
      .then(docId => {
        Annotations.add({
          content: this.state.message,
          highLightId: docId
        }).then(newAnn => {
          console.log("Annotation added: ", newAnn);
        });
      })
      .catch(error => console.log("error: ", error));
  };

  render() {
    return (
      <div>
        <h2> Highlight text to ask or annotate! </h2>
        <div>{this.state.highlightText}</div>
        <h5>User name, data </h5>
        <div id="message-form">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="message"
              className="message-field-wide"
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

// url: {
//   1234234t5098: {
//     domPath: asdofihj,
//     url,
//     newString,
//     comments: {
//       comment ids?
//     }
//   },
//   20158798sadogij: {
//     createHighlightedObj
//   }
// }
