const Note = require('./note.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Note, { foreignKey: 'userId' });
  Note.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = initModel;
