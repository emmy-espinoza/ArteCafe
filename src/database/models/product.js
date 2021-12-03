module.exports = function(sequelize, dataTypes){

    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }, 
        description: {
            type: dataTypes.STRING(500),
        },
        price:{
            type: dataTypes.DECIMAL(8,2),
            allowNull: false
        },
        discount: {
            type: dataTypes.DECIMAL(8,2),
        },
        categories_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    };

    let config = {
        tableName: "products", 
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categories_id"
        })
        Product.hasMany(models.Image, {
            as: "images",
            foreignKey: "Products_id"
        })
    }

    return Product;
    
}