require('dotenv').config();
const convict = require('convict');
const config = convict({
    env: {
        format: ['prod', 'loc'],
        default: process.env.ENV_VAL,
        arg: 'NODE_ENV',
        env: 'NODE_ENV'
    },
    SERVER_PORT: {
        format: Number,
        default: 'from default',
        arg: 'SERVER_PORT',
        env: 'SERVER_PORT'
    },
    POSTGRES_HOST: {
        format: String,
        default: 'from default',
        arg: 'POSTGRES_HOST',
        env: 'POSTGRES_HOST'
    },
    POSTGRES_PORT: {
        format: Number,
        default: 'from default',
        arg: 'POSTGRES_PORT',
        env: 'POSTGRES_PORT'
    },
    POSTGRES_DB_NAME: {
        format: String,
        default: 'from default',
        arg: 'POSTGRES_DB_NAME',
        env: 'POSTGRES_DB_NAME'
    },
    POSTGRES_USER_NAME: {
        format: String,
        default: 'from default',
        arg: 'POSTGRES_USER_NAME',
        env: 'POSTGRES_USER_NAME'
    },
    POSTGRES_PASSWORD: {
        format: String,
        default: 'from default',
        arg: 'POSTGRES_PASSWORD',
        env: 'POSTGRES_PASSWORD'
    },
    API_MANAGER_URL: {
        format: Array,
        default: 'from default',
        arg: 'API_MANAGER_URL',
        env: 'API_MANAGER_URL'
    }
});
const env = config.get('env');
config.loadFile(`./app/config/${env}.json`);
config.validate({ allowed: 'strict' });
module.exports = config.getProperties();