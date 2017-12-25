var ueditor = require("ueditor");

module.exports = app => {
    app.use(async function (ctx, next) {
        return ueditor(ctx.req, ctx.res, next);
    });
};