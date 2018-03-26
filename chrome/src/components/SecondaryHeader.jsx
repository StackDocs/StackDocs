import React from 'react';
import Logout from './Logout';
import ViewBtnBack from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/view-btn-back.svg';
import ViewBtnForward from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/view-btn-forward.svg';

export default function SecondaryHeader(props) {
  return (
    <div className="chromelights-secondary-header">
      <ViewBtnBack className="chromelights-view-btn" />
      <p>Hi, {props.userDisplayName}!</p>
      <Logout />
      <ViewBtnForward className="chromelights-view-btn" />
    </div>
  );
}
