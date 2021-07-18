export default async (Sequelize, sequelize) => {
    return await sequelize.define('settings', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false
        },
        value: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false
        }
    })
}