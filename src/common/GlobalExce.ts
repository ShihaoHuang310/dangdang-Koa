import Koa from 'koa'
import { success, fail } from './ResResult'
const globalException = async (ctx: Koa.Context, next: Koa.Next) => {
  console.log('进入全局异常处理中间件')
  try {
    await next()
  } catch (e: any) {
    const errorResult = e as { message: string }
    ctx.body = fail(`全局异常处理中间件捕获到异常：${errorResult.message}`)
  }
}
export default globalException
