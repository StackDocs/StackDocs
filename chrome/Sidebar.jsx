import React, { Component } from 'react';
import Header from './src/components/Header';
import HighlightAnnotations from './src/containers/HighlightAnnotations';
import AskOrAnnotate from './src/components/AskOrAnnotate';
import FindHighlights from './src/components/FindHighlights';
import CreateHighlights from './src/components/CreateHighlights';
import Login from './src/components/Login';

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
        return <HighlightAnnotations />;
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
      <div>
        <Header setView={this.setView} />
        {this.selectComponents()}
      </div>
    );
  }
}

