import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Card } from '@interfaces/card.interface';
import { SubTopicModel } from './subtopic.model';

export type CardCreationAttributes = Partial<Card>;

export class CardModel extends Model<Card, CardCreationAttributes> implements Card {
  public id: number;
  public subtopic_id: number;
  public question: string;
  public answer: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CardModel {
  CardModel.init(
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
      tableName: 'cards',
      sequelize,
    },
  );

  CardModel.hasOne(SubTopicModel, { foreignKey: 'subtopic_id', onDelete: 'CASCADE', onUpdate:'CASCADE' });
  SubTopicModel.hasMany(CardModel, { foreignKey: 'subtopic_id', onDelete: 'CASCADE', onUpdate:'CASCADE' });

  return CardModel;
}
