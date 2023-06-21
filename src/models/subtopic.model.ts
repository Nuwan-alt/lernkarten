import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { SubTopic } from '@interfaces/subTopic.interface';
import { TopicModel } from './topic.model';

export type SubtopicCreationAttributes = Partial<SubTopic>;

export class SubTopicModel extends Model<SubTopic, SubtopicCreationAttributes> implements SubTopic {
  public id: number;
  public title: string;
  public topic_id: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SubTopicModel {
  SubTopicModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      topic_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: TopicModel,
          key: 'id',
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },

    },
    {
      tableName: 'sub_topic',
      sequelize,
    },
  );

  return SubTopicModel;
}
