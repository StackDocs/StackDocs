import React from 'react';
import { connect } from 'react-redux';
import QuestionIcon from 'svg-react-loader?name=QuestionIcon!~/chrome/src/icons/question-circle.svg';
import AnnotationIcon from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/exclamation-circle.svg';

export function AskOrAnnotate(props) {
  const selectEntryType = props.selectEntryType;
  // console.log(props.highlightObj, 'highlight object');
  return (
    <div className="chromelights-ask-or-annotate">
      <QuestionIcon className="chromelights-big-icon chromelights-question-icon" />
      <button
        className="chromelights-btn"
        onClick={selectEntryType}
        value={'true'}
      >
        Ask
      </button>
      <AnnotationIcon className="chromelights-big-icon chromelights-annotation-icon" />
      <button
        className="chromelights-btn"
        onClick={selectEntryType}
        value={'false'}
      >
        Annotate
      </button>
    </div>
  );
}

const MapState = ({ highlight }) => {
  const highlightObj = highlight.highlightObj;
  return { highlightObj };
};

const MapDispatch = null;

export default connect(MapState, MapDispatch)(AskOrAnnotate);
