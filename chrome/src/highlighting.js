//This function finds the path to the highlighted node (bottom-up)
import unique from 'unique-selector';

export const createHighlightedObj = () => {
  const newString = window.getSelection().toString();
  const url = document.location.href;
  const currentNode = window.getSelection().anchorNode ?
    window.getSelection().anchorNode.parentElement : null;

  const wholeDoc = document.documentElement.innerHTML;
  const domPath = currentNode ? unique(currentNode) : null;

  const selObj  = {
    newString,
    wholeDoc,
    domPath,
    url,
  };

  console.log({selObj});

  return selObj;
};

export const urlEncode = url => {
  let newUrl = url.split('');
  for(let i = 0; i < url.length; i++){
    if(url.slice(i,i+8) === "https://"){
      newUrl.splice(i,8)
    } else if(url.slice(i,i+7) === "http://"){
      newUrl.splice(i,7)
    }
  }
  return newUrl.join("")
}
