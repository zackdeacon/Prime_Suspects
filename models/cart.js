module.exports = function(sequelize, DataTypes) {
    var cart = sequelize.define("cart", {
      
      })
    
      cart.associate = function(models) {

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