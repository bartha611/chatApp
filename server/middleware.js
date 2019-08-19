
export function isAuthenticated(req,res,next) {
  if(req.session.user) {
    return next()
  }
  return res.redirect('/')
}

export function teamAuthentication(req,res,next) {
  // Todo finish authentication for team
  console.log('hello')
  return next()
}