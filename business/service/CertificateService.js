const lang = require('../../common/lang');
const BaseService = require('../../base/BaseService');
const MemoryCache = require('../../components/MemoryCache');
const Enums = require('../enum/ContentEnums');
const MODEL = 'Certificate';

class CertificateService extends BaseService {
    constructor() {
        super(MODEL);
        this.on('afterChange', () => {
            MemoryCache.refresh('SANGTO_CERTIFICATES');
        })
        MemoryCache.regist('SANGTO_CERTIFICATES', () => {
            return true;
        }, false);
    }

}

module.exports = new CertificateService();