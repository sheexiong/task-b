module.exports = (sequelize, DataTypes) => {
    const Quote = sequelize.define('quote', {
        content: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
    });
    return Quote;
};
