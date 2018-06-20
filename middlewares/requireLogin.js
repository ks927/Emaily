module.exports = (req, res, next) => {
  // check if user is logged in
  if(!req.user) {
    // if not logged in, immediately return with error
    return res.status(401).send({ error: 'You must log in!' });
  }
  // otherwise, move onto the next handler
  next();
};