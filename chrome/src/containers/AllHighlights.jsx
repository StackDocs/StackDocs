import React, { Component } from 'react'
import { Map } from 'fireview'
import { firestore as fs } from '~/fire'
import CreateHighlightButton from '../components/CreateHighlightButton';
import Entries from '../components/Entries'
import Interactive from '../components/Interactive'
import { urlEncode } from '../highlighting';

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedHighlight: this.props.highlight || 'beforeDestroy Hooks',
        }
    }

    render() {
        const urlReadOnly = document.location.href;
        const url = urlEncode(urlReadOnly);
        const setView = this.props.setView;
        console.log('PROPS IN HIGHLIGHTANNOTATIONS: ', this.props);
        return (
            <div id="highlight-annotation">
            <div className="chromelights-highlight-header">
              <div className="chromelights-highlight-container">
                <h3 className="chromelights-highlight-title">
                  select text to create a new highlight
                </h3>
              </div>
              <CreateHighlightButton setView={setView} />
            </div>
                <Map
                    each
                    from={fs
                        .collection('UrlPages')
                        .doc(url)
                        .collection('highlights')}
                    Loading={() => <h3>Loading...</h3>}
                    Empty={() => <h3>All Entries coming soon to a theatre near you</h3>}
                    // Render={({ highlightId }) => {highlightId ? 
                    //     <div>
                    //     <Map each from={fs.collection('UrlPages')
                    //         .doc(url)
                    //         .collection(highlightId ? highlightId : "testing123")}
                    //         Loading={() => <h3>Loading...</h3>}
                    //         Empty={() => <h3>All Entries coming soon to a theatre near you</h3>}
                    //         Render={({
                    //             upVote,
                    //             downVote,
                    //             content,
                    //             comments,
                    //             entryId,
                    //             user,
                    //             date,
                    //             title,
                    //         }) => (
                    //                 <div>
                    //                     <h3>{title}</h3>
                    //                     {console.log(typeof date)}
                    //                     <Entries
                    //                         content={content}
                    //                         user={user}
                    //                         date="March 20, 2018"
                    //                     />
                    //                     <Interactive
                    //                         entryId={entryId}
                    //                         downVote={downVote}
                    //                         upVote={upVote}
                    //                         comments={comments}
                    //                     />
                    //                 </div>
                    //             )}
                    //     />
                    // </div>
                    // : null }}
                    Render={()=>null}
                />
            </div>)
    }
}
