const BaseService = require('../../base/BaseService');
const MemoryCache = require('../../components/MemoryCache');
const MODEL = 'DictionaryItem';

class DictionaryItemService extends BaseService {
    constructor() {
        super(MODEL);
        this.on('afterChange', () => {
            MemoryCache.refresh('DICTIONARY_ITEM_USE_ALL');
        })
        MemoryCache.regist('DICTIONARY_ITEM_USE_ALL', () => {
            return this.getModel().findAll({
                order: 'orderField ASC'
            });
        }, false);
    }
    async add(model) {
        let last = await this.getModel().findOne({
            where: {
                type: model.type
            },
            order: `orderField DESC`
        });
        model.orderField = last && (!isNaN(last.orderField)) ? (+last.orderField + 1) : 0;
        return this.validate(model).then(async instance => {
            let res = await instance.save();
            this.emit('afterAdd', res);
            this.emit('afterChange');
            return res
        }).catch(e => {
            throw new Error(e.message);
        });
    }
    order(orderList) {
        return this.transaction(async t => {
            await Promise.all(orderList.map(item => {
                return this.getModel().update({
                    orderField: item[1]
                }, {
                    fields: ['orderField'],
                    where: {
                        id: item[0]
                    },
                    transaction: t
                })
            }));
            this.emit('afterChange');
            return true;
        })
    }
}

module.exports = new DictionaryItemService();