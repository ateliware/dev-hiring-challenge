module.exports = (sequelize, DataTypes) => {
    const Ruby = sequelize.define("Ruby",{
        url: DataTypes.STRING,
        stars: DataTypes.INTEGER,
        owner: DataTypes.STRING,
        repo: DataTypes.STRING
    });

    return Ruby;
}