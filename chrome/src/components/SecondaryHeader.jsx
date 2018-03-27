import React from 'react';
import Logout from './Logout';
import ViewBtnBack from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/view-btn-back.svg';


export default function SecondaryHeader(props) {
  return (
    <div className="chromelights-secondary-header">
        <p className="chromelights-back-btn" onClick={props.goToPreviousView} >	Back</p>
      <p>Hi, {props.userDisplayName}!</p>
      <Logout />
    </div>
  );
}
