var config = require('../../assets/ueditor/config');

module.exports = {
    prefix: '/ueditor',
    routes: {
        '/': async function (ctx) {
            var action = ctx.query && ctx.query.action;
            if (action == 'config') {
                ctx.useOriginResponseBody = true;
                ctx.body = config;
            } else if (action == 'uploadimage') {
                let files = ctx.request.body.files;
                ctx.useOriginResponseBody = true;
                let fileName = files.upfile.storeName;
                ctx.body = {
                    'url': '/upload/' + fileName,
                    'title': fileName,
                    'original': fileName,
                    'state': 'SUCCESS'
                };
            }
        }
    }
};