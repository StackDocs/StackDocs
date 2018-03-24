import React, { Component } from 'react';
import { firestore } from '~/fire';
import ReactDOM from 'react-dom';
import { urlEncode } from '../highlighting';
import Mark from 'mark.js';

//Firestore
const Highlights = firestore.collection('Highlights');
const Annotations = firestore.collection('Annotations');

export default class FindHighlights extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetchHighlights();
  }

  render() {
    return <div />;
  }
}


const hlArr = [];
const fetchHighlights = () => {
  let encodedDocUrl = urlEncode(document.location.href);
  console.log('encoded URL:', encodedDocUrl);
  Highlights.where('submitUrl', '==', encodedDocUrl)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(highlight => {
        hlArr.push(highlight.data());
      });
      return 'next';
    })
    .then(() => {
      console.log('highlight arr: ', hlArr);
      hlArr.map(hl => {
        console.log('in hl map', hl.domPath, hl.newString);
        const markInstance = new Mark(hl.domPath);
        markInstance.mark(hl.newString, {
          acrossElements: true,
          separateWordSearch: false,
          className: 'chromelights-highlights'
        });
      });
    })
    .catch(error => console.log('error: ', error));
};
