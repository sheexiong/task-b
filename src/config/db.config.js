module.exports = {
    local: {
        HOST: 'localhost',
        USER: 'postgres',
        PASSWORD: '1234',
        DB: 'taskb',
        DIALECT: 'postgres',
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    online: {
        HOST: 'task-b-cs3219.carbc1lvkrhw.ap-southeast-1.rds.amazonaws.com',
        USER: 'postgres',
        PASSWORD: '12345678',
        DB: 'taskb',
        DIALECT: 'postgres',
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
