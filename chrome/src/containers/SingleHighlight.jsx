import React, { Component } from 'react';
import { Map } from 'fireview';
import { firestore as fs } from '~/fire';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';
import CreateHighlightButton from '../components/CreateHighlightButton';
import { urlEncode } from '../highlighting';
import EntryContainer from './EntryContainer';

//Helper func
const UrlPages = fs.collection('UrlPages');
let encodedDocUrl = urlEncode(document.location.href);

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
      highlightObj: {},
      sorted: [],
      selectedHighlight: this.props.activeHL || 'Select Some Text',
      selectedId: this.props.activeId
    };
  }

  componentDidMount = () => {
    this.fetchEntries();
  }

  fetchEntries = () => {
    UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.state.selectedId)
    .collection('entries')
    .get()
    .then(querySnapshot => {
      let shareArr = [];
      querySnapshot.forEach(entry => {
        shareArr.push([entry.id, entry.data()]);
      });
      return shareArr;
    })
    .then(shared => {
      return sortByVote(shared);
    })
    .then(sorted => {
      this.setState({ sorted });
    })
    .catch(error => console.log('error: ', error));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeId) {
      this.setState({
        selectedHighlight: newProps.activeHL,
        selectedId: newProps.activeId
      }, () => {
        this.fetchEntries();
      });
    }
  }

  render() {
    const setView = this.props.setView;
    const highlightTitle = this.state.selectedHighlight;

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

