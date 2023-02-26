import dbConfig from '../config/DbConfig'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    let { host, user, password, database, port } = dbConfig.getConfig()
    this.sequelize = new Sequelize(database, user, password, {
      host: host,
      port: port,
      dialect,
      define: { timestamps: false, freezeTableName: true },
    })
  }
}
export const { sequelize } = BaseDaoDefine.baseDaoOrm
