const fetch = require('./fetch');
const update = require('./update');
const like = require('./like');
// const dislike = require('./dislike');

module.exports = [].concat(fetch, update, like);
