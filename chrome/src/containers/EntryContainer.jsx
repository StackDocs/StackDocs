import React, { Component } from 'react';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';

//icons

import QuestionIcon from 'svg-react-loader?name=QuestionIcon!~/chrome/src/icons/question-circle-sm.svg';
import AnnotationIcon from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/exclamation-circle-sm.svg';

export default class EntryContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      entryId,
      isQuestion,
      fetch,
      hlPropsId,
      title,
      content,
      user,
      date,
      downVote,
      upVote,
      comments
    } = this.props;
    return (
      <div className="chromelights-entry">
        <div className="chromelights-entry-header">
          {isQuestion ?
            <QuestionIcon className="chromelights-question-icon chromelights-small-icon" /> :
            <AnnotationIcon className="chromelights-annotation-icon chromelights-small-icon" />}
          <h3 className="chromelights-entry-title-header"> {title}</h3>
        </div>
        <Annotations content={content} user={user} date={date} />
        <Interactive
          hlPropsId={hlPropsId}
          fetch={fetch}
          entryId={entryId}
          downVote={downVote}
          upVote={upVote}
          comments={comments}
        />
      </div>
    );
  }
}
