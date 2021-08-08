export default async (Sequelize, sequelize) => {
    return await sequelize.define('projects', {
        project_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        projectLink: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}