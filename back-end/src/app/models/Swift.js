module.exports = (sequelize, DataTypes) => {
    const Swift = sequelize.define("Swift",{
        url: DataTypes.STRING,
        stars: DataTypes.INTEGER,
        owner: DataTypes.STRING,
        repo: DataTypes.STRING
    });

    return Swift;
}