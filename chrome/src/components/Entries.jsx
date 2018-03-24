import React, { Component } from 'react';
export default class extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { user, date, content } = this.props;
        return (
            <div id='annotaion'>
              <small>{user}, {date}</small>
              <p>{content}</p>
            </div>
        )
    }
}
