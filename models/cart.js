module.exports = function(sequelize, DataTypes) {
    var cart = sequelize.define("cart", {
      
      })
    
    //   cart.sync();
    
      cart.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        cart.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
        cart.belongsToMany(models.item, {
            through: "cartItems"
        })
      };

    return cart;
  }