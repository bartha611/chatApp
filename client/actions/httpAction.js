const httpAction = action => {
  const template = {
    url: 'http://localhost:3000',
    endpoint: null,
    verb: 'GET',
    type: '',
    payload: null,
    operation: null
  }
  return Object.assign({}, template, action);
}

export default httpAction;