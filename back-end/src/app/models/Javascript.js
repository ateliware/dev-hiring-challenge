module.exports = (sequelize, DataTypes) => {
    const Javascript = sequelize.define("Javascript",{
        url: DataTypes.STRING,
        stars: DataTypes.INTEGER,
        owner: DataTypes.STRING,
        repo: DataTypes.STRING
    });

    return Javascript;
}