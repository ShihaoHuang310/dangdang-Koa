import Koa from 'koa'
import Router from 'koa-router'
import { success, fail } from '../common/ResResult'
import { User, addUser } from '../dao/UserDaoDefine'

const router = new Router()

router.prefix('/userModule')

router.get('/findUserInfo/:username', async (ctx: Koa.Context) => {
  const { username } = ctx.params
  ctx.body = success(`hello ${username}`)
})
router.post('/addUser', async (ctx: Koa.Context) => {
  const user: User = ctx.request.body
  const dbUserInfo = await addUser(user)
  ctx.body = success(dbUserInfo)
})
module.exports = router
