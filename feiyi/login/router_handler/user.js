    // 路由处理函数，保证路由模块纯粹性
    // 导入数据库操作模块,检验用户名禁止重复
    const db = require('../db/index')

    // 导入bcrypt加密包
    const bcrypt = require('bcryptjs')

    // 导入Token的解析包
    const jwt = require('jsonwebtoken')
        // 导入全局的配置文件
    const config = require('../config')

    // 注册用户的处理函数
    exports.regUser = (req, res) => {
        const userinfo = req.body
            // console.log(userinfo.username);
            // console.log(userinfo);
            // 校验表单数据非空
        if (!userinfo.username || !userinfo.password) {
            return res.cc('用户名或密码不能为空')
        }
        // console.log(userinfo);
        // 定义SQL语句，查询用户名是否被占用
        const strSql = 'select * from ev_users where username=?'
            // 执行SQL语句并根据结果判断用户名是否被占用

        db.query(strSql, [userinfo.username], (err, results) => {
            if (err) {
                console.log(err);
                return res.cc(err)
            }
            if (results.length > 0) {
                return res.cc('用户名被占用，请更换其他用户名')
            }

            // 调用 bcrypt.hashSync() 对密码进行加密等操作
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
                // 定义插入新用户的SQL语句
            const sql = 'insert into ev_users set ?'
            db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
                // 判断SQL语句执行失败
                if (err) {
                    return res.cc(err);
                }
                // SQL语句执行成功，但影响行不是1
                if (results.affectedRows !== 1) {
                    return res.cc('注册用户失败，稍后再试')
                }
                res.cc('注册成功', 0)
            })
        })
    }

    // 登录的处理函数
    exports.login = (req, res) => {
        // 接收表单的数据
        const userinfo = req.body
            //    定义sql语句
        const sql = 'select * from ev_users where username=?'
        db.query(sql, userinfo.username, (err, results) => {

            console.log(userinfo.username);
            if (err) return res.cc(err)
            if (results.length !== 1) return res.cc('登陆失败')
                //密码比较
            const compareResults = bcrypt.compareSync(userinfo.password, results[0].password)

            console.log(userinfo.password);
            if (!compareResults) {
                return res.cc('登录失败');
                // 用户登录失败
                // res.session.islogin = false
            }

            // 服务器生成 Token 字符串，上边导入密钥
            const user = {...results[0], password: '' }
                // 对用户信息进行加密，生成Token字符串
            const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
                // 对token字符进行错误校验,进行登陆拦截以及状态维护
                // const generateToken = function(tokenStr) {
                //         try {
                //             let tokenKey = jwt.verify(token, key)
                //             return {
                //                 code: 200,
                //                 status: 0,
                //                 msg: '校验成功',
                //                 tokenKey,
                //             }
                //         } catch {
                //             return {
                //                 code: 100,
                //                 status: 1,
                //                 msg: '校验失败'
                //             }
                //         }
                //     }
                // console.log(tokenStr);

            // session在服务器端获取用户信息
            // res.session.user = req.body
            // const user1 = {...results[0], password: '' }


            // 用户状态登录状态为true,这里的session登录状态没有被成功调用
            // req.session.islogin = true
            res.send({
                status: 0,
                message: '登陆成功',
                token: tokenStr,
                // token: 'Bearer' + tokenStr,
                // req.session.islogin: true
            })
        })
    }