import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mark from 'mark.js';
import { createHighlightedObj } from '../highlighting';
import { createHighlight } from '~/chrome/src/store';


export class CreateHighlightButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};

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
    event.preventDefault();
    try {
      const highlightObj = createHighlightedObj();

      if (document.getSelection().toString().length) {
        // if (this.props.markInstance) this.props.markInstance.unmark();
        const markInstance = await new Mark(highlightObj.domPath);
        this.props.storeHighlight(
          {
            highlightObj,
            markInstance,
            highlightText: highlightObj.newString
          }
        );
        await markInstance.mark(highlightObj.newString, {
          acrossElements: true,
          separateWordSearch: false,
          className: `chromelights-highlights ${highlightObj.newString}`
        });
      } else if (document.getElementsByClassName('activeHighlight').length){
        this.props.storeHighlight(
          {
            highlightObj,
            markInstance: '',
            highlightText: highlightObj.newString
          }
        );
      }
      this.props.setView('askOrAnnotate');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const isClicked = document.getElementsByClassName('activeHighlight').length;
    return (
      <div>
        <button className="chromelights-btn" onClick={this.onHighlightClick}>
          {
            isClicked ?
            'Add an Entry' :
            'Create a Highlight'
          }
        </button>
      </div>
    );
  }
}
const MapState = ({highlight}) => {
  const highlightObj = highlight.highlightObj;
  const markInstance = highlight.markInstance;
  return { highlightObj, markInstance };
};

const MapDispatch = dispatch => ({
  storeHighlight: (highlight) => dispatch(createHighlight(highlight))
});

export default connect(MapState, MapDispatch)(CreateHighlightButton);
