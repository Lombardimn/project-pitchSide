import { Table, Column, Model, DataType, HasMany, Default, Unique, AllowNull } from 'sequelize-typescript'

@Table({
  tableName: 'position_subtype',
})

class SubPosition extends Model<SubPosition> {
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(4)
  })
  declare name: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  declare description: string

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN
  })
  declare status: boolean


}

export default SubPosition