'use strict';
module.exports = (sequelize, DataTypes) => {
  var books = sequelize.define('books', {
    books_id: DataTypes.INTEGER,
    author: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    name: DataTypes.STRING
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};