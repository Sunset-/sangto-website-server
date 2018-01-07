const RecruitService = require('../service/RecruitService');
const BaseRouter = require('../../base/BaseRouter')(RecruitService, {
    beforeSave(model, ctx) {
        model.createUser = ctx.session.currentUser.id;
        model.createTime = new Date();
    }
});
const MemoryCache = require('../../components/MemoryCache');


module.exports = {
    prefix: '/business/recruit',
    routes: Object.assign(BaseRouter, {

    })
};