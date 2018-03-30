import React, { Component } from 'react';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
import { Comment } from './index';
import { watch } from '../index.js';

//Helper func
let encodedDocUrl = urlEncode(document.location.href);
const Highlights = firestore.collection('UrlPages').doc(encodedDocUrl).collection('highlights');

export default class AllComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allComments: [],
        };
    }

    componentDidMount() {
        this.listen(this.props);
    }

    componentWillReceiveProps(props) {
        if (props.entryId !== this.props.entryId) {this.listen(props)};
    }

    listen({ entryId, highlightId }) {
        this.unsub();
        if (!entryId) return;

        const Comments = Highlights
            .doc(highlightId)
            .collection('entries')
            .doc(entryId)
            .collection('comments');

        this.subscription = watch(Comments)
            .map(comments => comments.docs.map(_ => _.data()))
            .map(dataArr => dataArr.map(data => [data.commentId, data]))
            .subscribe(allComments => this.setState({ allComments }, () => this.props.commentCount(allComments.length)));
    }

    unsub() {
        if (!this.subscription) return;
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    componentWillUnmount = () => this.unsub()

    render() {

        return (
            <div>
                {this.state.allComments && this.state.allComments.map(comment => {
                    const { content, userDisplayName, cmtUpVote, cmtDownVote, date, score, userId } = comment[1];
                    const commentId = comment[0];
                    return (
                        <div key={commentId}>
                            <Comment
                                content={content}
                                userDisplayName={userDisplayName}
                                cmtUpVote={cmtUpVote}
                                cmtDownVote={cmtDownVote}
                                date={date} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

