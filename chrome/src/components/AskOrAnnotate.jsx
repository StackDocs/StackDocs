import React from 'react';
import { connect } from "react-redux";
import QuestionIcon from 'svg-react-loader?name=QuestionIcon!~/chrome/src/icons/question-circle.svg';
import AnnotationIcon from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/exclamation-circle.svg';


export function AskOrAnnotate(props) {
  const selectEntryType = props.selectEntryType;
  console.log(props.highlightObj,"highlight object")
  return (
    <div id="ask-or-annotate">
      <QuestionIcon />
      <button onClick={selectEntryType} value="ask">Ask</button>
      <p>or</p>
      <AnnotationIcon />
      <button onClick={selectEntryType} value="annotate">Annotate</button>
    </div>
  );
}

const MapState = ({ highlight }) => { 
  const highlightObj = highlight.highlightObj;
  return { highlightObj }
};

const MapDispatch = null;

export default connect(MapState, MapDispatch)(AskOrAnnotate);

