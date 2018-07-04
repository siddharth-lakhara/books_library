const Joi = require('joi');
const models = require('../../models');

const toggleProperty = bookId => models.likes
  .findOne({ where: { books_id: bookId } })
  .then((searchResults) => {
    const objToUpdate = {};
    objToUpdate.likes = searchResults.likes === 1 ? 0 : 1;
    return models.likes.update(
      objToUpdate,
      { where: { books_id: bookId } },
    );
  });

module.exports = [{
  method: 'GET',
  path: '/like/{bookId}',
  config: {
    validate: {
      params: {
        bookId: Joi.number().min(1).required().error(new Error('provide book id')),
      },
    },
  },
  handler: (req, reply) => {
    toggleProperty(req.params.bookId).then(() => {
      reply().code(200);
    });
  },
}];


// The following piece of code is desgined for like/dislike feature of multiuser app

// const incrementCounter = (property, bookId) => models.likes
//   .findOne({ where: { books_id: bookId } })
//   .then((searchResults) => {
//     const objToUpdate = {};
//     objToUpdate[property] = searchResults[property] + 1;
//     return models.likes.update(
//       objToUpdate,
//       { where: { books_id: bookId } },
//     );
//   });

// module.exports = [{
//   method: 'GET',
//   path: '/like/{bookId}',
//   handler: (req, reply) => {
//     incrementCounter('likes', req.params.bookId).then(() => {
//       reply().code(200);
//     });
//   },
// }, {
//   method: 'GET',
//   path: '/dislike/{bookId}',
//   handler: (req, reply) => {
//     incrementCounter('dislike', req.params.bookId).then(() => {
//       reply().code(200);
//     });
//   },
// },
// ];
