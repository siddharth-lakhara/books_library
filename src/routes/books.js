const rp = require('request-promise');
const models = require('../../models');

const fetchBooksData = () => new Promise((resolve) => {
  let jsonString = '';
  let jsonObject = {};
  rp();
  https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (response) => {
    response.setEncoding('utf8');
    response.on('data', (data) => {
      jsonString += data;
    });
    response.on('end', () => {
      jsonObject = JSON.parse(jsonString);
      // console.log(jsonObject);
      resolve(jsonObject);
    });
  });
});

module.exports = [{
  method: 'GET',
  path: '/books',
  handler: (_, reply) => {
    const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
    // models.JSON
    return booksHandler(url)
      .then((result) => {
        reply({
          data: result,
          statusCode: 200,
        });
      });
  },
}];
