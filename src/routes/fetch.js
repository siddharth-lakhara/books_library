const models = require('../../models');

module.exports = [{
  method: 'GET',
  path: '/fetch',
  handler: (_, reply) => {
    models.books.findAll().then((searchResults) => {
      const retObject = searchResults.map(elem => ({
        bookId: elem.books_id,
        author: elem.author,
        rating: elem.rating,
        name: elem.name,
      }));
      reply(retObject);
    });
  },
}];
