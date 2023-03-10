// 1. 导入express模板,创建路由中间件
const express = require('express')
    // 创建web服务器
const app = express()
const joi = require('joi')

// 2. 导入并配置注册全局cors中间件
const cors = require('cors')
app.use(cors())

// 8. 配置session中间件，获取用户信息
// const session = require('express-session')
// app.use(session({
//         secret: 'superGYP',
//         resave: false,
//         saveUninitialized: true
//     }))
// 3. 解析表中数据中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({
    extended: false
}))

// 5.代码优化,中间件需要在路由之前封装函数
app.use((req, res, next) => {
    // console.log(req.body);
    // status默认值为1表示失败，err的值可能是错误对象，也可能是错误的描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 6.解析还原 Token 的中间件，为JSON对象的包
const expressJWT = require('express-jwt')
    // 导入配置文件
const config = require('./config')
    // 配置全局，并去除不需要验证的文件
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 4. 导入登录注册全局路由模块，挂载统一前缀
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 5.导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
const { get } = require('./router/user')
const jwt = require('express-jwt')
app.use('/my', userinfoRouter)


//7.定义错误级别中间件
app.use((err, req, res, next) => {
        //验证失败导致的错误
        if (err instanceof joi.ValidationError) return res.cc(err)
            //身份认证失败后的错误
        if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
            //未知错误
        res.cc(err)
    })
    // 导入身份验证文件，其中的 generateToken 字段,用于登录拦截
    // const jwt1 = require('./router_handler/user')

// 验证token是否过期
// let results = jwt1.verifyToken(token);
// if (results.code == 100) {
//     res.send({
// status: 1,
// code: 403,
// msg: '登录过期，请重新登录'
//     });
// } else {
//     next()
// }
// })


app.get('/yzm', (err, req, res, next) => {
    res.cc('验证码发送成功', 0)
})


// 设置监听窗口
app.listen(3007, () => {
    console.log('接口成功运行在http://127.0.0.1:3007');
})