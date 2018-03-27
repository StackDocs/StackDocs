import React, { Component } from 'react';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';

export default class EntryContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { setView, title, content, user, date, downVote, upVote, comments } = this.props.setView;
        return (
            <div>
                <h3>{title}</h3>
                <Annotations
                    content={content}
                    user={user}
                    date="March 20, 2018" />
                <Interactive
                    downVote={downVote}
                    upVote={upVote}
                    comments={comments} />
            </div>
        )
    }
}
