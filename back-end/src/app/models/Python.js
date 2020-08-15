module.exports = (sequelize, DataTypes) => {
    const Python = sequelize.define("Python",{
        url: DataTypes.STRING,
        stars: DataTypes.INTEGER,
        owner: DataTypes.STRING,
        repo: DataTypes.STRING
    });

    return Python;
}