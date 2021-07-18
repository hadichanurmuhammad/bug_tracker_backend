export default async (Sequelize, sequelize) => {
    return await sequelize.define('attempts', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        code: {
            type: Sequelize.DataTypes.STRING(6),
            allowNull: false
        },
        attempts: {
            type: Sequelize.DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0
        },
        isExpired: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}