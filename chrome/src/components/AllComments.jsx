import React, { Component } from 'react';
import { urlEncode } from '../highlighting';
import { firestore } from '~/fire';
import { Comment } from './index';

import Rx from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';
const watch = ref => Rx.Observable.create(obs => ref.onSnapshot(obs));

//Helper func
let encodedDocUrl = urlEncode(document.location.href);
const Highlights = fs
    .collection('UrlPages')
    .doc(encodedDocUrl)
    .collection('highlights');


// const sortByVote = array => {
//   const updatedOrder = [];
//   array.forEach(entry => {
//     for (var i = 0; i < array.length; i++){
//       if (!updatedOrder[i] || entry[1].score >= updatedOrder[i][1].score){
//         updatedOrder.splice(i, 0, entry);
//         break;
//       }
//     }
//   });
//   return updatedOrder;
// };

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
        if (props.entryId !== this.props.entryId)
            this.listen(props)
    }

    listen({ entryId, highlightId }) {
        this.unsub()
        if (!entryId) return

        const Comments = Highlights
            .doc(highlightId)
            .collection('entries')
            .doc(entryId)
            .collection('comments')


        this.subscription = watch(Comments)
            .map(comments => comments.docs.map(_ => _.data()))
            .map(values => {
                console.log('values: ', values);
                return values;
            })
            .map(dataArr => dataArr.map(data => [data.commentId, data]))
            .subscribe(allComments => this.setState({ allComments }));
    }

    unsub() {
        if (!this.subscription) return
        this.subscription.unsubscribe()
        this.subscription = null
    }


    componentWillUnmount = () => this.unsub()

    //   selectedHighlight() {
    //     return this.props.activeHL || 'Select some text'
    //   }

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

