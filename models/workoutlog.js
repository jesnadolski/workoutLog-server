module.exports = (sequelize, DataTypes) => {
    const Workoutlog = sequelize.define('workoutlog', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Workoutlog;
}
