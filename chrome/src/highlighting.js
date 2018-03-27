//This function finds the path to the highlighted node (bottom-up)
import unique from 'unique-selector';

export const createHighlightedObj = () => {
  const selection = window.getSelection().toString();
  const clicked = document.getElementsByClassName('activeHighlight');
  const url = document.location.href;

  let newString, currentNode, domPath, activeId;
  let isAddingEntry = false;

  if (selection.length) {
    newString = window.getSelection().toString();
    currentNode = newString.length
      ? window.getSelection().anchorNode.parentElement
      : null;
    activeId = '';
    domPath = currentNode ? unique(currentNode) : '';
  } else if (clicked.length) {
    newString = clicked[0].innerText;
    currentNode = clicked[0];
    activeId = clicked[0].classList[1];
    domPath = '';
    isAddingEntry = true;
  }

  const selObj = {
      newString,
      domPath,
      url,
      activeId,
      isAddingEntry
    };

  return selObj;
};


export const urlEncode = url => {
  let newUrl = url.split('');
  for (let i = 0; i < 9; i++) {
    if (url.slice(i, i + 8) === 'https://') {
      newUrl.splice(i, 8);
    } else if (url.slice(i, i + 7) === 'http://') {
      newUrl.splice(i, 7);
    }
  }
  const urlUpdate = newUrl.join('');
  return urlUpdate.split('/').join('%%%');
};
