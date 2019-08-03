
const initialState = {
  isLoading: false,
  messages: [],
  error: null
}

const currentMessages = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_MESSAGES_BEGIN':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_MESSAGES_END':
      return {
        ...state,
        isLoading: false,
        messages: action.payload
      }
    case 'FETCH_MESSAGES_FAIL':
      return {
        ...state,
        isLoading: false,
        error: true
      }
    default:
      return state
  }
}