const models = require('../../models');

module.exports = [{
  method: 'GET',
  path: '/fetch',
  handler: (_, reply) => {
    models.books.findAll().then((searchResults) => {
      const promiseArray = [];
      const retObject = searchResults.map((elem) => {
        promiseArray.push(models.likes.findOne({ where: { books_id: elem.books_id } }));
        return ({
          bookId: elem.books_id,
          author: elem.author,
          rating: elem.rating,
          name: elem.name,
        });
      });
      Promise.all(promiseArray).then((likeStatus) => {
        likeStatus.reduce((__, curr, index) => {
          retObject[index].like = curr.likes;
          return 0;
        }, 0);
        reply(retObject);
      });
    });
  },
}];
