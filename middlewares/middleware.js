const mws = ['./static','./template-ejs', './redisSession', './logger', './responseWrapper', './LoginedChecker','./requestBody'];
//'./redisSession','
//'./memorySession',
//const mws = ['./static', './memorySession', './logger', './responseWrapper', './LoginedChecker', './authorityIntercept.js', './wechatXml', './requestBody', './proxy'];

module.exports = (app) => {
    mws.forEach(mv => {
        require(mv)(app);
    })
}