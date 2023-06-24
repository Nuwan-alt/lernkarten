import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Next_Exam } from '@/interfaces/next-exam.interface';
import { ExamModel } from './exam.model';
import { UserModel } from './users.model';

export type Next_ExamCreationAttributes = Partial<Next_Exam>;

export class Next_ExamModel extends Model<Next_Exam, Next_ExamCreationAttributes> implements Next_Exam {
  public user_id: number;
  public exam_id: number;
  public exam_date: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Next_ExamModel {
  Next_ExamModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: UserModel,
          key: 'id',
        },
      },
      exam_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ExamModel,
          key: 'id',
        },
      },
      exam_date: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'next_exam',
      sequelize,
    },
  );

  return Next_ExamModel;
}
