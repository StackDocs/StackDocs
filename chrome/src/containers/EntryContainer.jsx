import React, { Component } from 'react';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';

export default class EntryContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { entryId, highlightId, title, content, user, date, downVote, upVote, comments } = this.props;
        return (
            <div>
                <h3>{title}</h3>
                <Annotations
                    content={content}
                    user={user}
                    date={date} />
                <Interactive
                    highlightId={highlightId}
                    entryId={entryId}
                    downVote={downVote}
                    upVote={upVote}
                    comments={comments} />
            </div>
        )
    }
}
