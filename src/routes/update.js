const rp = require('request-promise');
const models = require('../../models');

const getBooksData = booksUrl => rp(booksUrl).then(data => JSON.parse(data).books);

const getBookRatings = (ratingsUrl, books) => {
  const promiseArray = books.map(bookElem => rp(ratingsUrl + bookElem.id));
  return Promise.all(promiseArray)
    .then(ratingsObject => ratingsObject.map((rating, index) => ({
      author: books[index].Author,
      books_id: books[index].id,
      name: books[index].Name,
      rating: JSON.parse(rating).rating,
    })));
};

const insertInDB = objectToInsert => models.books.destroy({ where: {} })
  .then(() => models.books.bulkCreate(objectToInsert));

const initializeLikes = books => models.likes.destroy({ where: {} })
  .then(() => {
    const objectToInsert = books.map(bookElem => ({
      books_id: bookElem.id,
      likes: 0,
      dislike: 0,
    }));
    return models.likes.bulkCreate(objectToInsert);
  });

module.exports = [{
  method: 'GET',
  path: '/update',
  handler: (_, reply) => {
    const booksUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
    const ratingsUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';
    getBooksData(booksUrl).then((books) => {
      initializeLikes(books);
      getBookRatings(ratingsUrl, books).then((objectToInsert) => {
        insertInDB(objectToInsert).then(() => {
          reply('Done').code(200);
        });
      });
    });
  },
}];
