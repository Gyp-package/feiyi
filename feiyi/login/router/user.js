// 路由模块，用来存放所有路由对应关系
// 1.用户路由
const express = require('express')
    // 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user')

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
    // 调用规则
const { reg_login_schema } = require('../schema/user')

const jwt = require('jsonwebtoken')
    // const jwt = require('express-jwt')
const config = require('../config')
    // 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)
    // 用户登录,
router.post('/login', expressJoi(reg_login_schema), user_handler.login)
router.post('/denglu', (req, res) => {
        // console.log('好小子你接到我了');
        // console.log(req.headers.token);
        let token = req.headers.token //校验token
        const check = function(token) {
            let tokenkey = jwt.verify(token, config.jwtSecretKey, function(err, decode) {
                    if (err) {
                        // console.log(err);
                        // console.log('666');
                        // console.log(decode);
                        if (err.name == 'TokenExpiredError') {
                            res.send({
                                // 登录过期
                                status: 123,
                                iat: 1,
                                exp: 0,
                                msg: 'token过期'
                            })
                        } else if (err.name == 'JsonWebTokenError') {
                            res.send({
                                // 未登录
                                status: 111,
                                iat: 1,
                                exp: 0,
                                msg: '无效的token'
                            })
                        }
                    } else {
                        console.log(decode)
                        res.send({ status: 1 })
                    }
                }) // console.log(tokenkey + '1111');
        }
        check(token)
    })
    // 暴露给外界
module.exports = router