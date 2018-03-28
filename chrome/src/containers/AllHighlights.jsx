import React, { Component } from 'react';
import { Map } from 'fireview';
import { firestore as fs } from '~/fire';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';
import CreateHighlightButton from '../components/CreateHighlightButton';
import { urlEncode } from '../highlighting';
import EntryContainer from './EntryContainer';

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
      selectedHighlight: this.props.activeId || 'Select Some Text',
      highlightObj: {},
      sorted: []
    };
  }

  componentDidMount = () => {
    this.fetchEntries();
  };

  fetchEntries() {
    Highlights.get()
      .then(querySnapshot =>
        Promise.all(
          querySnapshot.docs.map(highlight =>
            highlight.ref.collection('entries').get()
          )
        )
      )
      .then(snapshots =>
        snapshots.reduce(
          (all, one) => [
            ...all,
            ...one.docs.map(entry => [entry.id, entry.data()])
          ],
          []
        )
      )
      .then(shared => {
        return sortByVote(shared);
      })
      .then(sorted => {
        this.setState({ sorted });
      })
      .catch(error => console.log('error: ', error));
  }


  render() {
    const setView = this.props.setView;
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
              title,
              content,
              user,
              date,
              downVote,
              upVote,
              comments
            } = entry[1];
            const entryId = entry[0];
            console.log('DATE IN ALL HIGHLIGHTS: ', date, typeof date)
            return (
              <div key={entry.content}>
                <EntryContainer
                  entryId={entryId}
                  highlightId={this.state.selectedHighlight}
                  title={title}
                  content={content}
                  user={user}
                  downVote={downVote}
                  upVote={upVote}
                  comments={comments}
                  date={date.toString().slice(0, 15)}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
