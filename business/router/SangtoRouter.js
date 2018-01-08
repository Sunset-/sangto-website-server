const logger = require('../../components/logger');
const ContentConfig = require('../../config/businessConfig.js');
const MemoryCache = require('../../components/MemoryCache');
const Enums = require('../enum/ContentEnums');
const ContentService = require('../service/ContentService');
const CertificateService = require('../service/CertificateService');
const RecruitService = require('../service/RecruitService');
const moment = require('moment');

var globalParams = {};

var indexContents = {};

MemoryCache.listen('SYSTEMVARIABLE_USE_ALL,DICTIONARY_ITEM_USE_ALL', 'SANGTO_INDEX_PARAMS', async function () {
    var variables = await MemoryCache.get('SYSTEMVARIABLE_USE_ALL');
    var dicionaryItems = await MemoryCache.get('DICTIONARY_ITEM_USE_ALL');
    var indexParams = await MemoryCache.get('SANGTO_INDEX_PARAMS', true) || {};
    //vars
    variables.forEach(item => {
        indexParams[item.name] = item.value;
    });
    //dict
    var DictionaryMap = {};
    var Dictionarys = {};
    dicionaryItems.forEach(item => {
        DictionaryMap[item.type] = DictionaryMap[item.type]||{};
        Dictionarys[item.type] = Dictionarys[item.type]||[];
        DictionaryMap[item.type][item.value] = item.name;
        Dictionarys[item.type].push(item);
    });
    indexParams.DictionaryMap = DictionaryMap;
    indexParams.Dictionarys = Dictionarys;

    Object.assign(globalParams,indexParams);
    return indexParams;
});


MemoryCache.listen('SANGTO_CONTENTS', 'SANGTO_INDEX_CONTENTS', async function () {
    //产品方案
    var products = await ContentService.loadContentList({
        type: Enums.CONTENT_TYPE.PRODUCT_AND_PLAN,
        status: Enums.CONTENT_STATUS.HOT,
        pageSize: 999
    });
    //新闻
    var news = await ContentService.loadContentList({
        type: Enums.CONTENT_TYPE.NEWS,
        status: Enums.CONTENT_STATUS.HOT,
        pageSize: ContentConfig.INDEX_NEWS_PAGE_SIZE
    });
    //案例
    var cases = await ContentService.loadContentList({
        type: Enums.CONTENT_TYPE.SUCCESSFUL_CASE,
        status: Enums.CONTENT_STATUS.HOT,
        pageSize: ContentConfig.INDEX_CASES_PAGE_SIZE
    });
    indexContents.products = products.rows;
    indexContents.news = news.rows;
    indexContents.cases = cases.rows;
    return indexContents;
});


MemoryCache.listen('SANGTO_CERTIFICATES', 'SANGTO_INDEX_CERTIFICATES', async function () {
    //合作伙伴
    var partners = await CertificateService.findAll({
        where : {
            type : Enums.CERTIFICATE_TYPE.PARTNER_LOGO
        }
    });
    indexContents.partners = partners;
    return indexContents;
});

module.exports = {
    prefix: '/',
    routes: Object.assign({
        // 首页
        'GET/': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;

                await ctx.render('index', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    moment: moment
                });
            }
        },
        // 产品方案
        'GET/products': {
            middleware: async function (ctx, next) {
                var query = ctx.query;
                ctx.useOriginResponseBody = true;
                var items = await MemoryCache.get('DICTIONARY_ITEM_USE_ALL');
                var productsCategories = items.filter(item => item.type == Enums.CATEGORY_TYPE.PRODUCTS);
                var currentCategory = query.category || productsCategories[0].value;
                var currentPageNumber = query.pageNumber || 1;
                var products = await ContentService.loadContentList({
                    type: Enums.CONTENT_TYPE.PRODUCT_AND_PLAN,
                    category: currentCategory,
                    status: `${Enums.CONTENT_STATUS.NORMAL},${Enums.CONTENT_STATUS.HOT}`,
                    pageNumber: currentPageNumber,
                    pageSize: ContentConfig.PRODUCTS_PAGE_SIZE
                });
                await ctx.render('products', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    currentCategory: currentCategory,
                    productsCategories: productsCategories,
                    products: products,
                    currentPage: currentPageNumber,
                    totalPage: products.count % ContentConfig.PRODUCTS_PAGE_SIZE == 0 ? products.count / ContentConfig.PRODUCTS_PAGE_SIZE : (parseInt(products.count / ContentConfig.PRODUCTS_PAGE_SIZE) + 1),
                    moment: moment
                });
            }
        },
        'GET/products/:id': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                var product = await ContentService.findById(ctx.params.id);
                await ctx.render('product-detail', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    product: product,
                    moment: moment
                });
            }
        },
        // 新闻
        'GET/news': {
            middleware: async function (ctx, next) {
                var query = ctx.query;
                ctx.useOriginResponseBody = true;
                var items = await MemoryCache.get('DICTIONARY_ITEM_USE_ALL');
                var newsCategories = items.filter(item => item.type == Enums.CATEGORY_TYPE.NEWS);
                var currentCategory = query.category || newsCategories[0].value;
                var currentPageNumber = query.pageNumber || 1;
                var news = await ContentService.loadContentList({
                    type: Enums.CONTENT_TYPE.NEWS,
                    category: currentCategory,
                    status: `${Enums.CONTENT_STATUS.NORMAL},${Enums.CONTENT_STATUS.HOT}`,
                    pageNumber: currentPageNumber,
                    pageSize: ContentConfig.NEWS_PAGE_SIZE
                });
                await ctx.render('news', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    currentCategory: currentCategory,
                    newsCategories: newsCategories,
                    news: news,
                    currentPage: currentPageNumber,
                    totalPage: news.count % ContentConfig.NEWS_PAGE_SIZE == 0 ? news.count / ContentConfig.NEWS_PAGE_SIZE : (parseInt(news.count / ContentConfig.NEWS_PAGE_SIZE) + 1),
                    moment: moment
                });
            }
        },
        'GET/news/:id': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                var news = await ContentService.findById(ctx.params.id);
                var nextNews = await ContentService.findNextOne(news.createTime);
                await ctx.render('news-detail', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    news: news,
                    nextNews: nextNews,
                    moment: moment
                });
            }
        },
        // 成功案例
        'GET/cases': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                var cases = await ContentService.loadContentList({
                    type: Enums.CONTENT_TYPE.SUCCESSFUL_CASE,
                    status: `${Enums.CONTENT_STATUS.NORMAL},${Enums.CONTENT_STATUS.HOT}`,
                    pageSize: 9999
                });
                await ctx.render('cases', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    cases: cases.rows,
                    moment: moment
                });
            }
        },
        'GET/cases/:id': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                var cases = await ContentService.findById(ctx.params.id);
                await ctx.render('case-detail', {
                    indexContents : indexContents,
                    globalParams: globalParams,
                    cases: cases,
                    moment: moment
                });
            }
        },
        'GET/about/:type': {
            middleware: async function (ctx, next) {
                ctx.useOriginResponseBody = true;
                var type = ctx.params.type;
                var honors = [];
                var recruits = [];
                if(type=='honor'){
                    honors = await CertificateService.findAll({
                        where : {
                            type : Enums.CERTIFICATE_TYPE.HONOR
                        }
                    });
                }else if(type=='recruit'){
                    recruits = await RecruitService.findAll();
                }
                await ctx.render(`about-${type}`, {
                    currentNavType :type,
                    indexContents : indexContents,
                    globalParams: globalParams,
                    honors : honors,
                    partners : indexContents.partners,
                    recruits : recruits
                });
            }
        }
    })
}