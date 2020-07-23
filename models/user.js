module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Post", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,20]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [6,20]
      }
    });
  
    Customer.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Customer.hasOne(models.ShoppingCart, {
        onDelete: "cascade"
      });
    };
  
    return Customer;
  };
  