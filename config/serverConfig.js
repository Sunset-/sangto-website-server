module.exports = {
    port: 9090,
    "static": [{
        root: 'assets',
        maxAge:  0
    },{
        root: 'upload',
        maxAge:  60 * 60 * 1000
    },{
        root: 'page',
        maxAge:  60 * 60 * 1000
    }],
    smsSwitch : false,
    sms : ["YunPianSms"]
};