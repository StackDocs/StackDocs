import React from 'react';
import Header from './src/components/Header';
import HighlightAnnotations from './src/containers/HighlightAnnotations';
import FindHighlights from './src/components/FindHighlights';
import CreateHighlights from './src/components/CreateHighlights';

const App = () => {
  return (
  <div>
    <Header />
    <CreateHighlights />
    <HighlightAnnotations />
    </div>
  )
}

export default App

// <FindHighlights />
