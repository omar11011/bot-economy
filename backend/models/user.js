module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define("user", {
      user: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  },  {
      sequelize,
      modelName: "user",
      timestamps: false,
      indexes: [
          {
              unique: true,
              fields: ['user']
          }
      ]
  })

  user.associate = models => {
      user.hasMany(models.balance, {
        as: "balance",
        foreignKey: "userId",
      })
  }

  return user

}