import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User_Subtopic } from '@/interfaces/user-subtopic.interface';
import { SubTopicModel } from './subtopic.model';

export type User_SubtopicCreationAttributes = Partial<User_Subtopic>;

export class User_SubtopicModel extends Model<User_Subtopic, User_SubtopicCreationAttributes> implements User_Subtopic {
  public user_id: number;
  public subtopic_id: number;
  public isFavourite: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof User_SubtopicModel {
  User_SubtopicModel.init(
    {
      user_id: {
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
      isFavourite: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'user_subtopic',
      sequelize,
    },
  );

  return User_SubtopicModel;
}
