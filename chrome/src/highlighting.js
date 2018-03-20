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
  console.log({domPath});

  return domPath;
};


export const createHighlightedObj = () => {
  const string = window.getSelection().toString();

  const wholeDoc = document.documentElement.innerHTML;
  const domPath = findDomPath();

  const selObj  = {
    string,
    wholeDoc,
    domPath,
  };

  console.log(window.getSelection());
  console.log(selObj);

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
