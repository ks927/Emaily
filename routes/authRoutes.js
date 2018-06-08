const passport = require('passport');

module.exports = (app) => {
  // 'scope' gives us permission to this user's 'profile' and 'email' info
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
};