const ContentService = require('../service/ContentService');
const BaseRouter = require('../../base/BaseRouter')(ContentService, {
    beforeSave(model, ctx) {
        model.createUser = ctx.session.currentUser.id;
        model.viewCount = model.viewCount || 0;
        model.createTime = new Date();
    }
});
const MemoryCache = require('../../components/MemoryCache');


module.exports = {
    prefix: '/business/content',
    routes: Object.assign(BaseRouter, {
        'GET/': {
            middleware: async function (ctx, next) {
                ctx.body = await ContentService.loadContentList(ctx.query);
            }
        }
    })
};