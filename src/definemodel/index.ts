import { sequelize } from '../dao/BaseDaoDefine'
import { DataTypes, Model, Optional } from 'sequelize'
class User extends Model {
  static user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      field: 'username',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      field: 'password',
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      field: 'age',
      allowNull: false,
    },
  })
}

export const model = User.user
