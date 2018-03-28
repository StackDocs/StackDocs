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
    // this.fetchHighlight();
  }

  fetchEntries = () => {
    UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.state.selectedId)
    .collection('entries')
    .get()
    .then(querySnapshot => {
      let shareArr = [];
      querySnapshot.forEach(entry => {
        shareArr.push([entry.id, entry.data()]); //added array
      });
      return shareArr;
    })
    .then(shared => {
      console.log('sharrArr with newID added!!!!!!', shared);
      return sortByVote(shared);
    })
    .then(sorted => {
      this.setState({ sorted });
    })
    .catch(error => console.log('error: ', error));
  }

  // fetchHighlight = () => {
  //   console.log(this.props.activeId)
  //   UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.props.activeId)
  //   .get()
  //   .then(highlight => {
  //     this.setState({ highlightObj: highlight.data() });
  //   });
  // }

  componentWillReceiveProps(newProps) {
    if (newProps.activeId) {
      this.setState({
        selectedHighlight: newProps.activeHL,
        selectedId: newProps.activeId
      }, () => {
        // this.fetchHighlight();
        this.fetchEntries();
      })
    }
  }

  render() {

    const urlReadOnly = document.location.href;
    const url = urlEncode(urlReadOnly);
    const setView = this.props.setView;
    const highlightTitle = this.state.selectedHighlight;
    //Set State

    console.log('PROPS IN HIGHLIGHTANNOTATIONS: ', this.props);
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
            const { title, content, user, date, downVote, upVote, comments } = entry[1];
            const entryId = entry[0];
            return (
              <div key={entry.content}>
                <EntryContainer entryId={entryId} highlightId={this.state.selectedHighlight} title={title} content={content} user={user} downVote={downVote} upVote={upVote} comments={comments} date={date.toString().slice(0,15)} />
              </div>
            );
          })

        }
      </div>
    );
  }
}

