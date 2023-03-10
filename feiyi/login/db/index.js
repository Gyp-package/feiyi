// 创建数据库的连接对象。需求时随时调用
// 连接数据库
/**
 * Created by preference on 2022/10/24
 */
// 导入模板
const mysql = require('mysql')
    // 创建数据库连接对象
const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'admin123',
        database: 'login',
        port: 3306
    })
    // 向外共享数据库连接对象
module.exports = db