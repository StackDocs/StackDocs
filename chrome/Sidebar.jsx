import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import { firestore } from '~/fire';
import Mark from 'mark.js';
import shadowCSS from './src/shadow.css';

//Components
import { Header, SecondaryHeader, AskOrAnnotate, CreateEntry } from './src/components';
import { AllHighlights, SingleHighlight } from './src/containers';

//helper functions
import { urlEncode } from './src/highlighting';

// Redux
import { Provider } from 'react-redux';
import store from '~/chrome/src/store';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      previousViews: [],
      isQuestion: true,
      activeId: '',
      activeHL: ''
    };

    document.addEventListener('click', ({target}) => {
      if (!target.classList.contains('chromelights-highlights')) return;

      target.classList.toggle('activeHighlight');

      const alreadyActive = [...document.getElementsByClassName('activeHighlight')];

      for (let i = 0; i < alreadyActive.length; i++) {
        if (alreadyActive[i] !== target) {
          alreadyActive[i].classList.remove('activeHighlight');
        }
      }

      if (document.getElementsByClassName('activeHighlight').length) {
        const clicked = document.getElementsByClassName('activeHighlight')[0];
        const activeId = clicked.classList[1];
        const activeHL = clicked.innerText;
        this.setState({
          activeId,
          activeHL
        });
        this.setView('singleHL');
      }
    });
  }

  componentDidMount() {
    this.fetchHighlights();
  }


  setView = view => {
    const lastView = this.state.view;
    const newPreviousViews = [...this.state.previousViews, lastView];
    this.setState({
      view,
      previousViews: newPreviousViews
    });
  };

  goToPreviousView = () => {
    const lastView = this.state.previousViews[this.state.previousViews.length - 1];
    const activeEl = document.getElementsByClassName('activeHighlight');
    if (activeEl.length && (lastView === 'home' || '')) {
      activeEl[0].classList.remove('activeHighlight');
    }
    this.setState({
      view: lastView,
      previousViews: this.state.previousViews.slice(0, -1)
    });
  };
  //add components that are rendered depending on views here:
  //to redirect switch views from your component pass the setView as props
  //and change the view in your component's button, form etc.

  selectComponents() {
    switch (this.state.view) {
      case 'home':
        return (
          <AllHighlights
            setView={this.setView}
            activeId={this.state.activeId}
            activeHL={this.state.activeHL}
            currentUser={this.props.user}
          />
        );
      case 'singleHL':
        return (
          <SingleHighlight
            setView={this.setView}
            activeId={this.state.activeId}
            activeHL={this.state.activeHL}
            currentUser={this.props.user}
          />
        );
      case 'askOrAnnotate':
        return <AskOrAnnotate selectEntryType={this.selectEntryType} />;
      case 'createEntry':
        return (
          <CreateEntry
            setView={this.setView}
            isQuestion={this.state.isQuestion}
            user={this.props.user}
            activeId={this.state.activeId}
            activeHL={this.state.activeHL}
          />
        );
      default:
        //new = AllEntries
        return <AllHighlights setView={this.setView} activeId={this.state.activeId} currentUser={this.props.user}/>;
    }
  }

  selectEntryType = evt => {
    evt.preventDefault();
    const typeString = evt.target.value;
    const isQuestion = typeString === 'true' ? true : false;
    this.setState({
      isQuestion
    });
    this.setView('createEntry');
  };

  fetchHighlights = async () => {
    const hlArr = [];
    let encodedDocUrl = urlEncode(document.location.href);
    const UrlPages = firestore.collection('UrlPages');

    await UrlPages.doc(encodedDocUrl)
      .collection('highlights')
      .get()
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
      .catch(error => console.log('error: ', error));

        const markedEls = document.getElementsByClassName(
          'chromelights-highlights'
        );

        for (let i = 0; i < markedEls.length; i++) {
          markedEls[i].addEventListener('click', (event) => {
            const activeEl = document.getElementsByClassName('activeHighlight');
            if (event.target.classList[1] === this.state.activeId) {
              this.setState({
                activeHl: '',
                activeId: ''
              });
              this.setView('home');
            }
            if (activeEl.length) {
              const activeId = activeEl[0]
                .classList[1];
              const activeHL = activeEl[0].innerText;
              this.setState({ activeId, activeHL });
              this.setView('singleHL');
            }
          });
        }
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
              <SecondaryHeader
                goToPreviousView={this.goToPreviousView}
                userDisplayName={this.props.user.displayName}
                currentView={this.state.view}
              />
              <div className="chromelights-main">{this.selectComponents()}</div>
            </div>
          </Provider>
        </div>
      </ShadowDOM>
    );
  }
}
