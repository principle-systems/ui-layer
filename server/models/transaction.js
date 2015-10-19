export default function(sequelize, DataTypes) {
  const Transaction = sequelize.define('Transaction', {
    action : {
      type      : DataTypes.TEXT,
      allowNull : false,
    },
    payload : {
      type      : DataTypes.TEXT,
      allowNull : false,
    },
    timestamp : {
      type      : DataTypes.DATE,
      allowNull : false,
    }
  }, { 
    timestamps : false,
    tableName  : 'transactions'
  })
  return Transaction
}
