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
const Highlights = fs.collection('UrlPages').doc(encodedDocUrl).collection('highlights');


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

export default class AllHighlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHighlight: this.props.activeId || 'Select Some Text',
      highlightObj: {},
      sorted: []
    };
  }

  componentWillMount = () => {
    this.fetchEntries();
    // this.fetchHighlight();
  }

  fetchEntries() {
    let shareArr = [];
    Highlights.get()
    .then(querySnapshot => {
      querySnapshot.forEach(highlight => {
        Highlights.doc(highlight.id).collection('entries').get()
        .then(entrySnapShot => {
          entrySnapShot.forEach(entry => {
            // console.log('infoside multiple entry:', entry.data(), entry.id);
            shareArr.push([entry.id, entry.data()]);
          });
        });
      });
      return shareArr;
    })
    .then(shared => {
      console.log('sharrArr with newID added!!!!!!', shared, shared[1]);
      return sortByVote(shared);
    })
    .then(sorted => {
      console.log('sorted: ', sorted);
      this.setState({ sorted });
    })
    .catch(error => console.log('error: ', error));
  }

  // fetchHighlight = () => {
  //   Highlights.doc(this.state.selectedHighlight)
  //   .get()
  //   .then(highlight => {
  //     this.setState({ highlightObj: highlight.data() });
  //   });
  // }

  componentWillReceiveProps(newProps) {
    if (newProps.activeId) {
      this.setState({ selectedHighlight: newProps.activeId }, () => {
        // this.fetchHighlight();
        this.fetchEntries();
      });
    }
  }

  render() {
    const setView = this.props.setView;
    // const highlightTitle = this.state.highlightObj.newString;
    //Set State

    console.log('state in all highlights ', this.state);
    return (
      <div id="highlight-annotation">
        <div className="chromelights-highlight-header">
          <div className="chromelights-highlight-container">
            <h3 className="chromelights-highlight-title">
              {`...All entries...`}
            </h3>
          </div>
          <CreateHighlightButton setView={setView} />
        </div>
        {
          this.state.sorted && this.state.sorted.map(entry => {
            const { title, content, user, date, downVote, upVote, comments } = entry[1];
            const entryId = entry[0];
            return (
              <div key={entry.content}>
                <EntryContainer entryId={entryId} highlightId={this.state.selectedHighlight} title={title} content={content} user={user} downVote={downVote} upVote={upVote} comments={comments} date="March 20, 2018" />
              </div>
            );
          })

        }
      </div>
    );
  }
}

