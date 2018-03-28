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
    const currentUser = this.props.currentUser;

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
              highlightID,
              date,
              downVote,
              upVote,
              comments
            } = entry[1];
            const entryId = entry[0];
            return (
              <div key={entry.content}>
                <EntryContainer
                  entryId={entryId}
                  hlPropsId={highlightID}
                  title={title}
                  content={content}
                  user={user}
                  downVote={downVote}
                  upVote={upVote}
                  comments={comments}
                  date={date}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
