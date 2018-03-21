//This function finds the path to the highlighted node (bottom-up)
import unique from 'unique-selector';

const findDomPath = (el) => {
  let currentNode = el || window.getSelection().anchorNode.parentElement;
  // let domPath = [];

  // while (currentNode) {
  //   domPath.unshift(currentNode.tagName);
  //   currentNode = currentNode.parentElement;
  // }

  const domPath = unique(currentNode);
  console.log('unique: ', {domPath});

  return domPath;
};


export const createHighlightedObj = () => {
  const newString = window.getSelection().toString();
  const url = document.location.href;
  const wholeDoc = document.documentElement.innerHTML;
  const domPath = findDomPath();

  const selObj  = {
    newString,
    wholeDoc,
    domPath,
    url,
  };

  // console.log(window.getSelection());
  // console.log(selObj);
  return selObj;
};

//This is the function that does the final search for the element
// And highlights it

export const findToHighlight = (path, str) => {
  //find a DOM element by text to string
  //if the DOM element's path is the same as the path you're trying to target,
  //highlight that value

  const element = document.querySelectorAll(path);

  for (var i = 0; i < element.length; i++) {
    const currentEl = element[i];
    const elPath = unique(currentEl);

    if (element[i].innerText.includes(str) && elPath === path) {
      element[i].style['background-color'] = 'yellow';
    }
  }
};

const elements = document.getElementsByTagName('strong');

for (var i = 0; i < elements.length; i++) {
  if (elements[i].innerText.includes('unshift')) {
    console.log('elements', elements[i]);
  }
}

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
