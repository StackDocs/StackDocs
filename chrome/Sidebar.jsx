import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import Header from './src/components/Header';
import HighlightAnnotations from './src/containers/HighlightAnnotations';
import AskOrAnnotate from './src/components/AskOrAnnotate';
import FindHighlights from './src/components/FindHighlights';
import CreateHighlights from './src/components/CreateHighlights';

// const styles = `
// * {
//   padding: 0;
//   margin: 0;
// }

// #chromelights-sidebar {
// padding: 0;
// position: fixed;
// top: 0;
// right: 0;
// height: 100%;
// width: 30%;
// background-color: white;
// z-Index: 16777271;
// box-shadow:-15px 0 50px rgba(0,0,0,0.15);
// font-family: 'Courier New', Courier, monospace
// }

// #hightlight-title {
//   color: green;
// }
// /****************************************************
// *                                                   *
// *               Sidebar Animation                   *
// *                                                   *
// *****************************************************/

// .animated {
//   -webkit-animation-duration: 0.5s;
//   animation-duration: 0.5s;
//   -webkit-animation-fill-mode: both;
//   animation-fill-mode: both;
// }

// @-webkit-keyframes slideInRight {
//   from {
//     -webkit-transform: translate3d(100%, 0, 0);
//     transform: translate3d(100%, 0, 0);
//     visibility: visible;
//   }

//   to {
//     -webkit-transform: translate3d(0, 0, 0);
//     transform: translate3d(0, 0, 0);
//   }
// }

// @keyframes slideInRight {
//   from {
//     -webkit-transform: translate3d(100%, 0, 0);
//     transform: translate3d(100%, 0, 0);
//     visibility: visible;
//   }

//   to {
//     -webkit-transform: translate3d(0, 0, 0);
//     transform: translate3d(0, 0, 0);
//   }
// }

// .slideInRight {
//   -webkit-animation-name: slideInRight;
//   animation-name: slideInRight;
// }

// @-webkit-keyframes slideOutRight {
//   from {
//     -webkit-transform: translate3d(0, 0, 0);
//     transform: translate3d(0, 0, 0);
//   }

//   to {
//     visibility: hidden;
//     -webkit-transform: translate3d(100%, 0, 0);
//     transform: translate3d(100%, 0, 0);
//   }
// }

// @keyframes slideOutRight {
//   from {
//     -webkit-transform: translate3d(0, 0, 0);
//     transform: translate3d(0, 0, 0);
//   }

//   to {
//     visibility: hidden;
//     -webkit-transform: translate3d(100%, 0, 0);
//     transform: translate3d(100%, 0, 0);
//   }
// }

// .slideOutRight {
//   -webkit-animation-name: slideOutRight;
//   animation-name: slideOutRight;
// }

// #chromelights-header {
//   width: 100%;
//   height: 60px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: green;
//   background-color: rgb(52, 96, 207);
//   margin: auto;
// }

// /* Body of the sidebar */
// .higlight-annotations{
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgb(197, 213, 253);
//   margin: auto;
// }

// /****************************************************
// *                                                   *
// *                   highlights                      *
// *                                                   *
// *****************************************************/


// .chromelights-highlights {
//   cursor: pointer;
//   background-color: rgb(221, 221, 221);
//   transition: background-color 0.3s;
// }

// .activeHighlight {
//   cursor: pointer;
//   background-color: yellow;
//   transition: background-color 0.3s;
// }

// .chromelights-highlights:hover {
//   background-color: yellow;
//   transition: background-color 0.3s;
// }

// `;


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      currentEntryType: ''
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
        return <HighlightAnnotations />;
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
  // const styles = '#chromelights-header {background-color: green}';
    return (
      <ShadowDOM>
      <div>
        <Header setView={this.setView} />
        {this.selectComponents()}
        <link href="styles.css" rel="stylesheet" />
      </div>
      </ShadowDOM>
    );
  }
}

