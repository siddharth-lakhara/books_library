'use strict';
module.exports = (sequelize, DataTypes) => {
  var likes = sequelize.define('likes', {
    books_id: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    dislike: DataTypes.INTEGER
  }, {});
  likes.associate = function(models) {
    // associations can be defined here
  };
  return likes;
};