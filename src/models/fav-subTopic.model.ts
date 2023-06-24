import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { FavSubtopic } from '@/interfaces/fav-subTopic.interface';
import { SubTopicModel } from './subtopic.model';
import { UserModel } from './users.model';
import { Fav_SubTopicRoute } from '@/routes/fav-subTopic.route';

export type User_SubtopicCreationAttributes = Partial<FavSubtopic>;

export class User_SubtopicModel extends Model<FavSubtopic, User_SubtopicCreationAttributes> implements FavSubtopic {
  public user_id: number;
  public subtopic_id: number;
  public isFavourite: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof User_SubtopicModel {
  User_SubtopicModel.init(
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
      subtopic_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: SubTopicModel,
          key: 'id',
        },
      },
      isFavourite: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'fav_subtopic',
      sequelize,
    },
  );

  SubTopicModel.hasMany(User_SubtopicModel, { foreignKey: 'subtopic_id', onDelete: 'CASCADE', onUpdate:'CASCADE' });
  UserModel.hasMany(User_SubtopicModel, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate:'CASCADE' });

  return User_SubtopicModel;
}
