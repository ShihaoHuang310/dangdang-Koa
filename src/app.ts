import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'
// import userRouter from './router/user'
import allRouterLoader from './common/AllRouterLoader'
import dbConfig from './config/DbConfig'
console.log(dbConfig.getConfig('host'))
const app = new Koa()
const router = new Router()
allRouterLoader.init(app) //动态加载路由

// router.prefix('/dang') //给所有路由添加前缀，作为一级路由
// router.get('/test', async (ctx: Koa.Context, next: Koa.Next) => {
//   ctx.body = 'hello koa'
// })

// router.use(json()) //转json
// router.use(body())
// router.use(userRouter.routes(), userRouter.allowedMethods())
// app.use(router.routes())

// app.listen(8099)
// console.log('server running on port 8099')
