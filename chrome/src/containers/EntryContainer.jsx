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
        const { entryId, fetch, hlPropsId, title, content, user, date, downVote, upVote, comments, currentUser } = this.props;
        return (
            <div className="chromelights-entry">
                <h3>{title}</h3>
                <Annotations
                    content={content}
                    user={user}
                    date={date} />
                <Interactive
                    highlightId={hlPropsId}
                    fetch={fetch}
                    entryId={entryId}
                    downVote={downVote}
                    upVote={upVote}
                    comments={comments}
                    user={user}
                    currentUser={currentUser} />
            </div>
        )
    }
}
