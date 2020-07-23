module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
      },{
          tableName: "user"
      })
    
      user.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        user.hasOne(models.cart, {
          onDelete: "cascade"
        });
      };
    

    //   user.sync();
    
    return user;
  }
  