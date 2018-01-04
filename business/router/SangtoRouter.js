
const logger = require('../../components/logger');
const ContentConfig = require('../../config/businessConfig.js');
const MemoryCache = require('../../components/MemoryCache');
const Enums = require('../enum/ContentEnums');
const ContentService = require('../service/ContentService');
const moment = require('moment');



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
                var query = ctx.query;
                ctx.useOriginResponseBody = true;
                var items = await MemoryCache.get('DICTIONARY_ITEM_USE_ALL');
                var newsCategories = items.filter(item=>item.type==Enums.CATEGORY_TYPE.NEWS);
                var currentCategory = query.category||newsCategories[0].value;
                var currentPageNumber = query.pageNumber||1;
                var news = await ContentService.loadContentList({
                    type : Enums.CONTENT_TYPE.NEWS,
                    category : currentCategory,
                    status : Enums.CONTENT_STATUS.NORMAL,
                    pageNumber : currentPageNumber,
                    pageSize : ContentConfig.NEWS_PAGE_SIZE
                });
                logger.info(`----- ${currentCategory}`);
                await ctx.render('news', {
                    title: 'Bootstrap学习',
                    currentCategory : currentCategory,
                    newsCategories : newsCategories,
                    news : news,
                    currentPage : currentPageNumber,
                    totalPage : news.count%ContentConfig.NEWS_PAGE_SIZE==0?news.count/ContentConfig.NEWS_PAGE_SIZE:(parseInt(news.count/ContentConfig.NEWS_PAGE_SIZE)+1),
                    moment : moment
                });
            }
        },
        'GET/news/:id': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                var news = await ContentService.findById(ctx.params.id);
                var nextNews = await ContentService.findNextOne(news.createTime); 
                await ctx.render('news-detail', {
                    title: 'Bootstrap学习',
                    news : news,
                    nextNews : nextNews,
                    moment : moment
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