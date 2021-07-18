export default async (Sequelize, sequelize) => {
    return await sequelize.define('users', {
        user_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        fullName: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false
        },
        phone: {
            type: Sequelize.DataTypes.STRING(13),
            is: /^9989[012345789][0-9]{7}$/,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.DataTypes.STRING(64),
            is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            unique: true
        },
        position: {
            type: Sequelize.DataTypes.ENUM,
            values: ['senior', 'middle', 'junior'],
            allowNull: true
        },
        role: {
            type: Sequelize.DataTypes.ENUM,
            values: ["pm", "admin", "dev", "submitter"],
            allowNull: false,
            defaultValue: "submitter"
        },
        about: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        user_attempts: {
            type: Sequelize.DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0
        }
    })
}