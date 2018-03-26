import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import Header from './src/components/Header';
import { firestore } from '~/fire';
import Mark from 'mark.js';
import HighlightAnnotations from './src/containers/HighlightAnnotations';
import HighlightDev from './src/containers/HighlightDev';
import AskOrAnnotate from './src/components/AskOrAnnotate';
import CreateHighlights from './src/components/CreateHighlights';
import Logout from './src/components/Logout';
import shadowCSS from './src/shadow.css';
import { urlEncode } from './src/highlighting';
import { addEventListener } from './src/index.js';


// Redux
import {Provider} from 'react-redux'
import store from '~/chrome/src/store'

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      isQuestion: true,
      user: '',
      activeId: ''
    };

    document.addEventListener('click', () => {
      if (document.getElementsByClassName('activeHighlight').length){
        const activeId = document.getElementsByClassName('activeHighlight')[0].classList[1];
        this.setState({ activeId }, () => {
          // console.log('state inside', this.state);
        });
      }
    });

    this.setView = this.setView.bind(this);
    this.selectEntryType = this.selectEntryType.bind(this);
  }

  componentDidMount() {
    fetchHighlights();
    console.log('component mounting....');
  }


  setView(view) {
    this.setState({
      view
    });
  }

  //add components that are rendered depending on views here:
  //to redirect switch views from your component pass the setView as props
  //and change the view in your component's button, form etc.

  selectComponents() {
    switch (this.state.view) {
      case 'home':
        return <CreateHighlights />;
      case 'askOrAnnotate':
        return <AskOrAnnotate selectEntryType={this.selectEntryType} />;
      case 'submission':
        return <CreateHighlights setView={this.setView} isQuestion={this.state.isQuestion}/>;
      default:
        return <HighlightAnnotations activeId={this.state.activeId}/>;
    }
  }

  selectEntryType(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    this.setState({
      isQuestion: type,
      view: 'submission'
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
            <p>Current User: {this.props.user.displayName} </p>
            <Logout />
            {this.selectComponents()}
            </div>
          </Provider>
        </div>
      </ShadowDOM>
    );
  }
}

const hlArr = [];
const UrlPages = firestore.collection('UrlPages');

const fetchHighlights = () => {
  let encodedDocUrl = urlEncode(document.location.href);
  //console.log('encoded URL:', encodedDocUrl);
  UrlPages.doc(encodedDocUrl).collection('highlights').get()
    .then(querySnapshot => {
      //console.log('querysnapshot: ', querySnapshot);
      querySnapshot.forEach(highlight => {
        // console.log('highlight: ', highlight);
        hlArr.push([highlight.data(), highlight.id]);
      });
      return 'next';
    })
    .then(() => {
      console.log('highlight arr: ', hlArr);
      hlArr.map(hl => {
        console.log('in hl map', hl[1], hl[0]);
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
