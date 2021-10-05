module.exports = function (sequelize, DataTypes) {
    return sequelize.define('message', {
        messageId: {
            field: 'message_id',
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        channelId: {
            field: 'channel_id',
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'channel',
                key: 'channel_id'
            }
        },
        senderId: {
            field: 'sender_id',
            type: DataTypes.BIGINT,
            allowNull: false
        },
        message: {
            field: 'message',
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'created_dt',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'message',
        schema: 'chat_schema',
        timestamps: false
    });
};
