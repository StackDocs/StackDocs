import React from 'react';

import QuestionIconLarge from 'svg-react-loader?name=QuestionIcon!~/chrome/src/icons/question-circle-large.svg';
import AnnotationIconLarge from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/exclamation-circle-large.svg';


export default function AksOrAnnotate(props) {
  const selectEntryType = props.selectEntryType;
  return (
    <div id="ask-or-annotate">
      <QuestionIconLarge />
      <button onClick={selectEntryType} value="ask">Ask</button>
      <p>or</p>
      <AnnotationIconLarge />
      <button onClick={selectEntryType} value="annotate">Annotate</button>
    </div>
  );
}
