const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const submissions = sequelize.define(
    'submissions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

grade: {
        type: DataTypes.DECIMAL,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  submissions.associate = (db) => {

    db.submissions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.submissions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return submissions;
};

