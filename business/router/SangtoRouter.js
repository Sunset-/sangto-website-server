
const logger = require('../../components/logger');


module.exports = {
    prefix: '/sangto',
    routes: Object.assign({
        'GET/index': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                await ctx.render('index', {
                    title: 'Bootstrap学习',
                });
            }
        },
        'GET/news': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                await ctx.render('news', {
                    title: 'Bootstrap学习',
                });
            }
        },
        'GET/news/:id': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                await ctx.render('news-detail', {
                    title: 'Bootstrap学习'
                });
            }
        },
        'GET/cases': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                await ctx.render('cases', {
                    title: 'Bootstrap学习',
                });
            }
        },
        'GET/cases/:id': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                await ctx.render('case-detail', {
                    title: 'Bootstrap学习'
                });
            }
        },
        'GET/about/:type': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                await ctx.render(`about-${ctx.params.type}`, {
                    title: 'Bootstrap学习'
                });
            }
        }
    })
}