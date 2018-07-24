module.exports = (req, res, next) => {
    // if user has less than 1 credit
    if(req.user.credits < 1) {
      // if not enough credits, immediately return with error
      return res.status(403).send({ error: 'Not enough credits!' });
    }
    // otherwise, move onto the next handler
    next();
  };