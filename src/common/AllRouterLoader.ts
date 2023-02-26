import path from 'path'
import fs from 'fs'
import Koa from 'koa'
import Router from 'koa-router'
import body from 'koa-body'
import json from 'koa-json'
import globalException from './GlobalExce'
class AllRouterLoader {
  app!: Koa
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  //初始化方法
  init(app: Koa) {
    this.app = app
    // console.log(this.getAbsoluteFilePaths())
    const rootRouter = this.loadAllRouterWrapper()
    this.app.use(globalException)
    this.app
    this.app.use(rootRouter.routes())
    this.listen() //监听方法
  }
  listen() {
    this.app.listen(8099)
    console.log('server running on port 8099')
  }
  // 1、加载所有路由文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  //2、加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), 'src/router')
    const allFiles = fs.readdirSync(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      const fullFilePath = dir + '/' + allFiles
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }
  // 3、加载所有一级路由到二级路由
  loadAllRouterWrapper() {
    // /获取 一级路由
    const rootRouter = this.getRootRouter()
    //调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    //调用加载所有一级路由到二级路由方法

    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }
  //自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router
  }
  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }
}
export default AllRouterLoader.allRouterLoader
