import React, { Component } from "react";
import { firestore } from "~/fire";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Mark from "mark.js";
import { createHighlightedObj, urlEncode } from "../highlighting";
import { createHighlight } from "~/chrome/src/store"


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
      if (this.props.markInstance) this.props.markInstance.unmark();
      const markInstance = await new Mark(highlightObj.domPath);
      this.props.storeHighlight(
        {
          highlightObj,
          markInstance,
          highlightText: highlightObj.newString
        }
      )
      markInstance.mark(highlightObj.newString, {
        acrossElements: true,
        separateWordSearch: false,
        className: "chromelights-highlights"
      })
      this.props.setView('askOrAnnotate')
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <button className="chromelights-btn" onClick={this.onHighlightClick}>Create a Highlight</button>
      </div>
    );
  }
}
const MapState = ({highlight}) => {
  const highlightObj = highlight.highlightObj;
  const markInstance = highlight.markInstance;
  return { highlightObj, markInstance }
}

const MapDispatch = dispatch => ({
  storeHighlight: (highlight) => dispatch(createHighlight(highlight))
});

export default connect(MapState, MapDispatch)(CreateHighlightButton);
