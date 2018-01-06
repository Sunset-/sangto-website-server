const CertificateService = require('../service/CertificateService');
const BaseRouter = require('../../base/BaseRouter')(CertificateService, {
    beforeSave(model, ctx) {
        model.createUser = ctx.session.currentUser.id;
        model.createTime = new Date();
    }
});
const MemoryCache = require('../../components/MemoryCache');


module.exports = {
    prefix: '/business/certificate',
    routes: Object.assign(BaseRouter, {

    })
};