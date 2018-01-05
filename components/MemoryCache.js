const logger = require('./logger');
const cache = {};
const generators = {};
const listenMap = {};

const Cache = {
    regist(key, generator, lazy = true) {
        generators[key] = generator;
        delete cache[key];
        lazy || this.refresh(key);
    },
    refresh(key) {
        delete cache[key];
        logger.info('刷新缓存：' + key);
        this.get(key).then(res => {
            //dep
            listenMap[key] && listenMap[key].forEach(item => {
                this.refresh(item);
            });
        });
    },
    get(key, sync) {
        return Promise.resolve().then(async res => {
            if (cache[key] || sync) {
                console.log('缓存命中：' + key);
                return cache[key];
            } else if (generators[key]) {
                let res = await generators[key]();
                return cache[key] = res;
            } else {
                logger.error(`Cache key [${key}] is not exsit!`);
            }
        });
    },
    listen(dep, key, generator, lazy = true) {
        listenMap[dep] = listenMap[dep] || [];
        listenMap[dep].push(key);
        this.regist(key, generator, lazy);
    }
};

module.exports = Cache;