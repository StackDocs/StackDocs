import React, { Component } from 'react';
export default class extends Component{
    constructor(props){
        super(props)
        
    }
    render(){
        const {downVote, upVote, comments} = this.props;
        return (
            <div id='comments'>
                <p> + {upVote} - {downVote} Comments {comments.length}</p>
            </div>
        )
    }
}
