import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const Reroute = ({match, history}) => {
  const team = match.params.teamName;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'LOAD_CHANNEL',
      operation: 'READ',
      data: { team },
      navigation: (teams) => `/${team}/${teams[0].shortid}`,
      history
    })
  }, [])
  return (
    <div>...Loading</div>
  )
}

export default withRouter(Reroute)

Reroute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

