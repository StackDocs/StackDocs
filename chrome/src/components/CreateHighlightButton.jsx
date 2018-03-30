import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mark from 'mark.js';
import { createHighlightedObj } from '../highlighting';
import { createHighlight } from '~/chrome/src/store';


export class CreateHighlightButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newString: ''
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
    event.preventDefault();
    try {
      const highlightObj = createHighlightedObj();
      const classStr = highlightObj.newString ? highlightObj.newString.split(' ').join('').trim() : '';
      const clickedHL = document.getElementsByClassName('activeHighlight');

      if (!classStr.length && !clickedHL.length) return;

      if (classStr.length) {
        this.setState({
          newString: classStr
        });
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
          className: `chromelights-highlights ${classStr}`
        });
      } else if (clickedHL.length){
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
          {/*
            !this.state.newString.length && !isClicked ?
            'Please select some text, or click on a highlight!' :
            null
          */}
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
