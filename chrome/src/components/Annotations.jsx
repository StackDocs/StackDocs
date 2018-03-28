import React, { Component } from 'react';

export default class Annotations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTruncated: true
    };

    this.toggleTruncate = this.toggleTruncate.bind(this);
    this.truncateContent = this.truncateContent.bind(this);
  }

  toggleTruncate(e) {
    // console.log(e);
    e.preventDefault();
    // console.log('toggked');
    this.setState({
      isTruncated: !this.state.isTruncated
    });
  }

  truncateContent(content) {
    if (content.length > 80) {
      return content.slice(0, 80) + '...';
    } else {
        return content;
    }
  }

  render() {
    // console.log('STATE.ISTRUNCATED in render', this.state.isTruncated);
    // console.log('CONTENT in render', this.props.content);
    const content = this.props.content;
    const { user, date } = this.props;
    return (
      <div id="chromelight-entry">
        <small>
          {user}, {date}
        </small>
        <p onClick={e => this.toggleTruncate(e)}>
          {this.state.isTruncated ? this.truncateContent(content) : content}
        </p>
      </div>
    );
  }
}
