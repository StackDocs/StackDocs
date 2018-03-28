import React, { Component } from 'react';
import Logout from './Logout';
import ViewBtnBack from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/view-btn-back.svg';
import { connect } from 'react-redux';


class SecondaryHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  clickBack = () => {
    const view = this.props.currentView;
    const highlightStr = this.props.highlightObj.newString || null;
    if (view === 'askOrAnnotate' && highlightStr) {
      this.props.markInstance.unmark({className: highlightStr});
    }
    this.props.goToPreviousView();
  }

  render() {
    return (
      <div className="chromelights-secondary-header">
          <p className="chromelights-back-btn" onClick={this.clickBack} >	Back</p>
        <p>Hi, {this.props.userDisplayName}!</p>
        <Logout />
      </div>
    );
  }
}

const MapState = ({highlight}) => {
  const highlightObj = highlight.highlightObj;
  const markInstance = highlight.markInstance;
  return { highlightObj, markInstance };
};

export default connect(MapState, null)(SecondaryHeader);
