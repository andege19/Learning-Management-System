const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const notifications = sequelize.define(
    'notifications',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

message: {
        type: DataTypes.TEXT,

      },

read: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

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

  notifications.associate = (db) => {

    db.notifications.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.notifications.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return notifications;
};

