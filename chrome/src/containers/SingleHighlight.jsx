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
  array.map(entry => {
    for (var i = 0; i < array.length; i++){
      if (!updatedOrder[i] || entry.upVote >= updatedOrder[i].upVote){
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
      selectedHighlight: this.props.activeId || 'Select Some Text',
      highlightObj: {},
      sorted: []
    };
  }

  componentWillMount = () => {
    this.fetchEntries();
  }

  fetchEntries = () => {
    UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.state.selectedHighlight)
    .collection('entries')
    .get()
    .then(querySnapshot => {
      let shareArr = [];
      querySnapshot.forEach(entry => {
        shareArr.push(entry.data());
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

  fetchHighlight = () => {
    UrlPages.doc(encodedDocUrl).collection('highlights').doc(this.state.selectedHighlight)
    .get()
    .then(highlight => {
      this.setState({ highlightObj: highlight.data() })
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeId) {
      this.setState({ selectedHighlight: newProps.activeId }, () => {
        this.fetchHighlight();
        this.fetchEntries();
      });
    }
  }

  render() {
    const urlReadOnly = document.location.href;
    const url = urlEncode(urlReadOnly);
    const setView = this.props.setView;

    //Set State

    console.log('PROPS IN HIGHLIGHTANNOTATIONS: ', this.props);
    return (
      <div id="highlight-annotation">
        <div className="chromelights-highlight-header">
          <div className="chromelights-highlight-container">
            <h3 className="chromelights-highlight-title">
              {`...${this.state.highlightObj.newString}...`}
            </h3>
          </div>
          <CreateHighlightButton setView={setView} />
        </div>
        {
          this.state.sorted && this.state.sorted.map(entry => {
            const { title, content, user, date, downVote, upVote, comments } = entry;
            return (
              <div key={entry.content}>
                <EntryContainer title={title} content={content} user={user} downVote={downVote} upVote={upVote} comments={comments} date="March 20, 2018" />
              </div>
            );
          })

        }
      </div>
    );
  }
}

