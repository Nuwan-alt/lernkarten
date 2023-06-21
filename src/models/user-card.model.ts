import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User_Card } from '@/interfaces/user-card.interface';
import { CardModel } from './card.model';

export type User_CardCreationAttributes = Partial<User_Card>;

export class User_CardModel extends Model<User_Card, User_CardCreationAttributes> implements User_Card {
  public user_id: number;
  public cars_id: number;
  public isFavourite: boolean;
  public notes: string;
  public stage: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof User_CardModel {
  User_CardModel.init(
    {
      user_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
