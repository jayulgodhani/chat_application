'use strict';
const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* Load Configuration File */
const config = require('./app/util/config');

/* Load Constant File along with DB Connection */
const constants = require('./app/util/constant');
constants.POSTGRES_HOST = config.POSTGRES_HOST;
constants.POSTGRES_PORT = config.POSTGRES_PORT;
constants.POSTGRES_DB_NAME = config.POSTGRES_DB_NAME;
constants.POSTGRES_USER_NAME = config.POSTGRES_USER_NAME;
constants.POSTGRES_PASSWORD = config.POSTGRES_PASSWORD;
constants.POSTGRES_DB_URL = constants.POSTGRE_SQL + '://' + constants.POSTGRES_USER_NAME + ':' + constants.POSTGRES_PASSWORD
    + '@' + constants.POSTGRES_HOST + ':' + constants.POSTGRES_PORT + '/' + constants.POSTGRES_DB_NAME + '?' + constants.TARGET_SERVER;

/* Initialize Database Connection */
const { dbInstance } = require('./app/util/dbInstance');

/* API Configuration  */
let allowedOrigins = config.API_MANAGER_URL;
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.raw({ limit: '100mb' }));
app.use(function (req, res, next) {
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
var corsOptions = {
    origin: allowedOrigins
}
app.use(cors(corsOptions));
let allowedMethods = ['GET', 'POST'];
app.use(function (req, res, next) {
    if (!allowedMethods.includes(req.method)) {
        return res.status(405).json({ 'status': 'Method Not Allowed' });
    }
    next();
});

/* Test API */
app.get('/info', function (req, res) {
    res.send({
        info: 'This API was working'
    });
});

/* Server */
let httpsocket = http.createServer(app).listen(config.SERVER_PORT, function () {
    console.log('Server Started');
});

/* Socket */
let realtime = require('./app/socket/socket');
var session = require('express-session');
/*var sessionMiddleware = session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
});*/
realtime.connect(httpsocket);

/* controller mapping */
app.use('/chat', require('./app/controller/chatController'));


/* Temp Configuration */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) =>{
    let uname = req.body.userId;
    let data = {
        user_name: uname,
        user_id: uname,
        user_full_name: uname,
        user_image: ''
    }
    res.send({status:true, data: data})
})