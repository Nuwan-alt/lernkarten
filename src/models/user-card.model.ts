import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User_Card } from '@/interfaces/user-card.interface';
import { CardModel } from './card.model';
import { UserModel } from './users.model';

export type User_CardCreationAttributes = Partial<User_Card>;

export class User_CardModel extends Model<User_Card, User_CardCreationAttributes> implements User_Card {

  public id: number;
  public user_id: number;
  public card_id: number;
  public isFavourite: boolean;
  public notes: string;
  public stage: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export default function (sequelize: Sequelize): typeof User_CardModel {
  User_CardModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: UserModel,
          key: 'id',
        },
      },
      card_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CardModel,
          key: 'id',
        },
      },
      isFavourite: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      notes: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      stage: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'user_card',
      sequelize,
    },
  );

  return User_CardModel;
}
