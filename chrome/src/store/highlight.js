/**
 * ACTION TYPES
 */
const CREATE_HIGHLIGHT = 'CREATE_HIGHLIGHT'


/**
 * INITIAL STATE
 */
const initialState = {
  highlight: {},
}

/**
 * ACTION CREATORS
 */
export const createHighlight = highlight => ({type: CREATE_HIGHLIGHT, highlight});

/**
 * REDUCER
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_HIGHLIGHT:
    return action.highlight

    // case ADD_TICKETS:
    // return Object.assign({}, state, {tickets: action.tickets})
    default:
    return state
  }
}

/**
 * THUNK CREATORS
 */
// export const fetchCart = (userId) =>
//   dispatch =>{
//     userId ?
//       axios.get(`/api/orders/cart/${userId}`)
//        .then(res => res.data)
//        .then(order => {
//           if(order.id || order.tickets){
//             const orderId = order.id
//             const tickets = order.tickets
//             dispatch(initCart({orderId, tickets}))
//           }
//         })
//         .catch(err => console.log(err))
//       : axios.get(`/api/session`)
//         .then(res => res.data)
//         .then(cart => dispatch(initCart(cart)))
//         .catch(err => console.log(err))
//   }