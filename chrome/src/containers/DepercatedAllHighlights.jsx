// import React, { Component } from 'react'
// import { Map } from 'fireview'
// import { firestore as fs } from '~/fire'
// // import HighlightedText from '../components/HighlightedText'
// import Entries from '../components/Entries'
// import Interactive from '../components/Interactive'

// export default class extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             selectedHighlight: this.props.highlight || 'beforeDestroy Hooks',
//         }
//     }

//     render() {
//         const urlReadOnly = document.location.href;
//         const url = urlEncode(urlReadOnly);
//         return (
//             <div id="highlight-annotation">
//                 <h1 className="highlight-title">
//                     {this.state.selectedHighlight}
//                 </h1>
//                 <Map
//                     each
//                     from={fs
//                         .collection('UrlPages')
//                         .doc(url)
//                         .collection('highlights')}
//                     Loading={<h3>Loading...</h3>}
//                     Empty={<h3>No Annotations</h3>}
//                     Render={({ id }) => {
//                         <div>
//                         <Map each from={fs.collection('UrlPages')
//                             .doc(url)
//                             .collection(highlight)}
//                             Loading={<h3>Loading...</h3>}
//                             Empty={<h3>No Annotations</h3>}
//                             Render={({
//                                 upVote,
//                                 downVote,
//                                 content,
//                                 comments,
//                                 user,
//                                 date,
//                                 title,
//                             }) => (
//                                     <div>
//                                         <h3>{title}</h3>
//                                         {console.log(typeof date)}
//                                         <Entries
//                                             content={content}
//                                             user={user}
//                                             date="March 20, 2018"
//                                         />
//                                         <Interactive
//                                             downVote={downVote}
//                                             upVote={upVote}
//                                             comments={comments}
//                                         />
//                                     </div>
//                                 )}
//                         />
//                     </div>
//                     }}
//                 />
//             </div>)
//     }
// }
import React, { Component } from 'react';
import { Map } from 'fireview';
import { firestore as fs } from '~/fire';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';
import CreateHighlightButton from '../components/CreateHighlightButton';
import { urlEncode } from '../highlighting';
export default class AllHighlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHighlight: this.props.activeId || 'Select Some Text'
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.activeId) {
      this.setState({ selectedHighlight: newProps.activeId });
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
              {`...${this.state.selectedHighlight}...`}
            </h3>
          </div>
          <CreateHighlightButton setView={setView} />
        </div>
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
            title
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
    );
  }
}
