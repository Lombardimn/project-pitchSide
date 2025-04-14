import { Table, Column, Model, DataType, Default, Unique, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Rol from './rol.model'

@Table({
  tableName: 'users',
})

class User extends Model<User> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
  declare name: string

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50)
  })
  declare email: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60)
  })
  declare password: string

  @Column({
    type: DataType.STRING(6)
  })
  declare token: string

  @Default(false)
  @Column({
    type: DataType.BOOLEAN
  })
  declare confirmationToken: boolean

  @Default(1)
  @Column({
    type: DataType.INTEGER
  })
  declare enabled: number

  // Relacion con el modelo Rol
  @ForeignKey(() => Rol)
  @Default(1)
  @Column({
    type: DataType.INTEGER
  })
  declare rolId: number

  @BelongsTo(() => Rol)
  declare rol: Rol
}

export default User