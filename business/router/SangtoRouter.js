
const logger = require('../../components/logger');

module.exports = {
    prefix: '/sangto',
    routes: Object.assign({
        'GET/index': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                logger.info('----123----')
                await ctx.render('index', {
                    title: 'Bootstrap学习',
                });
            }
        },
        'GET/news': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                logger.info('----123----')
                await ctx.render('news', {
                    title: 'Bootstrap学习',
                });
            }
        }
    })
}