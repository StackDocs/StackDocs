//This function finds the path to the highlighted node (bottom-up)
import unique from 'unique-selector';

export const createHighlightedObj = () => {
  const string = window.getSelection().toString();
  const currentNode = window.getSelection().anchorNode ?
    window.getSelection().anchorNode.parentElement : null;

  const wholeDoc = document.documentElement.innerHTML;
  const domPath = currentNode ? unique(currentNode) : null;

  const selObj  = {
    string,
    wholeDoc,
    domPath,
  };

  console.log({selObj});

  return selObj;
};
