// keys.js
if(procces.env.NODE_ENV === 'production') {
    // we are in production - return prod set of keys
    module.exports = require('./prod');

} else {
    // we are in development - return dev keys
    module.exports = require('./dev');
}
