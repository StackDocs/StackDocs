import React from 'react';

export default function AksOrAnnotate(props) {
  const selectEntryType = props.selectEntryType;
  console.log('selectEntryType: ', selectEntryType);
  return (
    <div id="ask-or-annotate">
      <form onSubmit={selectEntryType}>
        <input type="submit" value="ask" />
        <p>or</p>
        <input type="submit" value="annotate" />
      </form>
    </div>
  );
}
