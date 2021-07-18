export default async (Sequelize, sequelize) => {
    return await sequelize.define('files', {
        photo_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        type: {
            type: Sequelize.DataTypes.ENUM,
            values: ["png","jpg","jpeg","zip","rar","pdf"],
            allowNull: false
        }
    })
}