import { model } from '../definemodel'

class UserDaoDefine {
  static addUser(user: User) {
    return model.create(user)
  }
}
export type User = {
  id: number
  username: string
  password: string
  age: number
}
export const { addUser } = UserDaoDefine
