const CREATE_HIGHLIGHT = 'CREATE_HIGHLIGHT'

const initialState = {
  highlight: {},
}

export const createHighlight = highlight => ({type: CREATE_HIGHLIGHT, highlight});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_HIGHLIGHT:
    return action.highlight

    default:
    return state
  }
}