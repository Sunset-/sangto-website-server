const lang = require('../../common/lang');
const BaseService = require('../../base/BaseService');
const MemoryCache = require('../../components/MemoryCache');
const Enums = require('../enum/ContentEnums');
const MODEL = 'Certificate';

class SystemVariableService extends BaseService {
    constructor() {
        super(MODEL);
    }

}

module.exports = new SystemVariableService();