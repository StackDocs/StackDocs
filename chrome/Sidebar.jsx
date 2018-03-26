import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import Header from './src/components/Header';
import SecondaryHeader from './src/components/SecondaryHeader';
import { firestore } from '~/fire';
import Mark from 'mark.js';
import shadowCSS from './src/shadow.css';

//Components
import AllHighlights from './src/containers/AllHighlights';
import SingleHighlight from './src/containers/SingleHighlight';
import AskOrAnnotate from './src/components/AskOrAnnotate';
import CreateEntry from './src/components/CreateEntry';
import Logout from './src/components/Logout';


//helper functions
import { urlEncode } from './src/highlighting';
import { addEventListener } from './src/index.js';

// Redux
import { Provider } from 'react-redux';
import store from '~/chrome/src/store';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      isQuestion: true,
      user: '',
      activeId: ''
    };

    document.addEventListener('click', () => {
      if (document.getElementsByClassName('activeHighlight').length) {
        const activeId = document.getElementsByClassName('activeHighlight')[0]
          .classList[1];
        this.setState({ activeId })
        this.setView('singleHL');
      }

      this.setView = this.setView.bind(this)
    });
  }

  componentDidMount() {
    fetchHighlights();
  }

  setView = (view) => {
    this.setState({
      view
    });
  }

  //add components that are rendered depending on views here:
  //to redirect switch views from your component pass the setView as props
  //and change the view in your component's button, form etc.

  selectComponents() {
    switch (this.state.view) {
      case 'singleHL':
        return <SingleHighlight activeId={this.state.activeId}/>;
      case 'askOrAnnotate':
        return <AskOrAnnotate selectEntryType={this.selectEntryType} />;
      case 'createEntry':
        return (
          <CreateEntry
            setView={this.setView}
            isQuestion={this.state.isQuestion}
            user={this.props.user}
          />
        );
      default:
      //new = AllEntries
        return <AllHighlights setView={this.setView}/>;
    }
  }

  selectEntryType = (evt) => {
    evt.preventDefault();
    const type = evt.target.value;
    this.setState({
      isQuestion: type,
      view: 'createEntry'
    });
    console.log('state: ', this.state);
  }

  //components that will always show got here in the render
  //components that will be only rendered in certain views
  //go above in the selectComponents functions' switch statement

  render() {
    return (
      <ShadowDOM>
        <div>
          <Provider store={store}>
            <div>
              <style type="text/css">{shadowCSS}</style>
              <Header setView={this.setView} />
              <SecondaryHeader userDisplayName={this.props.user.displayName} />
              <div className="chromelights-main">{this.selectComponents()}</div>
            </div>
          </Provider>
        </div>
      </ShadowDOM>
    );
  }
}


const UrlPages = firestore.collection('UrlPages');

const fetchHighlights = () => {
  const hlArr = [];
  let encodedDocUrl = urlEncode(document.location.href);

  UrlPages.doc(encodedDocUrl).collection('highlights').get()
    .then(querySnapshot => {

      querySnapshot.forEach(highlight => {
        const markedId = document.getElementsByClassName(highlight.id);

        if (!markedId.length) {
          hlArr.push([highlight.data(), highlight.id]);
        }
      });
      return 'next';
    })
    .then(() => {
      hlArr.map(hl => {
        const markInstance = new Mark(hl[0].domPath);
        markInstance.mark(hl[0].newString, {
          acrossElements: true,
          separateWordSearch: false,
          className: `chromelights-highlights ${hl[1]}`
        });
      });
    })
    .then(() => {
      addEventListener();
    })
    .catch(error => console.log('error: ', error));
};
