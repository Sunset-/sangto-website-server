const CertificateService = require('../service/CertificateService');
const BaseRouter = require('../../base/BaseRouter')(CertificateService, {
    beforeSave(model, ctx) {
        model.createUser = ctx.session.currentUser.id;
        model.createTime = new Date();
    },
    pageFilter(ctx) {
        let type = ctx.query.type;
        let filter = {};
        if (type && type.trim()) {
            filter.type = type;
        }
        return {
            where: filter
        };
    }
});
const MemoryCache = require('../../components/MemoryCache');


module.exports = {
    prefix: '/business/certificate',
    routes: Object.assign(BaseRouter, {

    })
};