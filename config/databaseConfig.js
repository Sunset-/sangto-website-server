
// module.exports = {
//     host : 'localhost',
//     port : '3306',
//     username : 'root',
//     password : 'root',
//     database : 'sangto-website',
//     dialect : 'mysql',
//     timezone : '+08:00',
//     pool : {
//         min : 1,
//         max : 20,
//         idle : 10000
//     }
// }
module.exports = {
    // host : 'localhost',
    // port : '3306',
    // username : 'root',
    // password : 'root',
    storage: 'D:\\sqlite\\test\\sunset.db',
    database : 'main',
    dialect : 'sqlite',
    pool : {
        min : 1,
        max : 20,
        idle : 10000
    }
}