//This function finds the path to the highlighted node (bottom-up)

const findDomPath = (el) => {
  let currentNode = el || window.getSelection().anchorNode.parentElement;
  let domPath = [];

  while (currentNode) {
    domPath.unshift(currentNode.tagName);
    currentNode = currentNode.parentElement;
  }

  return domPath;
};

/*
  We might need this function if the word we are looking to highlight occurs
  more than once in the same HTML element, but the function currently doesn't work
*/


// const findOccurrenceNum = (path, str) => {
//   let occurrences = [];
//   const selector = path[path.length - 1];
//   const element = document.getElementsByTagName(selector);

//   for (var i = 0; i < element.length; i++) {
//     const elPath = findDomPath(element[i]);
//     if (elPath.join() === path.join() && element[i].innerText.includes(str)) {
//       occurrences.push(element[i].className);
//     }
//   }
//   console.log({occurrences});
//   const selectedInd = window.getSelection().baseNode;
//   console.log({selectedInd});

//   return occurrences;
// };


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

  const selector = path[path.length - 1];
  const element = document.getElementsByTagName(selector);

  for (var i = 0; i < element.length; i++) {
    const currentEl = element[i];
    const elPath = findDomPath(currentEl);

    if (element[i].innerText.includes(str) && elPath.join() === path.join()) {
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
