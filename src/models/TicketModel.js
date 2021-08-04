export default async (Sequelize, sequelize) => {
    return await sequelize.define('tickets', {
        ticket_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        problem_content: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: Sequelize.DataTypes.ENUM,
            values: ["low", "normal", "high"],
            allowNull: false
        },
        completed: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        archived: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: Sequelize.DataTypes.ENUM,
            values: ["frontend", "backend"],
            allowNull: false
        }
    })
}