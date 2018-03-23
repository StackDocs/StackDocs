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
const urlPages = firestore.collection("urlPages");

export default class CreateHighlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      highlightText: ''
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
    let { newString, wholeDoc, domPath, url } = createHighlightedObj();
    this.setState({
      highlightText: newString
    })
    let submitUrl = urlEncode(url);
    console.log('domePath', domPath)
    console.log("submitUrl", submitUrl);
    let { value } = event.target;
    let newFireHL = {
      newString,
      submitUrl,
      domPath
    };

    // urlPages.doc(submitUrl).collection("Highlights").doc("ViE2pElHxT1TxYxRTe9L")
    //     .get()
    //     .then(newDoc => {
    //     console.log("Found highlight:", newDoc.id, newDoc);
    //     return newDoc.id;
    //   })
    //   .catch(error => console.log("error: ", error));


    // urlPages.doc(submitUrl).collection("Highlights").add(newFireHL)
    //   .then(newDoc => {
    //     console.log("added highlight:", newDoc.id, newDoc);
    //     return newDoc.id;
    //   })
    //   .catch(error => console.log("error: ", error));

      function fetchHighlightsByUrl(url){
        const hlArr = [];
        urlPages.doc(url).collection('Highlights').get()
          .then(querySnapshot => {
            querySnapshot.forEach(highlight => {
              hlArr.push(highlight.data());
            });
            return 'next';
          })
          .then(() => {
            console.log('highlight arr: ', hlArr);
            hlArr.map(hl => {
              console.log('in hl map', hl.domPath, hl.newString);
            });
          })
          .catch(error => console.log('error: ', error));
          return hlArr;
      }

      console.log("all highlights on this page", fetchHighlightsByUrl(submitUrl) )

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

