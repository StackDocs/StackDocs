import React, {Component } from 'react'
import { Map } from 'fireview';
import { firestore as fs } from '~/fire'
import HighlightedText from '../components/HighlightedText'
import Annotations from '../components/Annotations'
import Interactive from '../components/Interactive'

export default class extends Component{
    constructor(props){
        super(props),
        this.state = {
            selectedHighlight: this.props.highlight || 'beforeDestroy Hooks'
        }
    }

    render(){
        return (
          <div id='highlight-annotation'>
            <h1 className='highlight-title'>{this.state.selectedHighlight}</h1>
            <Map each from={fs.collection('Annotations').where('highlight', '==', this.state.selectedHighlight)}
                    Loading={<h3>Loading...</h3>}
                    Empty={<h3>No Annotations</h3>}
                    Render={({upVote, downVote, content, comments, user, date, title}) => 
                      <div>
                        <h3>{title}</h3>
                        {console.log(typeof date)}
                        <Annotations content={content} user={user} date="March 20, 2018" />
                        <Interactive downVote={downVote} upVote={upVote} comments={comments} />
                      </div>
                    }
                    />
          </div>
        )
    }
}
