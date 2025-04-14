import { Table, Column, Model, DataType, HasMany, Unique, AllowNull, Default } from 'sequelize-typescript'
import User from './user.model'

@Table({
  tableName: 'rol',
})

class Rol extends Model<Rol> {
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50)
  })
  declare name: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  declare description: string

  @Default(1)
  @Column({
    type: DataType.INTEGER
  })
  declare enabled: number

  // Relacion con el modelo User
  @HasMany(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  declare users: User[]
}

export default Rol