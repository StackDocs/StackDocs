//This function finds the path to the highlighted node (bottom-up)
import unique from 'unique-selector';

export const createHighlightedObj = () => {
  const newString = window.getSelection().toString();
  const currentNode = newString.length ?
    window.getSelection().anchorNode.parentElement : null;

  const domPath = currentNode ? unique(currentNode) : null;

  const selObj  = {
    newString,
    domPath
  };

  return selObj;
};


// const url = document.location.href;

export const urlEncode = url => {
  let newUrl = url.split('');
  for (let i = 0; i < url.length; i++){
    if (url.slice(i, i + 8) === 'https://'){
      newUrl.splice(i, 8);
    } else if (url.slice(i, i + 7) === 'http://'){
      newUrl.splice(i, 7);
    }
  }
  return newUrl.join('');
};
