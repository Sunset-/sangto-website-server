module.exports = (Service, hooks = {}) => ({
    'POST/': {
        middleware: async function (ctx, next) {
            let model = ctx.request.body;
            model = hooks.beforeSave && hooks.beforeSave(model, ctx) || model;
            ctx.body = await Service.add(model);
        }
    },
    'PUT/': {
        middleware: async function (ctx, next) {
            let model = ctx.request.body;
            model = hooks.beforeSave && hooks.beforeSave(model, ctx) || model;
            await Service.update(model);
            ctx.body = true;
        }
    },
    'DELETE/:ids': {
        middleware: async function (ctx, next) {
            if (ctx.params.ids) {
                let obj = await Service.removeByIds(ctx.params.ids.split(','));
            }
            ctx.body = true;
        }
    },
    'GET/:id': {
        middleware: async function (ctx, next) {
            if (ctx.params.id) {
                let obj = await Service.findById(ctx.params.id);
                hooks.afterFindById && hooks.afterFindById(obj, ctx);
                ctx.body = obj;
            }
        }
    },
    'GET/': {
        middleware: async function (ctx, next) {
            let {
                pageNumber,
                pageSize
            } = ctx.query;
            isNaN(pageNumber) && (pageNumber = 1);
            isNaN(pageSize) && (pageSize = 10000);
            let filter = hooks.pageFilter && hooks.pageFilter(ctx) || {};
            let list = await Service.findPage(Object.assign(filter, {
                offset: (pageNumber - 1) * pageSize,
                limit: +pageSize
            }));
            ctx.body = list;
        }
    },
    hooks: {}
});