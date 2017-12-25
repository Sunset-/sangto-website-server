
module.exports = {
    host : 'localhost',
    port : '3306',
    username : 'root',
    password : 'root',
    database : 'sangto',
    dialect : 'mysql',
    pool : {
        min : 1,
        max : 20,
        idle : 10000
    }
}