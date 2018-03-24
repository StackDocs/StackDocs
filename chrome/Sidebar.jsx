import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import Header from './src/components/Header';
import { firestore } from '~/fire';
import Mark from 'mark.js';
import HighlightAnnotations from './src/containers/HighlightAnnotations';
import AskOrAnnotate from './src/components/AskOrAnnotate';
// import FindHighlights from './src/components/FindHighlights';
import CreateHighlights from './src/components/CreateHighlights';
import Login from './src/components/Login';
import shadowCSS from './src/shadow.css';
import { urlEncode } from './src/highlighting';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      currentEntryType: '',
      user: ''
    };

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
      case 'login':
        return <Login />;
      case 'home':
        return <CreateHighlights />;
      case 'askOrAnnotate':
        return <AskOrAnnotate selectEntryType={this.selectEntryType} />;
      case 'submission':
        return <CreateHighlights />;
      default:
        return <HighlightAnnotations />;
    }
  }

  selectEntryType(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    this.setState({
      currentEntryType: type,
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
          <style type="text/css">{shadowCSS}</style>
          <Header setView={this.setView} />
          {this.selectComponents()}
        </div>
      </ShadowDOM>
    );
  }
}


const hlArr = [];
const UrlPages = firestore.collection('UrlPages');

const fetchHighlights = () => {
  let encodedDocUrl = urlEncode(document.location.href);
  // console.log('encoded URL:', encodedDocUrl);
  UrlPages.doc(encodedDocUrl).collection('newCollection').get()
    .then(querySnapshot => {
      // console.log('querysnapshot: ', querySnapshot);
      querySnapshot.forEach(highlight => {
        // console.log('highlight: ', highlight);
        hlArr.push([highlight.data(), highlight.id]);
      });
      return 'next';
    })
    .then(() => {
      // console.log('highlight arr: ', hlArr);
      hlArr.map(hl => {
        // console.log('in hl map', hl[1], hl[0]);
        const markInstance = new Mark(hl[0].domPath);
        markInstance.mark(hl[0].newString, {
          acrossElements: true,
          separateWordSearch: false,
          className: `chromelights-highlights ${hl[1]}`
        });
      });
    })
    .catch(error => console.log('error: ', error));
};
