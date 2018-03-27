import React, { Component } from 'react';
import { Map } from 'fireview';
import { firestore as fs } from '~/fire';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';
import CreateHighlightButton from '../components/CreateHighlightButton';
import { urlEncode } from '../highlighting';

export default class SingleHighlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHighlight: this.props.activeHL || 'Select Some Text',
      selectedId: this.props.activeId
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activeId) {
      this.setState({
        selectedHighlight: newProps.activeHL,
        selectedId: newProps.activeId
      });
    }
  }

  render() {
    const urlReadOnly = document.location.href;
    const url = urlEncode(urlReadOnly);
    const setView = this.props.setView;

    return (
      <div id="highlight-annotation">
        <div className="chromelights-highlight-header">
          <div className="chromelights-highlight-container">
            <h3 className="chromelights-highlight-title">
              {`...${this.state.selectedHighlight}...`}
            </h3>
          </div>
          <CreateHighlightButton
            setView={setView}
            activeId={this.state.activeId}
            activeHL={this.state.activeHL}
          />
        </div>
        <Map
          each
          from={fs
            .collection('UrlPages')
            .doc(url)
            .collection('highlights')
            .doc(this.state.selectedId)
            .collection('entries')}
          Loading={() => <h3>Loading...</h3>}
          Empty={() => <h3 color="red">No Annotations</h3>}
          Render={({
            upVote,
            downVote,
            content,
            comments,
            user,
            date,
            title
          }) => (
            <div>
              <h3>{title}</h3>
              <Annotations
                content={content}
                user={user}
                date={date.toString().slice(0, 15)}
              />
              <Interactive
                downVote={downVote}
                upVote={upVote}
                comments={comments}
              />
            </div>
          )}
        />
      </div>
    );
  }
}
