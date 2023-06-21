import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Topic } from '@interfaces/topic.interface';
import { ExamModel } from './exam.model';

export type TopicCreationAttributes = Partial<Topic>;

export class TopicModel extends Model<Topic, TopicCreationAttributes> implements Topic {
  public id: number;
  public title: string;
  public exam_id: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TopicModel {
  TopicModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exam_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ExamModel,
          key: 'id',
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

    },
    {
      tableName: 'topic',
      sequelize,
    },
  );

  return TopicModel;
}
