import React, { Component } from "react";
import { firestore } from "~/fire";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Mark from "mark.js";
import { createHighlightedObj, urlEncode } from "../highlighting";
import { createHighlight } from "~/chrome/src/store"


//Firestore
// const Highlights = firestore.collection("Highlights");

export class CreateHighlightButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onHighlightClick = this.onHighlightClick.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  async onHighlightClick(event) {
    try {
      event.preventDefault();
      const highlightObj = createHighlightedObj();
      if (highlightObj) this.props.markInstance.unmark();
      const markInstance = await new Mark(highlightObj.domPath);
      this.props.storeHighlight(
        {
          highlightObj,
          markInstance,
          highlightText: highlightObj.newString
        },
        () => {
          markInstance.mark(highlightObj.newString, {
            acrossElements: true,
            separateWordSearch: false,
            className: "chromelights-highlights"
          });
        }
      );
    } catch (err) {
      console.error(err);
    }
    this.props.setView('askOrAnnotate')
  }

  render() {
    return (
      <div>
        <button onClick={this.onHighlightClick}>Create</button>
      </div>
    );
  }
}
const MapState = ({highlight}) => {highlight};

const MapDispatch = dispatch => ({
  storeHighlight: (highlight) => dispatch(createHighlight(highlight))
});

export default connect(MapState, MapDispatch)(CreateHighlightButton);
