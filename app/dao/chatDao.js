'use strict';
const { Op, dbInstance, channel, message } = require('../util/dbInstance');

const createChannelDao = async (channelObject) => {
    return channel.build(channelObject).save().then(data => {
        return data;
    }).catch(async (error) => {
        console.log(error);
        const response = { errorCode: 'Error: while creating channel' }
        return response;
    });
}

const getUserListDao = async (data) => {
    return channel.findAll({
        raw: true,
        where: { [Op.or]: [{ buyerId: data.userId }, { sellerId: data.userId }] },
        order: [['updatedAt', 'DESC']]
    }).then(data => {
        return data;
    }).catch(async (error) => {
        const response = { errorCode: 'Error: while fetching data from database' }
        return response;
    });
}

const addMessageDao = async (messageObject) => {
    return message.build(messageObject).save().then(data => {
        return data;
    }).catch(async (error) => {
        const response = { errorCode: 'Error: while creating channel' }
        return response;
    });
}

const loadChannelDataDao = async (data) => {
    return channel.findOne({
        raw: true,
        where: { channelId: data.channelId },
    }).then(data => {
        return data;
    }).catch(async (error) => {
        const response = { errorCode: 'Error: while fetching data from database' }
        return response;
    });
}

const loadMessageDataDao = async (data) => {
    return message.findAll({
        raw: true,
        where: { channelId: data.channelId },
        order: [['createdAt', 'DESC']],
    }).then(data => {
        return data;
    }).catch(async (error) => {
        const response = { errorCode: 'Error: while fetching data from database' }
        return response;
    });
}

const validateCreateChannelDao = async (data) => {
    return channel.findOne({
        raw: true,
        where: {
            buyerId: data.buyerId,
            sellerId: data.sellerId,
            nftId: data.nftId,
        },
    }).then(data => {
        return data;
    }).catch(async (error) => {
        const response = { errorCode: 'Error: while fetching data from database' }
        return response;
    });
}

module.exports = {
    validateCreateChannelDao,
    createChannelDao,
    getUserListDao,
    addMessageDao,
    loadChannelDataDao,
    loadMessageDataDao
}