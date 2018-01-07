module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Recruit', {
        id: {
            field: 'id_',
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title : {
            field : 'title_',
            type : DataTypes.STRING(64),
            allowNull: false
        },
        positionRequirement : {
            field : 'position_requirement_',
            type : DataTypes.TEXT,
            allowNull: false
        },
        responsibility : {
            field : 'responsibility_',
            type : DataTypes.TEXT,
            allowNull: false
        },
        createUser : {
            field : 'create_user_',
            type : DataTypes.INTEGER(11),
            allowNull: false
        },
        createTime : {
            field : 'create_time_',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'tb_recruit',
        timestamps: false
    })
}