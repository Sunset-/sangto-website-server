var crypto = require('crypto');

module.exports = {
    md5: function (str, key) {
        var decipher = crypto.createHash('md5', key);
        if (key) {
            return decipher.update(str).digest()
        }
        return decipher.update(str, 'utf8').digest('hex');
    },
    sha1(content, secrectKey) {
        return crypto.createHmac('sha1', secrectKey).update(content).digest().toString('base64');
    },
    getSha1(str) {
        var sha1 = crypto.createHash("sha1");
        sha1.update(str);
        var res = sha1.digest("hex"); //加密后的值d
        return res;
    }
}
