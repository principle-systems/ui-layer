export default function(sequelize, DataTypes) {
  const Stock = sequelize.define('Stock', {
    item : {
      type      : DataTypes.STRING,
      allowNull : false,
      unique    : true
    },
    available : {
      type      : DataTypes.INTEGER,
      allowNull : false
    },
    actual : {
      type      : DataTypes.INTEGER,
      allowNull : false
    },
    resource_id : {
      type      : DataTypes.STRING,
      allowNull : false,
      unique    : true
    }
  }, { 
    timestamps  : false,
    tableName   : 'stock'
  })
  return Stock
}
