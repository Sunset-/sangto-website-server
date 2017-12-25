const DictionaryItemService = require('../service/DictionaryItemService');
const BaseRouter = require('../../base/BaseRouter')(DictionaryItemService);
const MemoryCache = require('../../components/MemoryCache');


module.exports = {
    prefix: '/system/dictionaryItem',
    routes: Object.assign(BaseRouter, {
        'GET/getByType/:type': async function (ctx) {
            ctx.body = await DictionaryItemService.getModel().findAll({
                where: {
                    type: ctx.params.type
                },
                order: 'orderField ASC'
            })
        },
        'GET/use/all': async function (ctx) {
            ctx.body = await MemoryCache.get('DICTIONARY_ITEM_USE_ALL');
        },
        'POST,PUT/order/change': async function (ctx) {
            let params = ctx.request.body,
                orders = params.orders;
            if (orders) {
                let orderList;
                try {
                    orderList = orders.split(';').map(s => s.split(','));
                } catch (e) {}
                if (orderList && orderList.length) {
                    ctx.body = await DictionaryItemService.order(orderList);
                }
            } else {
                ctx.throw('参数错误');
            }
        }
    })
};