module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Certificate', {
        id: {
            field: 'id_',
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type : {
            field: 'type_',
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        title : {
            field : 'title_',
            type : DataTypes.STRING(64),
            allowNull: false
        },
        cover : {
            field : 'cover_',
            type : DataTypes.STRING(64),
            allowNull: true
        },
        digest : {
            field : 'digest_',
            type : DataTypes.STRING(256),
            allowNull: true
        },
        createTime : {
            field : 'create_time_',
            type: DataTypes.DATE,
            allowNull: false
        },
        status : {
            field : 'status_',
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        orderField : {
            field : 'order_field_',
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'tb_certificate',
        timestamps: false
    })
}