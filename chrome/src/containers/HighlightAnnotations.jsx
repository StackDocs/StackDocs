import React, { Component } from 'react'
import { Map } from 'fireview'
import { firestore as fs } from '~/fire'
import Annotations from '../components/Annotations'
import Interactive from '../components/Interactive'
import { urlEncode } from "../highlighting";

export default class HighlightAnnotations extends Component {
    constructor(props) {
        super(props);

        //get the active highlight (most recently clicked)
        // const selected = document.getElementsByClassName('activeHighlight')[0];
        // get an array of classes on it
        // const selectedClasses = selected.className.split(' ');
        // const selectedId = selectedClasses.filter(el => {
        //   return el !== 'activeHighlight' && el !== 'chromelights-highlights';
        // });

        /* the selectedId should be used to find and render all of the
         annotations associated with the selected highlight */

        // console.log('classes', selectedId);

        this.state = {
          selectedHighlight: this.props.activeId || 'beforeDestroy Hooks',
        };
    }

    componentWillReceiveProps(newProps){
        if(newProps.activeId){
            this.setState({selectedHighlight: newProps.activeId,})
        }
    }

    
    
    render() {
        const urlReadOnly = document.location.href;
        const url = urlEncode(urlReadOnly);
        return (
            <div id="highlight-annotation">
                <h1 className="highlight-title">
                    {this.state.selectedHighlight}
                </h1>
                <Map
                    each
                    from={fs
                        .collection('UrlPages')
                        .doc(url)
                        .collection('highlights')
                        .doc(this.state.selectedHighlight)
                        .collection('entries')}
                    Loading={<h3>Loading...</h3>}
                    Empty={<h3 color="red">No Annotations</h3>}
                    Render={({
                        upVote,
                        downVote,
                        content,
                        comments,
                        user,
                        date,
                        title,
                    }) => (
                        <div>
                            <h3>{title}</h3>
                            {console.log(typeof date)}
                            <Annotations
                                content={content}
                                user={user}
                                date="March 20, 2018"
                            />
                            <Interactive
                                downVote={downVote}
                                upVote={upVote}
                                comments={comments}
                            />
                        </div>
                    )}
                />
            </div>
        )
    }
}
