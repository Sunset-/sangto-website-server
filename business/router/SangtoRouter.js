
const logger = require('../../components/logger');

module.exports = {
    prefix: '/sangto',
    routes: Object.assign({
        'GET/': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                let model = ctx.request.body;
                logger.info('----123----')
                await ctx.render('index', {
                    title: '商通123官网',
                });
            }
        }
    })
}