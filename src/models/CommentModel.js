export default async (Sequelize, sequelize) => {
    return await sequelize.define('comments', {
        comment_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        content: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    })
}