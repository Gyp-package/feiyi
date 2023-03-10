// 连接数据库的操作
const db = require('../db/index')

// 获取用户基本信息
exports.getUserInfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        // 执行SQL语句失败
        if (err) return res.cc(err)
            // 执行SQL语句成功，但查询结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 获取用户信息成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0],
        })
    })
}