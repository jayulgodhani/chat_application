'use strict';
const express = require('express');
const router = express.Router();
const { createChannelService, getUserListService, addMessageService, loadPreviousChatService } = require('../service/chatService');

router.post('/createChannel', async (req, res) => {
    const output = await createChannelService(req.body);
    return res.status(output.statusCode).json(output.statusMessage);
});

router.post('/getUserList', async (req, res) => {
    const output = await getUserListService(req.body);
    return res.status(output.statusCode).json(output.statusMessage);
});

router.post('/addMessage', async (req, res) => {
    const output = await addMessageService(req.body);
    return res.status(output.statusCode).json(output.statusMessage);
});

router.post('/loadPreviousChat', async (req, res) => {
    const output = await loadPreviousChatService(req.body);
    return res.status(output.statusCode).json(output.statusMessage);
});

module.exports = router;