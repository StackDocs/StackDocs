import React, { Component } from 'react';
import Header from './src/components/Header';
import HighlightAnnotations from './src/containers/HighlightAnnotations';
import AskOrAnnotate from './src/components/AskOrAnnotate';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'askOrAnnotate',
      currentEntryType: ''
    };

    this.setView = this.setView.bind(this);
  }

  setView(view) {
    console.log('ran setView');
    this.setState({
      view
    })
  }

  selectComponents() {
    switch (this.state.view) {
      case 'login':
        return <HighlightAnnotations />;
      case 'home':
        return <HighlightAnnotations />;
      case 'askOrAnnotate':
        return <AskOrAnnotate selectEntryType={this.selectEntryType} />;
      case 'submission':
        return <HighlightAnnotations />;//this will be the Submission component;
      default:
        return <HighlightAnnotations />;
    }
  }

  selectEntryType(evt) {
    evt.preventDefault();
    console.log(evt);
    // this.setState = {
    //   currentEntryType: type,
    //   view: 'submission'
    };



  render() {
    return (
      <div>
        <Header setView={this.setView} />
        {this.selectComponents()}
      </div>
    );
  }
}
