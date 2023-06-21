import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { CustomCard } from '@interfaces/customCard.interface';
import { SubTopicModel } from './subtopic.model';
import { UserModel } from './users.model';

export type CustomCardCreationAttributes = Partial<CustomCard>;

export class CustomCardModel extends Model<CustomCard, CustomCardCreationAttributes> implements CustomCard {
  public id: number;
  public subtopic_id: number;
  public user_id: number;
  public question: string;
  public answer: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CustomCardModel {
  CustomCardModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      subtopic_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: SubTopicModel,
          key: 'id',
        },
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: UserModel,
          key: 'id',
        },
      },
      question: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      answer: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'custom_cards',
      sequelize,
    },
  );

  return CustomCardModel;
}
