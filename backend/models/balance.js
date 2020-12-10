module.exports = (sequelize, DataTypes) => {

    const balance = sequelize.define("balance", {
        credits: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },  {
        sequelize,
        modelName: "balance",
        timestamps: false,
    })
  
    balance.associate = models => {
        balance.belongsTo(models.user, {
            as: "user",
        })
    }
  
    return balance
  
  }