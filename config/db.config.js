module.exports = {
    HOST: "localhost",
    USER: "satya",
    PASSWORD: "123456",
    DB: "onlineConference",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};