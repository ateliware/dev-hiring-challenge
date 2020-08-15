module.exports = (sequelize, DataTypes) => {
    const Php = sequelize.define("Php",{
        url: DataTypes.STRING,
        stars: DataTypes.INTEGER,
        owner: DataTypes.STRING,
        repo: DataTypes.STRING
    });

    return Php;
}