import React, { Component } from 'react';
import QuestionIcon from 'svg-react-loader?name=QuestionIcon!~/chrome/src/icons/question-circle.svg';
import AnnotationIcon from 'svg-react-loader?name=AnnotationIcon!~/chrome/src/icons/exclamation-circle.svg';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTruncated: true
    };

    this.switchTruncate = this.switchTruncate.bind(this);
    this.truncateContent = this.truncateContent.bind(this);
  }

  switchTruncate() {
    this.setState({ isTruncated: !this.state.isTruncated });
  }

  truncateContent(content) {
    return content.slice(0, 80) + '...';
  }

  render() {
    const { user, date, title, content } = this.props;
    const type = 'question'; //hard coded for testing
    return (
      <div id="entry">
        {type === 'question' ? <QuestionIcon /> : <AnnotationIcon />}
        <h3>{title}</h3>
        <small>
          {user}, {date}
        </small>
        <p onClick={this.switchTruncate}>
          {this.state.isTruncated ? this.truncateContent(content) : content}
        </p>
      </div>
    );
  }
}
