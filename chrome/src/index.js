import React from 'react'
import ReactDOM from 'react-dom'

import Sidebar from '~/chrome/Sidebar';

import { findToHighlight, createHighlightedObj } from './highlighting';

const sidebar = document.createElement('div');
sidebar.id = 'chromelights-sidebar';

document.body.appendChild(sidebar);

ReactDOM.render(<Sidebar />, document.getElementById('chromelights-sidebar'));


//this is just hardcoded at the moment, for testing purposes
const pathOne = ["HTML", "BODY", "DIV", "DIV", "DIV", "PRE", "CODE", "CODE", "SPAN"]
const str1 = 'pool';

findToHighlight(pathOne, str1);

document.addEventListener('mouseup', createHighlightedObj);
