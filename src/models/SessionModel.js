export default async (Sequelize, sequelize) => {
    return await sequelize.define('sessions', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        user_agent: {
            type: Sequelize.DataTypes.STRING(128),
            allowNull: false
        },
        ip_address: {
            type: Sequelize.DataTypes.INET,
            allowNull: false
        }
    })
}