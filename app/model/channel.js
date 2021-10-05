module.exports = function (sequelize, DataTypes) {
    return sequelize.define('channel', {
        channelId: {
            field: 'channel_id',
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        buyerId: {
            field: 'buyer_id',
            type: DataTypes.BIGINT,
            allowNull: false
        },
        sellerId: {
            field: 'seller_id',
            type: DataTypes.BIGINT,
            allowNull: false
        },
        nftId: {
            field: 'nft_id',
            type: DataTypes.BIGINT,
            allowNull: false
        },
        createdAt: {
            field: 'created_dt',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_dt',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'channel',
        schema: 'chat_schema'
    });
};
