module.exports = function(sequelize, dataTypes){

    let alias = "Image";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        Products_id:{
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    };

    let config = {
        tableName: "images", 
        timestamps: false
    };

    const Image = sequelize.define(alias, cols, config)

    Image.associate = models => {
        Image.belongsTo(models.Product, {
            as: "product",
            foreignKey: "Products_id"
        })
    }

    return Image;
    
}