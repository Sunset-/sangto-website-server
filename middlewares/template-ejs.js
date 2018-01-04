const path = require('path');
const views = require('koa-views');
const logger = require('../components/logger');

// var ejs = require('ejs');
// ejs.filters.dateformat = function(obj, format) {
//     if (format == undefined) {
//         format = 'YYYY-MM-DD HH:mm:ss';
//     }
//     var ret = moment(obj).format(format);
//     return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
// };  

module.exports = app => {
    app.use(views(path.join(__dirname, '../view'), {
        extension: 'ejs'
    }))
};