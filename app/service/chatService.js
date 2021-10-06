const constant = require('../util/constant');
const { validateCreateChannelDao, createChannelDao, getUserListDao,
    addMessageDao, loadChannelDataDao, loadMessageDataDao, } = require('../dao/chatDao');

const createChannelService = async (data) => {
    let validate = await validateCreateChannelDao(data);
    if (validate && validate.errorCode) {
        return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': validate }
    }
    if (validate) {
        return { 'statusCode': constant.STATUS_CODE.SUCCESS, 'statusMessage': validate };
    } else {
        let date = new Date();
        data.createdAt = date;
        data.updatedAt = date;
        let response = await createChannelDao(data);
        if (response && response.errorCode) {
            return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': response }
        }
        return { 'statusCode': constant.STATUS_CODE.SUCCESS, 'statusMessage': response };
    }
}

const getUserListService = async (data) => {
    const userId = data.userId;
    let userList = await getUserListDao(data);
    if (userList && userList.errorCode) {
        return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': userList }
    }
    if (userList) {
        let connectedUser = [];
        for (let user of userList) {
            if (user.buyerId == userId) {
                connectedUser.push(user.sellerId);
            }
            if (user.sellerId == userId) {
                connectedUser.push(user.buyerId);
            }
        }
        return { 'statusCode': constant.STATUS_CODE.NOT_FOUND, 'statusMessage': connectedUser };
    }
    return { 'statusCode': constant.STATUS_CODE.NOT_FOUND, 'statusMessage': userList };
}

const addMessageService = async (data) => {
    data.createdAt = new Date();
    let response = await addMessageDao(data);
    if (response && response.errorCode) {
        return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': response }
    }
    return { 'statusCode': constant.STATUS_CODE.NOT_FOUND, 'statusMessage': response };
}

const loadPreviousChatService = async (data) => {
    let channel = await loadChannelDataDao(data);
    if (channel && channel.errorCode) {
        return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': channel }
    }

    if (channel) {
        let message = await loadMessageDataDao(data);
        if (message && message.errorCode) {
            return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': message }
        }
        if (message && message.length > 0) {
            return await generatePreviousMessageJson(channel, message);
        } else {
            return { 'statusCode': constant.STATUS_CODE.NOT_FOUND, 'statusMessage': 'message not found' };
        }

    } else {
        let response = await createChannelDao(data);
        if (response && response.errorCode) {
            return { 'statusCode': constant.STATUS_CODE.DB_ORM_ERROR, 'statusMessage': response }
        }
        return { 'statusCode': constant.STATUS_CODE.SUCCESS, 'statusMessage': {} };
    }
}

const generatePreviousMessageJson = async (channel, message) => {
    let buyerId = channel.buyerId;
    let sellerId = channel.sellerId;
    let nftId = channel.nftId;
    let messageArray = [];

    for (let msg of message) {
        let messageObject = {
            sender_id: msg.senderId,
            message: msg.message,
            time: msg.createdAt
        };
        messageArray.push(messageObject);
    }

    let response = {
        buyer_id: buyerId,
        seller_id: sellerId,
        nft_id: nftId,
        message: messageArray
    }
    return { "statusCode": constant.STATUS_CODE.SUCCESS, "statusMessage": response }
}

module.exports = { createChannelService, getUserListService, addMessageService, loadPreviousChatService }