import React from 'react'
import ReactDOM from 'react-dom'

import Sidebar from '~/chrome/Sidebar'

const sidebar = document.createElement('div');
sidebar.id = 'chromelights-sidebar';

document.body.appendChild(sidebar);

ReactDOM.render(<Sidebar />, document.getElementById('chromelights-sidebar'));
