const lang = require('../../common/lang');
const BaseService = require('../../base/BaseService');
const MemoryCache = require('../../components/MemoryCache');
const MODEL = 'Content';

class SystemVariableService extends BaseService {
    constructor() {
        super(MODEL);
    }

    loadContentList(query) {
        let pager = lang.castPager(query);
        let sequelize = this.getConnection();
        return Promise.all([
            sequelize.query(`
                        SELECT 
                        tb_c.id_ AS id,
                        tb_c.type_ AS type,
                        tb_c.category_ AS category,
                        tb_c.title_ AS title,
                        tb_c.cover_ AS cover,
                        tb_c.keywords_ AS keywords,
                        tb_c.digest_ AS digest,
                        tb_c.content_ AS content,
                        tb_c.create_user_ AS createUser,
                        tb_c.publish_user_ AS publishUser,
                        tb_c.create_time_ AS createTime,
                        tb_c.status_ AS status,
                        tb_ma.nickname_ AS createUserName
                        FROM 
                        tb_content tb_c 
                        JOIN tb_manager_account tb_ma ON tb_ma.id_=tb_c.create_user_
                        WHERE 
                        tb_c.type_='${query.type}'
                        ${query.status?` AND tb_c.status_=${query.status}} `:''}
                        ${query.keyword?` AND (tb_c.title_ LIKE '%${query.keyword}%' OR tb_c.keywords_ LIKE '%${query.keyword}%') `:''}
                        ORDER BY tb_c.create_time_ DESC
                        LIMIT ${pager.offset},${pager.limit}
                    `, {
                type: sequelize.QueryTypes.SELECT
            }),
            sequelize.query(`
                        SELECT COUNT(1) AS total 
                        FROM tb_content tb_c
                        WHERE 
                        tb_c.type_='${query.type}'
                        ${query.status?` AND tb_c.status_=${query.status}} `:''}
                        ${query.keyword?` AND (tb_c.title_ LIKE '%${query.keyword}%' OR tb_c.keywords_ LIKE '%${query.keyword}%') `:''}
                    `, {
                type: sequelize.QueryTypes.SELECT
            })
        ]).then(res => {
            return {
                rows: res[0],
                count: res[1][0].total
            };
        }).catch(err => {
            throw err;
        });
    }
}

module.exports = new SystemVariableService();