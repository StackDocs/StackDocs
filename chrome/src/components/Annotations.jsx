import React, { Component } from 'react';

export default class Annotations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTruncated: true
    };
  }

  toggleTruncate = (e) => {
    e.preventDefault();
    this.setState({
      isTruncated: !this.state.isTruncated
    });
  }

  truncateContent = (content) => {
    if (content.length > 140) {
      return content.slice(0, 140) + '...';
    } else {
      return content;
    }
  }

  render() {
    const { user, date, content } = this.props;
    const contentIsLong = content.length > 140;

    return (
      <div id="chromelights-entry">
        <p className="chromelights-entry-name">
          {user}, {date}
        </p>
        {
          contentIsLong && this.state.isTruncated ?
          <div>
            <p className="chromelights-entry-content" > {this.truncateContent(content)}</p>
            <p className="chromelights-read-more" onClick={this.toggleTruncate} >Read more</p>
          </div> :
            <p>{content}</p>
        }
        {
          !this.state.isTruncated &&
          <p className="chromelights-read-more" onClick={this.toggleTruncate} >Read less</p>
        }
      </div>
    );
  }
}
