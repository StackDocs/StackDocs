import React, { Component } from 'react';
import { Map } from 'fireview';
import { firestore as fs } from '~/fire';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';
import CreateHighlightButton from '../components/CreateHighlightButton';
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
    for (var i = 0; i < array.length; i++){
      if (!updatedOrder[i] || entry[1].score >= updatedOrder[i][1].score){
        updatedOrder.splice(i, 0, entry);
        break;
      }
    }
  });
  return updatedOrder;
};

export default class SingleHighlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sorted: [],
    };
  }

  componentDidMount() {
    this.listen(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.activeId !== this.props.activeId)
      this.listen(props)
  }

  listen({activeId}) {
    this.unsub()
    if (!activeId) return

    const entries = Highlights
      .doc(activeId)
      .collection('entries')

    this.subscription = watch(entries)
        .map(entries => entries.docs.map(_ => _.data()))
        .map(values => {
          console.log('values: ', values);
          return values;
        })
        .map(dataArr => dataArr.map(data => [data.entryId, data]))
        .map(sortArr => sortByVote(sortArr))
        .subscribe(sorted => this.setState({sorted}));
  }

  unsub() {
    if (!this.subscription) return
    this.subscription.unsubscribe()
    this.subscription = null
  }


  componentWillUnmount = () => this.unsub()

  get selectedHighlight() {
    return this.props.selectedHighlight || 'Select some text'
  }

  render() {
    const setView = this.props.setView;
    const highlightTitle = this.selectedHighlight;

    return (
      <div id="highlight-annotation">
        <div className="chromelights-highlight-header">
          <div className="chromelights-highlight-container">
            <h3 className="chromelights-highlight-title">
              {highlightTitle === undefined ? 'Loading...' : `...${highlightTitle}...`}
            </h3>
          </div>
          <CreateHighlightButton
            setView={setView}
            activeId={this.state.activeId}
            activeHL={this.state.activeHL}
          />
        </div>
        {
          this.state.sorted && this.state.sorted.map(entry => {
            const { title, content, highlightID, user, date, downVote, upVote, comments } = entry[1];
            const entryId = entry[0];
            return (
              <div key={entry.content}>
                <EntryContainer entryId={entryId} fetch={this.fetchEntries} hlPropsId={highlightID} title={title} content={content} user={user} downVote={downVote} upVote={upVote} comments={comments} date={date} />
              </div>
            );
          })

        }
      </div>
    );
  }
}

