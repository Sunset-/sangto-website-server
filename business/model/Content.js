module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Content', {
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
        category : {
            field: 'category_',
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        title : {
            field : 'title_',
            type : DataTypes.STRING(64),
            allowNull: false
        },
        icon : {
            field : 'icon_',
            type : DataTypes.STRING(64),
            allowNull: true
        },
        cover : {
            field : 'cover_',
            type : DataTypes.STRING(64),
            allowNull: true
        },
        keywords : {
            field : 'keywords_',
            type : DataTypes.STRING(64),
            allowNull: true
        },
        digest : {
            field : 'digest_',
            type : DataTypes.STRING(256),
            allowNull: true
        },
        content : {
            field : 'content_',
            type : DataTypes.TEXT,
            allowNull: false
        },
        createUser : {
            field : 'create_user_',
            type : DataTypes.INTEGER(11),
            allowNull: false
        },
        publishUser : {
            field : 'publish_user_',
            type : DataTypes.STRING(32),
            allowNull: false
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
        viewCount : {
            field : 'view_count_',
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'tb_content',
        timestamps: false
    })
}