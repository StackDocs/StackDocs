import React from 'react';
import CreateHighlightButton from './CreateHighlightButton'
import logo from '../stackdocs-logo.png'

export default function Header(props) {
  const setView = props.setView;
  return (
    <div className="chromelights-header">
      <img className="chromelights-logo" onClick={() => setView('home')} src={logo} />
    </div>
  );
}
