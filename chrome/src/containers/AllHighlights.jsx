import React, { Component } from 'react';
import { Map } from 'fireview';
import { firestore as fs } from '~/fire';
import { Annotations, Interactive, CreateHighlightButton } from '../components';
// import Annotations from '../components/Annotations';
// import Interactive from '../components/Interactive';
// import CreateHighlightButton from '../components/CreateHighlightButton';
import { urlEncode } from '../highlighting';
import EntryContainer from './EntryContainer';

import Rx from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';
const watch = ref => Rx.Observable.create(obs => ref.onSnapshot(obs));

//Helper func
let encodedDocUrl = urlEncode(document.location.href);
const Highlights = fs
  .collection('UrlPages')
  .doc(encodedDocUrl)
  .collection('highlights');

const sortByVote = array => {
  const updatedOrder = [];
  array.forEach(entry => {
    for (var i = 0; i < array.length; i++) {
      if (!updatedOrder[i] || entry[1].score >= updatedOrder[i][1].score) {
        updatedOrder.splice(i, 0, entry);
        break;
      }
    }
  });
  return updatedOrder;
};

export default class AllHighlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightObj: {},
      sorted: []
    };
  }

  componentDidMount = () => {
    this.fetchEntries();
  };

  fetchEntries = () => {
    this.subscription = watch(Highlights)
      .map(highlights =>
        highlights.docs.map(highlight =>
          watch(highlight.ref.collection('entries')).map(entry => entry.docs)
        )
      )
      .switchMap(entryObs => combineLatest(...entryObs))
      .map(entries => entries.reduce((x, y) => x.concat(y), []))
      .map(entries => entries.map(_ => _.data()))
      // .map(values => {
      //   console.log('values: ', values);
      //   return values;
      // })
      .map(dataArr => dataArr.map(data => [data.entryId, data]))
      .map(sortArr => sortByVote(sortArr))
      .subscribe(sorted => this.setState({ sorted }));
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  render() {
    const setView = this.props.setView;
    console.log('STATE IN ALL HIGHLIGHTS', this.state);

    return (
      <div id="highlight-annotation">
        <div className="chromelights-highlight-header">
          <div className="chromelights-highlight-container">
            <h3 className="chromelights-highlight-title">
              {`...All entries...`}
            </h3>
          </div>
          <CreateHighlightButton
            setView={setView}
            activeId={this.props.activeId}
            activeHL={this.props.activeHL}
          />
        </div>
        {this.state.sorted &&
          this.state.sorted.map(entry => {
            const {
              isQuestion,
              title,
              content,
              user,
              highlightID,
              date,
              downVote,
              upVote,
              comments
            } = entry[1];
            const entryId = entry[0];
            return (
              <EntryContainer
                key={entry.content}
                entryId={entryId}
                isQuestion={isQuestion}
                fetch={this.fetchEntries}
                hlPropsId={highlightID}
                title={title}
                content={content}
                user={user}
                downVote={downVote}
                upVote={upVote}
                comments={comments}
                date={date}
              />
            );
          })}
      </div>
    );
  }
}
