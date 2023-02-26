import { keyBy } from 'lodash'

const isString = (str: any): str is string => {
  return typeof str === 'string'
}
//数据库连接配置
interface DBConnConfig {
  host: string
  user: string
  password: string
  port: number
  database: string
}
//环境配置
interface EnvConfig {
  dev: DBConnConfig
  prod: DBConnConfig
}
class Config {
  static conf: Config = new Config()
  env!: keyof EnvConfig
  envConfig!: EnvConfig
  constructor() {
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConfig()
  }
  initConfig() {
    this.envConfig = {
      dev: {
        host: 'localhost',
        user: 'root',
        password: 'flzx_3QC',
        port: 3306,
        database: 'test',
      },
      prod: {
        host: 'www.baidu.com',
        user: 'root',
        password: 'flzx_3QC',
        port: 3306,
        database: 'test',
      },
    }
  }
  getConfig(): DBConnConfig
  getConfig(key: string): string
  getConfig(key: any = ''): any {
    if (this.isDbConnConfigKeys(key) && key.length > 0) {
      return this.envConfig[this.env][key]
    } else {
      return this.envConfig[this.env]
    }
  }
  isDbConnConfigKeys(key: any): key is keyof DBConnConfig {
    return (
      key === 'host' ||
      key === 'user' ||
      key === 'password' ||
      key === 'port' ||
      key === 'database'
    )
  }
}
export default Config.conf
