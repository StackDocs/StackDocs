import React from 'react';

import QuestionIcon from 'svg-react-loader?name=QuestionIcon!~/chrome/src/icons/question-circle.svg';
import AnnotationIcon from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/exclamation-circle.svg';


export default function AksOrAnnotate(props) {
  const selectEntryType = props.selectEntryType;
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
