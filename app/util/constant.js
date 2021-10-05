'use strict';
let constants = {
    EMPTY: '',
    POSTGRES_HOST: this.EMPTY,
    POSTGRES_PORT: this.EMPTY,
    POSTGRES_DB_NAME: this.EMPTY,
    POSTGRES_USER_NAME: this.EMPTY,
    POSTGRES_PASSWORD: this.EMPTY,
    POSTGRE_SQL: 'postgresql',
    TARGET_SERVER: 'targetServerType=primary',
    POSTGRES_DB_URL: this.EMPTY,

    STATUS_CODE: {
        SUCCESS: 200,
        NOT_FOUND: 404,
        DB_ORM_ERROR: 500
    },
};
module.exports = constants;