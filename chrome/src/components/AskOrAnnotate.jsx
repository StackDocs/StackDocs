import React from 'react';

export default function AksOrAnnotate(props) {
  const selectEntryType = props.selectEntryType;
  return (
    <div id="ask-or-annotate">
      <button onClick={selectEntryType} value="ask">Ask</button>
      <button onClick={selectEntryType} value="annotate">Annotate</button>
    </div>
  );
}
