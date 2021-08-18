export default async (Sequelize, sequelize) => {
    return await sequelize.define('bans', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        expireDate: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        }
    })
}