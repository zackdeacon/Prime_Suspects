module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define("item", {
      sku: DataTypes.STRING,
      prices_amountMax: DataTypes.DECIMAL,
      prices_amountMin: DataTypes.DECIMAL,
      prices_availability: DataTypes.TEXT,
      prices_condition: DataTypes.TEXT,
      prices_currency: DataTypes.TEXT,
      prices_dateSeen: DataTypes.TEXT,
      prices_isSale: DataTypes.TEXT,
      prices_merchant: DataTypes.TEXT,
      prices_shipping: DataTypes.TEXT,
      prices_sourceURLs: DataTypes.TEXT,
      asins: DataTypes.TEXT,
      brand: DataTypes.TEXT,
      categories: DataTypes.TEXT,
      dateAdded: DataTypes.DATE,
      dateUpdated: DataTypes.DATE,
      ean: DataTypes.TEXT,
      imageURLs: DataTypes.TEXT,
      keys: DataTypes.TEXT,
      manufacturer: DataTypes.TEXT,
      manufacturerNumber: DataTypes.TEXT,
      name: DataTypes.TEXT,
      primaryCategories: DataTypes.TEXT,
      sourceURLS: DataTypes.TEXT,
      upc: DataTypes.TEXT,
      weight: DataTypes.TEXT
    },{
        tableName: "items"
    })
  
    // item.sync();

    item.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
          item.belongsToMany(models.cart, {
          through: "cartItems"
      })
    };
  
  return item;
}

