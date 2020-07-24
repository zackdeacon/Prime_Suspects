const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define("user", {
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
  },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {
    tableName: "user"
  })

  user.beforeCreate(function(user){
    user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
})
user.associate = function (models) {
  user.hasOne(models.cart, {
    onDelete: "cascade"
  });
};


  return user;
}
