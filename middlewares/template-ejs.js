const path = require('path');
const views = require('koa-views');
const logger = require('../components/logger');

module.exports = app => {
    app.use(views(path.join(__dirname, '../view'), {
        extension: 'ejs'
    }))
};